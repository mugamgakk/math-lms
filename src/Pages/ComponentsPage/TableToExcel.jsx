import React, { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

function TableToExcel() {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Users table",
        sheet: "Users",
    });

    // currentTableRef: tableRef.current,  테이블 돔 선택
    // filename: "Users table",  파일 명
    // sheet: "Users",  엑셀 시트 명

    return (
        <div>
            <button className="btn" onClick={onDownload}> 엑셀로 만들기 </button>

            <table ref={tableRef}>
                <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Edison</td>
                        <td>Padilla</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>Alberto</td>
                        <td>Lopez</td>
                        <td>94</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableToExcel;
