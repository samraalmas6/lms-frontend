import React from 'react';

function FileUpload({ onFileChange }) {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    onFileChange(selectedFiles);
  };

  return (
    <div className="file-submission">
      <label>Select Files:</label>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" multiple />
    </div>
  );
}

export default FileUpload;

