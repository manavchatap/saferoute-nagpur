import { useState } from 'react';

export default function ReportAccident() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    severity: 'minor',
    vehicleType: 'two-wheeler',
    casualties: 0,
    description: '',
    reporterName: '',
    reporterContact: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    selectedFiles.forEach(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;

      if (!isImage && !isVideo) {
        setError('Only images and videos are allowed');
        return;
      }

      if (file.size > maxSize) {
        setError(`File too large. Max ${isVideo ? '50MB' : '10MB'}`);
        return;
      }

      validFiles.push(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        validPreviews.push(reader.result as string);
        if (validPreviews.length === selectedFiles.length) {
          setFilePreviews(prev => [...prev, ...validPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setFiles(prev => [...prev, ...validFiles]);
    setError('');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location) {
      setError('Please enter accident location');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('lat', '21.1458');
      submitData.append('lng', '79.0882');
      submitData.append('location', formData.location);
      submitData.append('severity', formData.severity);
      submitData.append('vehicleType', formData.vehicleType);
      submitData.append('casualties', formData.casualties.toString());
      submitData.append('description', formData.description);
      submitData.append('reporterName', formData.reporterName || 'Anonymous');
      submitData.append('reporterContact', formData.reporterContact);
      submitData.append('timestamp', new Date().toISOString());

      files.forEach((file, index) => {
        submitData.append(`file${index}`, file);
      });

      const response = await fetch('http://localhost:8000/report/accident', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to submit report');

      setSuccess(true);
      
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
        setFormData({
          location: '',
          severity: 'minor',
          vehicleType: 'two-wheeler',
          casualties: 0,
          description: '',
          reporterName: '',
          reporterContact: '',
        });
        setFiles([]);
        setFilePreviews([]);
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to submit report. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isVideo = (file: File) => file.type.startsWith('video/');

  return (
    <div className="report-accident-container">
      <div className="report-header">
        <h2 className="section-title">Report an Accident</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
          Help make Nagpur roads safer by reporting accidents with evidence
        </p>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="report-btn">
            + Report New Accident
          </button>
        )}
      </div>

      {showForm && (
        <div className="report-form-container" style={{ animation: 'slideDown 0.3s' }}>
          <form onSubmit={handleSubmit}>
            {/* Location Name */}
            <div className="form-section">
              <label className="form-label-clean">
                Location Name or Landmark <span className="required-text">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. Near Sitabuldi Fort, CA Road Junction, Seminary Hills"
                className="form-input"
                required
              />
            </div>

            {/* Severity */}
            <div className="form-section">
              <label className="form-label-clean">
                Severity Level <span className="required-text">*</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => handleInputChange('severity', e.target.value)}
                className="form-input"
                required
              >
                <option value="minor">Minor - No injuries, vehicle damage only</option>
                <option value="moderate">Moderate - Minor injuries</option>
                <option value="severe">Severe - Major injuries, hospitalization needed</option>
                <option value="fatal">Fatal - Death involved</option>
              </select>
            </div>

            {/* Vehicle Type */}
            <div className="form-section">
              <label className="form-label-clean">
                Vehicle Type <span className="required-text">*</span>
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="form-input"
                required
              >
                <option value="two-wheeler">Two-wheeler (Bike/Scooter)</option>
                <option value="three-wheeler">Three-wheeler (Auto-rickshaw)</option>
                <option value="car">Car/Sedan/SUV</option>
                <option value="heavy-vehicle">Heavy Vehicle (Truck/Bus)</option>
                <option value="pedestrian">Pedestrian</option>
                <option value="multiple">Multiple Vehicles</option>
              </select>
            </div>

            {/* Casualties */}
            <div className="form-section">
              <label className="form-label-clean">
                Number of Casualties
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={formData.casualties}
                onChange={(e) => handleInputChange('casualties', parseInt(e.target.value) || 0)}
                className="form-input"
                placeholder="0"
              />
            </div>

            {/* File Upload */}
            <div className="form-section">
              <label className="form-label-clean">
                Upload Photos or Videos <span className="optional-text">(Maximum 5 files)</span>
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="file-input"
                  id="file-upload"
                  disabled={files.length >= 5}
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <span className="upload-icon-text">UPLOAD</span>
                  <span className="upload-text">
                    {files.length === 0 
                      ? 'Click to upload photos or videos' 
                      : `${files.length}/5 files selected`}
                  </span>
                  <span className="upload-hint">
                    Images (max 10MB) or Videos (max 50MB)
                  </span>
                </label>
              </div>

              {filePreviews.length > 0 && (
                <div className="file-preview-grid">
                  {filePreviews.map((preview, index) => (
                    <div key={index} className="file-preview-item">
                      {isVideo(files[index]) ? (
                        <video src={preview} className="preview-video" controls />
                      ) : (
                        <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="remove-file-btn"
                        title="Remove file"
                      >
                        X
                      </button>
                      <div className="file-type-badge">
                        {isVideo(files[index]) ? 'Video' : 'Photo'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-section">
              <label className="form-label-clean">
                Description or Additional Details
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what happened, road conditions, time of day, weather conditions, etc."
                className="form-input"
                rows={4}
              />
            </div>

            {/* Reporter Info */}
            <div className="form-section">
              <label className="form-label-clean">
                Your Name <span className="optional-text">(Optional - Leave blank to remain anonymous)</span>
              </label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => handleInputChange('reporterName', e.target.value)}
                placeholder="Enter your name"
                className="form-input"
              />
            </div>

            <div className="form-section">
              <label className="form-label-clean">
                Contact Number <span className="optional-text">(Optional - For follow-up purposes)</span>
              </label>
              <input
                type="tel"
                value={formData.reporterContact}
                onChange={(e) => handleInputChange('reporterContact', e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="form-input"
                maxLength={10}
              />
            </div>

            {error && (
              <div className="error-message" style={{ animation: 'shake 0.5s' }}>
                Warning: {error}
              </div>
            )}

            {success && (
              <div className="success-message" style={{ animation: 'fadeIn 0.3s' }}>
                Success! Your report with {files.length} file(s) has been submitted.
              </div>
            )}

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError('');
                  setFiles([]);
                  setFilePreviews([]);
                }}
                className="cancel-btn"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting || !formData.location}
              >
                {submitting ? 'Uploading...' : `Submit Report${files.length > 0 ? ` (${files.length} files)` : ''}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Info Section */}
      {!showForm && (
        <div className="info-section">
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
            Why Report with Evidence
          </h3>
          <ul className="info-list">
            <li>Photos and videos help verify accident details</li>
            <li>Visual evidence improves data accuracy</li>
            <li>Helps authorities respond faster</li>
            <li>Strengthens safety analysis for the community</li>
            <li>Together we make Nagpur roads safer</li>
          </ul>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '1rem' }}>
            All uploads are secure and used only for safety analysis. Personal data is protected.
          </p>
        </div>
      )}
    </div>
  );
}
