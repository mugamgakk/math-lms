import React from 'react';
import Tr from './TodayClassTr';

const TodayClass = ({findTodayList}) => {
    const list = findTodayList;
    
    // className의 총 개수로 이름 rowspan 결정
    const getNameRowspan = (student) => {
        let rowSpan = 0;
        const { book : books} = student;
        books.forEach((book) => {
            rowSpan += book.className.length;
        });
        return rowSpan;
    }

    // 학생 데이터 tbody 생성
    const tbodies = list.map((student,k) => {

        // rowspan 값 추출
        let trLength = Number(getNameRowspan(student));
        const { book : books} = student;
       
        // 교재 추출
        const firstRow = books.map((book,v)=>{ 
            const { className : classes} = book;
           
            //  단원 추출
            const classList = classes.map((_class,i)=>{
                    // 교재 = 단원 === 0 일때 학생명 td 존재 , 위에서 구한 단원의 총 개수로 rowspan 값
                    const name = (i === 0 && v === 0) ? <td rowSpan={trLength}>{student.name}({student.nickName})</td> : null;
                    // 단원 i = 0 교재명 td 존재 , 단원 개수로 rowspan 값
                    const bookTd = i === 0 ? <td rowSpan={classes.length}>{book.bookTit}</td> : null;

                return <Tr 
                        key={_class.tit} 
                        data={_class} 
                        name={student.name} 
                        book={book.bookTit} 
                        tdName={name} 
                        tdBook={bookTd}/>
            });
           return classList;
        });

         return(
                <tbody key={student.id} className={student.name}>
                    {firstRow}
                </tbody> 
        )
    }) 
    return tbodies;
}
export default TodayClass;