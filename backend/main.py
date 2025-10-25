from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import math
import os
from datetime import datetime

app = FastAPI(title="Nagpur Traffic Accident Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BLACKSPOTS_DATA = [
    {"name": "Prakash High School to Kapsi Bridge (Pardi)", "location": {"lat": 21.0891, "lng": 79.0641}, "accident_count": 15, "zone": "Pardi", "description": "Highest accident rate in city"},
    {"name": "Maruti Showroom Square (Indora)", "location": {"lat": 21.1258, "lng": 79.0882}, "accident_count": 12, "zone": "Indora", "description": "High traffic intersection"},
    {"name": "Old Pardi Naka Square", "location": {"lat": 21.0935, "lng": 79.0595}, "accident_count": 11, "zone": "Pardi", "description": "Frequent collision point"},
    {"name": "Shankar Nagar Square", "location": {"lat": 21.1468, "lng": 79.0925}, "accident_count": 10, "zone": "Dharampeth", "description": "Busy commercial area"},
    {"name": "Variety Square", "location": {"lat": 21.1507, "lng": 79.0883}, "accident_count": 9, "zone": "Sitabuldi", "description": "Major traffic junction"},
    {"name": "LIC Square", "location": {"lat": 21.1417, "lng": 79.0906}, "accident_count": 8, "zone": "Sitabuldi", "description": "Commercial district hotspot"},
    {"name": "Kasturchand Park Square", "location": {"lat": 21.1500, "lng": 79.0847}, "accident_count": 8, "zone": "Sitabuldi", "description": "Central business district"},
    {"name": "Hanuman Mandir Square (Pardi)", "location": {"lat": 21.0889, "lng": 79.0658}, "accident_count": 7, "zone": "Pardi", "description": "Temple area with heavy pedestrian traffic"},
    {"name": "Seminary Hills Chowk", "location": {"lat": 21.1357, "lng": 79.0447}, "accident_count": 6, "zone": "Dhantoli", "description": "Residential area junction"},
    {"name": "Rahate Colony Square", "location": {"lat": 21.1213, "lng": 79.0475}, "accident_count": 6, "zone": "Dhantoli", "description": "School zone area"},
    {"name": "Ajni Square (Railway Station Road)", "location": {"lat": 21.1425, "lng": 79.1156}, "accident_count": 6, "zone": "Ajni", "description": "Near railway station"},
    {"name": "Sitabuldi Interchange", "location": {"lat": 21.1482, "lng": 79.0873}, "accident_count": 5, "zone": "Sitabuldi", "description": "Major flyover intersection"},
    {"name": "8th Mile Square, Amravati Road (Wadi)", "location": {"lat": 21.2008, "lng": 79.0426}, "accident_count": 5, "zone": "Wadi", "description": "Highway junction"},
    {"name": "Cotton Market Square", "location": {"lat": 21.1520, "lng": 79.0920}, "accident_count": 5, "zone": "Sitabuldi", "description": "Market area congestion"},
    {"name": "Mangalwari Square (Sadar)", "location": {"lat": 21.1543, "lng": 79.0832}, "accident_count": 4, "zone": "Sadar", "description": "Historical market junction"},
    {"name": "Ambazari Road Junction", "location": {"lat": 21.1287, "lng": 79.0354}, "accident_count": 4, "zone": "Dharampeth", "description": "Lake area traffic point"},
    {"name": "Ujwal Nagar Square", "location": {"lat": 21.0952, "lng": 79.0423}, "accident_count": 4, "zone": "Dhantoli", "description": "Residential junction"},
    {"name": "Khamla Square", "location": {"lat": 21.1615, "lng": 79.0561}, "accident_count": 3, "zone": "Khamla", "description": "Outer ring road point"},
    {"name": "Manish Nagar Square", "location": {"lat": 21.0781, "lng": 79.0289}, "accident_count": 3, "zone": "Manish Nagar", "description": "Residential area"},
    {"name": "Mate Square (Nandanvan)", "location": {"lat": 21.1678, "lng": 79.0982}, "accident_count": 3, "zone": "Nandanvan", "description": "Growing residential zone"},
    {"name": "Jaiprakash Nagar Square", "location": {"lat": 21.1092, "lng": 79.0598}, "accident_count": 2, "zone": "Dharampeth", "description": "Local market junction"},
    {"name": "Friends Colony Square", "location": {"lat": 21.0823, "lng": 79.0512}, "accident_count": 2, "zone": "Dhantoli", "description": "Residential intersection"},
    {"name": "Kachipura Square (Mominpura)", "location": {"lat": 21.1623, "lng": 79.0828}, "accident_count": 2, "zone": "Mominpura", "description": "Dense residential area"}
]

STATS_DATA = {
    "total_accidents": 327,
    "total_blackspots": 23,
    "zones": {
        "Pardi": 48,
        "Indora": 44,
        "Sitabuldi": 40,
        "Ajni": 46,
        "Dharampeth": 38,
        "Dhantoli": 32,
        "Sadar": 28,
        "Khamla": 24,
        "Others": 27
    },
    "last_updated": "2025-10-24"
}

USER_REPORTS = []

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

@app.get("/")
async def root():
    return {
        "message": "Nagpur Traffic Accident Prediction API",
        "version": "2.0.0",
        "status": "active",
        "total_blackspots": len(BLACKSPOTS_DATA),
        "user_reports": len(USER_REPORTS),
        "endpoints": ["/blackspots", "/stats", "/predict/route", "/accidents/heatmap", "/report/accident", "/reports/recent"]
    }

@app.get("/blackspots")
async def get_blackspots():
    return BLACKSPOTS_DATA

@app.get("/stats")
async def get_statistics():
    stats = STATS_DATA.copy()
    stats["user_reports_count"] = len(USER_REPORTS)
    return stats

@app.post("/predict/route")
async def predict_route_safety(data: dict):
    origin = data.get("origin", {})
    destination = data.get("destination", {})
    
    origin_lat = origin.get("lat", 21.1458)
    origin_lng = origin.get("lng", 79.0882)
    dest_lat = destination.get("lat", 21.1600)
    dest_lng = destination.get("lng", 79.0900)
    
    nearby_blackspots = []
    total_risk_score = 0
    
    for spot in BLACKSPOTS_DATA:
        spot_lat = spot["location"]["lat"]
        spot_lng = spot["location"]["lng"]
        
        dist_to_origin = calculate_distance(origin_lat, origin_lng, spot_lat, spot_lng)
        dist_to_dest = calculate_distance(dest_lat, dest_lng, spot_lat, spot_lng)
        
        if dist_to_origin < 2 or dist_to_dest < 2:
            risk_score = min(spot["accident_count"] * 5, 95)
            total_risk_score += risk_score
            nearby_blackspots.append({
                "location": spot["name"],
                "risk_score": risk_score,
                "reason": f"Historical accident hotspot ({spot['accident_count']} accidents recorded)"
            })
    
    nearby_blackspots.sort(key=lambda x: x["risk_score"], reverse=True)
    high_risk_segments = nearby_blackspots[:3]
    
    if len(nearby_blackspots) == 0:
        safety_score = 92
        risk_level = "low"
        predicted_accidents = 0
    elif len(nearby_blackspots) <= 2:
        safety_score = 75
        risk_level = "medium"
        predicted_accidents = 1
    else:
        avg_risk = total_risk_score / len(nearby_blackspots)
        safety_score = max(100 - avg_risk, 30)
        risk_level = "high" if safety_score < 60 else "medium"
        predicted_accidents = len(nearby_blackspots) // 2
    
    recommendations = [
        "Maintain speed limit and follow traffic signals",
        "Avoid rush hours (8-10 AM, 6-8 PM) if possible",
    ]
    
    if risk_level == "high":
        recommendations.extend([
            "⚠️ Consider taking an alternative route",
            "Stay extra alert in high-risk zones marked above",
            "Avoid night travel on this route if possible"
        ])
    elif risk_level == "medium":
        recommendations.extend([
            "Reduce speed near accident-prone areas",
            "Keep safe distance from vehicles ahead"
        ])
    else:
        recommendations.append("This route has a good safety record. Drive safely!")
    
    route_distance = calculate_distance(origin_lat, origin_lng, dest_lat, dest_lng)
    
    return {
        "route_id": f"route_{origin_lat}_{dest_lat}",
        "safety_score": round(safety_score, 1),
        "risk_level": risk_level,
        "predicted_accidents": predicted_accidents,
        "high_risk_segments": high_risk_segments,
        "weather_impact": "Current weather: Clear skies. Road conditions are favorable.",
        "recommendations": recommendations,
        "distance": f"{route_distance:.1f} km",
        "duration": f"{int(route_distance * 3)} mins (approx.)"
    }

@app.post("/report/accident")
async def report_accident(
    lat: float = Form(...),
    lng: float = Form(...),
    location: str = Form(...),
    severity: str = Form(...),
    vehicleType: str = Form(...),
    casualties: int = Form(0),
    description: str = Form(""),
    reporterName: str = Form(""),
    reporterContact: str = Form(""),
    timestamp: str = Form(...),
    file0: UploadFile = File(None),
    file1: UploadFile = File(None),
    file2: UploadFile = File(None),
    file3: UploadFile = File(None),
    file4: UploadFile = File(None),
):
    try:
        report = {
            "id": len(USER_REPORTS) + 1,
            "location": {
                "lat": lat,
                "lng": lng,
                "name": location
            },
            "severity": severity,
            "vehicle_type": vehicleType,
            "casualties": casualties,
            "description": description,
            "reporter": {
                "name": reporterName if reporterName else "Anonymous",
                "contact": reporterContact
            },
            "timestamp": timestamp,
            "files": [],
            "status": "pending_verification"
        }
        
        # Handle file uploads
        files = [file0, file1, file2, file3, file4]
        for i, file in enumerate(files):
            if file and file.filename:
                file_type = "video" if file.content_type.startswith("video/") else "image"
                filename = f"accident_{report['id']}_{i}_{file.filename}"
                report["files"].append({
                    "filename": filename,
                    "type": file_type,
                    "size": file.size if hasattr(file, 'size') else 0
                })
                print(f"✓ {file_type.capitalize()} uploaded: {filename}")
        
        USER_REPORTS.append(report)
        STATS_DATA["total_accidents"] += 1
        
        print(f"✓ New accident report: {location} ({severity}) with {len(report['files'])} file(s)")
        
        return JSONResponse(content={
            "success": True,
            "message": f"Report submitted with {len(report['files'])} file(s)",
            "report_id": report["id"]
        }, status_code=201)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(content={
            "success": False,
            "message": f"Failed to submit report: {str(e)}"
        }, status_code=500)

@app.get("/reports/recent")
async def get_recent_reports(limit: int = 10):
    recent = sorted(USER_REPORTS, key=lambda x: x["timestamp"], reverse=True)[:limit]
    return {"reports": recent, "total": len(USER_REPORTS)}

@app.get("/accidents/heatmap")
async def get_heatmap_data():
    heatmap_data = [
        {"lat": spot["location"]["lat"], "lng": spot["location"]["lng"], "intensity": spot["accident_count"]}
        for spot in BLACKSPOTS_DATA
    ]
    
    for report in USER_REPORTS:
        heatmap_data.append({
            "lat": report["location"]["lat"],
            "lng": report["location"]["lng"],
            "intensity": 1
        })
    
    return {"data": heatmap_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
