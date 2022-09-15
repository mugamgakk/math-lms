import React from 'react';
import { useState } from 'react';
import ReservationSearch from '../../components/ReservationSearch';
import EvaluationJindanContent from './EvaluationJindanContent';
import ReservationModal from './ReservationModal';

function EvaluationJindan() {


    return ( 
        <div className='row'>
            <ReservationSearch/>
            <EvaluationJindanContent/>

            {
                // modal && <ReservationModal/>
            }

        </div>
     );
}

export default EvaluationJindan;