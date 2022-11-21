import React from 'react';

function SearchBtn({onClick}) {
    return ( 
        <button type='button' className='btn-search btn-green' onClick={onClick && onClick}>검색</button>
     );
}

export default SearchBtn;