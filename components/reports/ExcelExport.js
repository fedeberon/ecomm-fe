import * as FileSaver from "file-saver"
import XSLX from "sheetjs-style"


const ExcelExport = ({excelData, fileName}) => {

    const fileExtension = `.xlsx`

    const exportToExcel = async () => {
        const ws = XSLX.utils.json_to_sheet(excelData);
        const wb = {
            Sheets: {
                "data": ws
            },
            SheetNames: ["data"]
        };
        const excelBuffer =  XSLX.write(
            wb,
            {
                bookType: "xlsx",
                type: "array"
            }
        );

        const data = new Blob([excelBuffer], {type: ""})
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
            <button className="py-2 px-4 ml-4 bg-green-500 text-white rounded hover:bg-blue-700" onClick={(e) => exportToExcel()}>Exportar</button>
    )


}

export default ExcelExport