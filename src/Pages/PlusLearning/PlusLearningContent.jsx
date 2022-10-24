import React from 'react';
import AlertBox from '../../components/AlertBox';
import Narrative from './Narrative';
import TextBook from './TextBook';
import useStudentsStore from '../../store/useStudentsStore';



function PlusLearningContent({tab}) {

    const clickStudent = useStudentsStore(state=>state.clickStudent)

    return ( 
        <div className='bg col-8'>
            
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