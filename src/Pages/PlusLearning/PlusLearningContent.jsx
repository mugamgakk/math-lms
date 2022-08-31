import React from 'react';
import {useSelector} from 'react-redux';
import AlertBox from '../../components/AlertBox';
import Narrative from './Narrative';
import TextBook from './TextBook';



function PlusLearningContent({tab}) {

    let {clickStudent} = useSelector((state)=> state.studentsSearchSlice)

    return ( 
        <div className="students-contents">
            
            {
                clickStudent === null
                ? <AlertBox name={tab} bg="pink" />
                : (
                    {
                        서술형 :  <Narrative/>,
                        교과서 :  <TextBook/>
                    }[tab]
                )
            }

        </div>
     );
}



export default PlusLearningContent;