import React from 'react';
import style from '../style/style-module/Skeleton.module.scss';

function SkeletonTable({ R, width }) {

    R = new Array(R).fill(1)

    return (
        <>
            {
                R.map((a, i) => {
                    return (
                        <tr key={i}>
                            {
                                width?.map((dd, i) => {
                                    return (
                                        <td key={i + 100} style={{width : dd, padding : "8px"}}>
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