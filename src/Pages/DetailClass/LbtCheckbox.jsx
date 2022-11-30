import React from 'react';
import Checkbox from '../../components/Checkbox';

function LbtCheckbox({ ele }) {
    return (
        <div className="part" key={ele.option}>
            <div className="part-title">
                <Checkbox color="orange" id={ele.option} />
                <label htmlFor={ele.option}>{ele.option}</label>
            </div>
            <ul className="part-list">
                {
                    ele.optionItem.map(a => {
                        return (
                            <li>
                                <Checkbox color="orange" id={a} />
                                <label htmlFor={a}>{a}</label>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    );
}

export default LbtCheckbox;