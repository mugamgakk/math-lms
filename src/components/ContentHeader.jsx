import React from 'react';


function ContentHeader({title, location}) {
    return ( 
        <header className='content-header'>
            <h1 className='title'>{title}</h1>
            <strong>
                {location}
            </strong>
        </header>
     );
}

export default ContentHeader;