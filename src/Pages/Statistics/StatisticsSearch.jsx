import React, { useState } from "react";
import SelectBox from "../../components/ui/select/SelectBox";
import DatePicker from "react-date-picker";

const options = [];

function StatisticsSearch() {
    let [checkState, setCheckState] = useState([]);

    return (
        <div className="StatisticsSearch">
            <SelectBox width={"200px"} checkState={checkState} setCheckState={setCheckState} />

            <DatePicker
                className="datepicker-base"
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                minDetail="month"
            />
            <DatePicker
                className="datepicker-base"
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                minDetail="month"
            />
            <input type="text" className="form-control" placeholder="학생 이름" />
            <button type="button" className="btn">조회</button>
        </div>
    );
}

export default StatisticsSearch;
