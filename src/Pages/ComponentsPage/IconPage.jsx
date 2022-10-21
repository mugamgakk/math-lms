import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../../components/Icon";

const arr = ["apple", "plus"];

function IconPage() {
    return (
        <div>
            <h3>아이콘 클릭하면 복사됨</h3>

            <div className="row" style={{ flexWrap: "wrap" }}>
                {arr.map((a) => {
                    return <Box icon={a} key={a} />;
                })}
            </div>

            <style>
                {`
                i{
                    font-size : 3rem;
                    cursor: pointer;
                }
            `}
            </style>
        </div>
    );
}

const Box = ({ icon }) => {
    let [text, setText] = useState("");

    const handleCopyClipBoard = async (e) => {
        await navigator.clipboard.writeText(e.currentTarget.dataset.id);
        setText("복사 완료");
    };

    useEffect(() => {
        if (text === "복사 완료") {
            setTimeout(() => {
                setText("");
            }, 500);
        }
    }, [text]);

    return (
        <div className="col-1" data-id={`<Icon icon={"${icon}"} />`} onClick={handleCopyClipBoard}>
            <Icon icon={icon} />
            <p>{text}</p>
        </div>
    );
};

export default IconPage;