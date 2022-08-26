import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TodayClassItem () {
    let list = useSelector(state => state.todayClassList);

    const listMap = list.map((user,i) => {
            console.log(user);
            const bookTit = user.book.map((bt,i)=>{
                console.log(bt,i);
            });
        return(
            <tbody className={user.name} key={i}>

            </tbody>
            
        )
    });
    return(
    <>

                {listMap}
            {/* <tr>
                <td rowSpan={3}>aa</td> 
                <td rowSpan={2}>aa</td> 
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
            </tr>
            <tr>
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
            </tr>
            <tr>
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
                <td>aa</td> 
            </tr> */}
      
        </>
    )
}
export default TodayClassItem;