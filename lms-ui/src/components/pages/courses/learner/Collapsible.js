import React,{useState} from "react";

function Collapsible() {
    // Initialize the state to control the visibility of content
    const [isOpen, setIsOpen] = useState(false);
    // Function to toggle the content visibility
    const toggleCollapsible = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <button onClick={toggleCollapsible}>
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
        {isOpen && (
          <div>
            {/* Content to be collapsed or expanded */}
            <p>This content can be collapsed or expanded.</p>
          </div>
        )}
      </div>
    );
  }
  export default Collapsible;