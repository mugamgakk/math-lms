import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function SearchBtn() {
    return ( 
        <button type='button' className='searchBtn'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
     );
}

export default SearchBtn;