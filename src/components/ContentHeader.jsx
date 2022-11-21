import React from 'react';


function ContentHeader({title, location, children}) {
    return ( 
        <header className='content-head'>
            <div className='title'>
                {children}
                <h3> {title}</h3>
            </div>
            <p className='location'>
                {location}
                <strong>
                {title}
                </strong>
            </p>
        </header>
     );
}

export default ContentHeader;