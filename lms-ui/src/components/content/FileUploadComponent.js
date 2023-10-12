import React, { useState } from "react";
import "../styles/FileUploadComponent.css";

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="file-attach-div">
      <i class="fas fa-solid fa-paperclip"></i>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
