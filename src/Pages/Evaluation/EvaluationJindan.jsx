import React from 'react';
import ReservationSearch from '../../components/ReservationSearch';
import EvaluationJindanContent from './EvaluationJindanContent';

function EvaluationJindan() {


    return ( 
        <div className='row'>
            <ReservationSearch/>
            <EvaluationJindanContent/>
        </div>
     );
}

export default EvaluationJindan;