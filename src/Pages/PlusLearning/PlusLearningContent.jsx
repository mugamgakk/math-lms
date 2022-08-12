import React from 'react';
import {useSelector} from 'react-redux';
import Narrative from './Narrative';
import PlusLearningAlert from './PlusLearningAlert';
import TextBook from './TextBook';



function PlusLearningContent({tab}) {

    let {clickStudent} = useSelector((state)=> state.studentList)


    return ( 
        <div className="students-contents">
            
            {
                clickStudent.name === ''
                ? <PlusLearningAlert contentName={tab} />
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