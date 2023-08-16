import * as FileSaver from 'file-saver'
import * as XLSX from 'sheetjs-style'

const ExportExcel = ({excelData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreedsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx'
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData)
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']}
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'})
        const data = new Blob([excelBuffer], {type: fileType})
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <>
            <button type='button' onClick={(e) => exportToExcel(fileName)} style={{width: '100%', height: "100%", margin: '0px', display: 'none'}}></button>
        </>
    )

}
export default ExportExcel
