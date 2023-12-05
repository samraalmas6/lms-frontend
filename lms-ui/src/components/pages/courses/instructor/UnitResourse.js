import { Editor } from '@tinymce/tinymce-react';
import React from 'react'

const UnitResourse = () => {
  return (
    <div>
        <div className="assignment-details">
            <form>
              <i className="fas fa-pen"></i>
              <input
                type="text"
                placeholder="Title"
                value={''}
                // className="assignment-screen-input-field "
                onChange={''}
              />
            </form>
            <div className="editor-container">
              <div>
               
              </div>
              <div className="description-container">
                <div>
                  <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                    }}
                    // onEditorChange={handleEditorChange}
                    // onEditorChange={(value, evt) =>
                    // //   handleEditorChange(value, evt)
                    // }
                    // value={content}
                  />
                </div>
                {/* <div>
                <FileUploadComponent />
              </div> */}
              </div>
            </div>
            
            <button
             type='button'
            >
            Add Resources
            </button>
          </div>
    </div>
  )
}

export default UnitResourse
