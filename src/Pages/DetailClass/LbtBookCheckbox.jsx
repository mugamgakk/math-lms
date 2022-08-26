import React, { useState, useEffect } from "react";

const 과목 = ["중 2 1 노벰", "중 2-2 엑사스", "중 2-2 노벰"];

function LbtBookCheckbox({ option, subjectArr, setSubjectArr }) {

    const checkedAll = (checked) => {
        if (checked) {
            setSubjectArr([...과목]);
        } else {
            setSubjectArr([]);
        }
    };

    const checkedOne = (checked, book) => {
        if (checked) {
            setSubjectArr([...subjectArr, book]);
        } else {
            setSubjectArr(subjectArr.filter((ele) => ele !== book));
        }
    };

    useEffect(() => {
        if (option) {
            let arr = [];

            과목.forEach((a) => {
                arr.push(a);
            });

            setSubjectArr(arr);
        } else {
            setSubjectArr([]);
        }
    }, [option]);

    return (
        <div className="lbt-bookarea">
            <div className="all-subject">
                <label htmlFor={"과목 전체"}>{"과목 전체"}</label>
                <input
                    type="checkbox"
                    id={"과목 전체"}
                    checked={subjectArr.length === 과목.length ? true : false}
                    onChange={(e) => {
                        checkedAll(e.target.checked);
                    }}
                />
            </div>

            <div className="item-subject">

            {과목.map((book) => {
                return (
                    <div key={book}>
                        <label htmlFor={book}>{book}</label>
                        <input
                            type="checkbox"
                            id={book}
                            onChange={(e) => {
                                checkedOne(e.target.checked, book);
                            }}
                            checked={subjectArr.includes(book) ? true : false}
                        />
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default LbtBookCheckbox;
