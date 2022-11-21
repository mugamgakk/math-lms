import React from 'react';
import Icon from '../../Icon';
function SearchBtn({onClick}) {
    return ( 
        <button type='button' className='btn-search btn-green' onClick={onClick && onClick}><Icon icon={"search"} />검색</button>
     );
}

export default SearchBtn;