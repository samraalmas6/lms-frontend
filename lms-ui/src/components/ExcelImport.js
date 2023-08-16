
import React, { useState } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

const ExcelImport = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [error, setError] = useState('');
  const [importedData, setImportedData] = useState([]);
  const [manualData, setManualData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add other fields here
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    ExcelRenderer(selectedFile, (err, resp) => {
      if (err) {
        console.log('Error reading Excel file:', err);
        setError('Error reading Excel file. Please try again.');
      } else {
        const { rows: importedRows, cols: importedCols } = resp;
        setRows(importedRows);
        setCols(importedCols);
        setError('');
        setImportedData(importedRows);
      }
    });
  };

  const handleRowSelection = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    const selectedRowData = importedData[rowIndex];
    setManualData({
      firstName: selectedRowData[0] || manualData.firstName,
      lastName: selectedRowData[1] || manualData.lastName,
      email: selectedRowData[2] || manualData.email,
      // Update other fields accordingly
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setManualData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Import from Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {rows.length > 0 && (
        <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
      )}

      {/* Display imported user data */}
      <ul>
        {importedData.map((row, rowIndex) => (
          <li
            key={rowIndex}
            onClick={() => handleRowSelection(rowIndex)}
            style={{ cursor: 'pointer' }}
          >
            Row {rowIndex + 1}
          </li>
        ))}
      </ul>

      {/* Autofill input fields with selected row's data */}
      {selectedRowIndex !== null && (
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={manualData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={manualData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={manualData.email}
            onChange={handleInputChange}
          />
          {/* Render other input fields as needed */}
        </div>
      )}

      {/* ... Other UI elements ... */}
    </div>
  );
};

export default ExcelImport;


// import { ExcelRenderer } from 'react-excel-renderer';

// const ExcelImport = () => {
//   const [file, setFile] = useState(null);
//   const [importedData, setImportedData] = useState([]);
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);

//   const handleFileUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     ExcelRenderer(selectedFile, (err, resp) => {
//       if (err) {
//         console.log('Error reading Excel file:', err);
//       } else {
//         const { rows: importedRows } = resp;
//         setImportedData(importedRows);
//       }
//     });
//   };

//   const handleRowSelection = (rowIndex) => {
//     setSelectedRowIndex(rowIndex);
//   };

//   return (
//     <div>
//       <h2>Import from Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

//       {/* Display imported user data */}
//       <ul>
//         {importedData.map((row, rowIndex) => (
//           <li
//             key={rowIndex}
//             onClick={() => handleRowSelection(rowIndex)}
//             style={{ cursor: 'pointer' }}
//           >
//             Row {rowIndex + 1}
//           </li>
//         ))}
//       </ul>

//       {/* Autofill input fields with selected row's data */}
//       {selectedRowIndex !== null && (
//         <div>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={importedData[selectedRowIndex][0] || ''}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={importedData[selectedRowIndex][1] || ''}
//           />
//           <input
//             type="text"
//             placeholder="Email"
//             value={importedData[selectedRowIndex][2] || ''}
//           />
//           {/* Render other input fields as needed */}
//         </div>
//       )}

//       {/* ... Other UI elements ... */}
//     </div>
//   );
// };

// export default ExcelImport;





// import React, { useState } from 'react';
// import { OutTable, ExcelRenderer } from 'react-excel-renderer';

// const ExcelImport = () => {
//   const [file, setFile] = useState(null);
//   const [rows, setRows] = useState([]);
//   const [cols, setCols] = useState([]);
//   const [error, setError] = useState('');

//   const handleFileUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     ExcelRenderer(selectedFile, (err, resp) => {
//       if (err) {
//         console.log('Error reading Excel file:', err);
//         setError('Error reading Excel file. Please try again.');
//       } else {
//         const { rows: importedRows, cols: importedCols } = resp;
      

      
//         // if (!hasRequiredColumns(importedCols)) {
//         //   setError('Required columns are missing in the imported Excel file.');
//         // } else {
//           setRows(importedRows);
//           setCols(importedCols);
//           setError('');

//           const obj = {rows}
//           console.log(obj)
//         // }
//       }

//     });
//   };

//   const hasRequiredColumns = (columns) => {
//     // Define your list of required column names
//     const requiredColumns = ['First Name', 'Last Name', 'Email'];

//     // Check if all required columns are present in the imported Excel columns
//     return requiredColumns.every((requiredColumn) =>
//       columns.some((col) => col === requiredColumn)
//     );
//   };

//   return (
//     <div>
//       <h2>Import from Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {rows.length > 0 && (
//         <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
//       )}
//       {/* ... Other UI elements ... */}
//     </div>
//   );
// };




