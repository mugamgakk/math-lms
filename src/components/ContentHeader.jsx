import React from 'react';


function ContentHeader({title, location}) {
    return ( 
        <header className='fj border-bottom pb-3 mb-3'>
            <h3 className='title'>{title}</h3>
            <strong>
                {location}
            </strong>
        </header>
     );
}

export default ContentHeader;