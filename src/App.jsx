import React, { lazy, Suspense,  } from 'react';
import './style/reset.scss';
import './style/layout.scss';
import './style/component.scss';
import './style/common.scss';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';

import Components from './Pages/Components';

const Login = lazy(()=> import('./Pages/Login') )
const Attendance = lazy(()=> import('./Pages/Attendance') )
const DetailClass = lazy(()=> import('./Pages/DetailClass'))
const PlusLearning = lazy(()=> import('./Pages/PlusLearning') )
const TodayClass = lazy(()=> import('./Pages/TodayClass') )


function App() {


  return ( 
    <div>
      
      <div className="container">
        <ul className='row'>
          <li style={{marginRight : "20px"}}><Link to="/attendance">attendance</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/detail-class">Detail class</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/plus-learning">plus-learning</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/today-class">today-class</Link></li>
          <li><Link to="/components">components guide</Link></li>
        </ul>
      </div>


      <Suspense fallback={<div>로딩</div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/detail-class" element={<DetailClass/>}/>
        <Route path="/plus-learning" element={<PlusLearning/>}/>
        <Route path="/today-class" element={<TodayClass/>}/>
        <Route path="/components" element={<Components/>}/>
        <Route path="*" element={<div>페이지 없습니둥</div>} />
      </Routes>
      </Suspense>

    </div>
   );
}



export default App;