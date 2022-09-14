import React from 'react';
import {Outlet, Link} from 'react-router-dom';

function Components() {

    return (
        <div className="container">
            <ul className='row'>
                <li style={{marginRight : "20px"}}><Link to="/components/prismazoom">이미지 축소 확대</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/datepicker">데이트핔커</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/print">인쇄/ pdf </Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/audio">오디오 컴포넌트</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/select">셀렉트</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/file">파일 업로드 & 다운로드</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/table-excel">테이플 to 엑셀</Link></li>
                <li style={{marginRight : "20px"}}><Link to="/components/editor">텍스트 에디터</Link></li>
            </ul>
          <Outlet/>
            
        </div>
    );
}

export default Components;
