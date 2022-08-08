import React, { lazy, Suspense, useEffect } from 'react';
import './reset.scss';
import './style/layout.scss';
import './style/component.scss'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

const Attendance = lazy(()=> import('./Pages/Attendance') )
const DetailClass = lazy(()=> import('./Pages/DetailClass'))

function App() {


  return ( 
    <div>
      <Suspense fallback={<div>로딩</div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/detail-class" element={<DetailClass/>}/>
      </Routes>
      </Suspense>
    </div>
   );
}

export default App;