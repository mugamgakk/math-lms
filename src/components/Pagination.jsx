import React, { useCallback, useRef, useState } from 'react';
import style from '../style/style-module/pagination.module.scss';



// 총 페이지 넣기 
const pageFull = 30;


function Pagination() {

    // 현재 페이지
    let [page, setPage] = useState(10);

    const pageNum = useCallback(()=>{
        let pageGroup = Math.ceil(page / 5);
        let lastPage = pageGroup * 5;
        let firstPage = lastPage - 4;

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
                    page <= 5
                    ? setPage(1)
                    : setPage(page - 5)
                }}
                    >&lt;</button>
                <ol>
                    {pageNum()}
                </ol>
                <button onClick={()=>{
                    page > (pageFull - 5) && page <= pageFull
                    ? setPage(pageFull)
                    : setPage(page + 5)
                }}>&gt;</button>
                <button className={style.mx} onClick={()=>{
                    setPage(pageFull)
                }} >&gt;&gt;</button>
            </div>
        </div>
     );
}

export default Pagination;