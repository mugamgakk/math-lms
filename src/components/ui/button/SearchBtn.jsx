import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function SearchBtn(props) {

    return ( 
        <button type='button' className='searchBtn' onClick={props.onClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
     );
}

export default SearchBtn;