import React from 'react';

function LinkUpload({ link, onLinkChange }) {
  return (
    <div className="link-submission">
      <label>Add Link:</label>
      <input
        type="text"
        value={link}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="Enter URL"
      />
    </div>
  );
}

export default LinkUpload;
