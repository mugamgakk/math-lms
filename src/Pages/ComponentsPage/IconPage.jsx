import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../../components/Icon";

const arr = [
    'apple',             'arrowA',
    'attendence',        'calendar',
    'close',             'download',
    'downloadB',         'mute',
    'evaluation',        'fast',
    'file',              'hamburger',
    'info',              'lnbDetail',
    'logout',            'menu_btn(close)',
    'more',              'notification',
    'pencil',            'play',
    'plus',              'plusLearning',
    'point',             'print',
    'reload',            'remove',
    'search',            'select_typeA',
    'select_typeB',      'select_typeC',
    'studentManagement', 'todayClass',
    'volume',            'warning',
    'lbt1',               'lbt2',
    'lbt3',               'lbt4',
    'lbt5',               
  ];

function IconPage() {
    return (
        <div>
            <h3>아이콘 클릭하면 복사됨</h3>

            <div className="row" style={{ flexWrap: "wrap" }}>
                {arr.map((a) => {
                    return <Box icon={a} key={a} />;
                })}
            </div>
            <pre>
                {
                    `
                    --- Props --- 
                    className                
                    icon
                    style
                    `
                }
            </pre>
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
        <div className="col-1 mb-2" data-id={`<Icon icon={"${icon}"} />`} onClick={handleCopyClipBoard} >
            <Icon icon={icon} />
            <p>{text}</p>
        </div>
    );
};

export default IconPage;
