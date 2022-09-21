import React from 'react';
import style from '../style/style-module/Skeleton.module.scss';

function SkeletonTable({Tr, Td}) {

    Tr = new Array(Tr).fill(1)
    Td = new Array(Td).fill(1)

    return ( 
        <>
        {
            Tr.map((a,i)=>{
                return (
                    <tr key={i}>
                        {
                            Td.map(dd=>{
                                return (
                                    <td key={i + 100}>
                                        <div className={style.box}></div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }
        </>
     );
}

export default SkeletonTable;