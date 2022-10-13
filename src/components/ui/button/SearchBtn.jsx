import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function SearchBtn({onClick}) {

    return ( 
        <button type='button' className='btn' 
        onClick={onClick && onClick}
        >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
     );
}

export default SearchBtn;