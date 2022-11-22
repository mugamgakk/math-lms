import React from 'react';
import Icon from './Icon';


function ContentHeader({ title, location, icon, current }) {
    return (
        <header className='fj content-head'>
            <div className='title fa'>
                <Icon icon={icon} style={{ color: "#00A37F" }} />
                <h3>{title}</h3>
            </div>
            <p className='location'>

                {
                    location?.map(a => {
                        return (
                            <span key={a}>
                                {a} <Icon icon={"arrowA"} />
                            </span>
                        )
                    })
                }

                <strong>
                    {current}
                </strong>
            </p>
        </header>
    );
}

export default ContentHeader;