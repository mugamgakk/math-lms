import React from 'react';
import style from '../style/style-module/Skeleton.module.scss';

function SkeletonTable({R, D}) {

    R = new Array(R).fill(1)
    D = new Array(D).fill(1)

    return ( 
        <>
        {
            R.map((a,i)=>{
                return (
                    <tr key={i}>
                        {
                            D.map((dd,i)=>{
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