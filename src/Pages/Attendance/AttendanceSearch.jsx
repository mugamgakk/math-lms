import React, { useState } from "react";
import SearchBtn from "../../components/ui/button/SearchBtn";
import ClassSelect from "../../components/ui/select/ClassSelect";

function AttendanceSearch() {
    let [search, setSearch] = useState("");

    return (
        <div className="d-flex">
            <ClassSelect width={"200px"} />

            <input
                type="text"
                className="form-control"
                placeholder="학생"
                style={{ width: "200px", margin: "0 5px" }}
                value={search}
                onKeyUp={(e) => {
                    // if (e.key === "Enter") {
                    //     findUser();
                    // }
                }}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <SearchBtn />
        </div>
    );
}

export default AttendanceSearch;
