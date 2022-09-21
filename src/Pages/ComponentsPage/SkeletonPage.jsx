import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SkeletonTable from "../../components/SkeletonTable";

function SkeletonPage() {
    let [skeleton, setSkeleton] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setSkeleton(false)
        },1500)
    },[])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Day</th>
                    </tr>
                </thead>
                <tbody>
                    {skeleton && <SkeletonTable Tr={4} Td={4} />}
                    {/* props로 Tr의 숫자 Td의 갯수를 넣어주면 됨 */}

                    {!skeleton && (
                        <>
                            <tr>
                                <td>1</td>
                                <td>글제목</td>
                                <td>컨텐츠</td>
                                <td>2022.12.22</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>글제목</td>
                                <td>컨텐츠</td>
                                <td>2022.12.22</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>글제목</td>
                                <td>컨텐츠</td>
                                <td>2022.12.22</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>글제목</td>
                                <td>컨텐츠</td>
                                <td>2022.12.22</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SkeletonPage;
