import React from 'react';


function ContentHeader({title}) {
    return ( 
        <header className='content-header'>
            <h1 className='title'>{title}</h1>
            <ul className='location-list'>
                <li>마이페이지 &gt; </li>
                <li>수학 학습 관리 &gt; </li>
                <li>{title}  </li>
            </ul>
        </header>
     );
}

export default ContentHeader;