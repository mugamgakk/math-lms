import React, { useRef, useState } from 'react';

// 총 페이지 넣기 

function Pagination({totalPage = 30, pageLength = 5,page,setPage}) {

    // 현재 페이지
    // let [page, setPage] = useState(1);

    const pageNum = ()=>{
        let pageGroup = Math.ceil(page / pageLength);
        let lastPage = pageGroup * pageLength;
        let firstPage = lastPage - 4;


        if(totalPage < lastPage){
            lastPage = totalPage
        }

        if(totalPage < pageLength){
            firstPage = 1;
            lastPage = totalPage
        }

        const result = [];
        
        for(let i = firstPage; i <= lastPage; i++ ){
            result.push(<li key={i} className={page === i ? 'active' : ''} onClick={()=>{setPage(i)}} >{i}</li>)
        }

        return result;
    }


    return ( 
        <div className='pagination'>
            <div className='box'>
                <button onClick={()=>{setPage(1)}}>◀◀</button>
                <button onClick={()=>{
                    page <= pageLength
                    ? setPage(1)
                    : setPage(page - pageLength)
                }}
                    >◀</button>
                <ol>
                    {pageNum()}
                </ol>
                <button onClick={()=>{
                    page > (totalPage - pageLength) && page <= totalPage
                    ? setPage(totalPage)
                    : setPage(page + pageLength)
                }}>▶</button>
                <button className='mx' onClick={()=>{
                    setPage(totalPage)
                }} >▶▶</button>
            </div>
        </div>
     );
}

export default Pagination;