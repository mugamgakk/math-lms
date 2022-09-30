import React, { useCallback, useRef, useState } from 'react';
import style from '../style/style-module/pagination.module.scss';



// 총 페이지 넣기 

function Pagination({totalPage = 30, pageLength = 5}) {

    // 현재 페이지
    let [page, setPage] = useState(1);

    const pageNum = useCallback(()=>{
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
            result.push(<li key={i} className={page === i ? style.active : ''} onClick={()=>{setPage(i)}} >{i}</li>)
        }

        return result;
    },[page])


    return ( 
        <div className={style.pagination}>
            <div className={style.box}>
                <button onClick={()=>{setPage(1)}}>&lt;&lt;</button>
                <button onClick={()=>{
                    page <= pageLength
                    ? setPage(1)
                    : setPage(page - pageLength)
                }}
                    >&lt;</button>
                <ol>
                    {pageNum()}
                </ol>
                <button onClick={()=>{
                    page > (totalPage - pageLength) && page <= totalPage
                    ? setPage(totalPage)
                    : setPage(page + pageLength)
                }}>&gt;</button>
                <button className={style.mx} onClick={()=>{
                    setPage(totalPage)
                }} >&gt;&gt;</button>
            </div>
        </div>
     );
}

export default Pagination;