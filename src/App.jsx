import React, { lazy, Suspense, useRef } from 'react';
import './style/reset.scss';
import './style/layout.scss';
import './style/component.scss';
import './style/common.scss';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import PrismaZoom from 'react-prismazoom'

const Login = lazy(()=> import('./Pages/Login') )
const Attendance = lazy(()=> import('./Pages/Attendance') )
const DetailClass = lazy(()=> import('./Pages/DetailClass'))
const PlusLearning = lazy(()=> import('./Pages/PlusLearning') )


function App() {

  let prizmaZoom = useRef();

  return ( 
    <div>

      <div style={{width : '300px', height : "200px", overflow : "hidden"}}>
      <PrismaZoom ref={prizmaZoom} >
        <img src="https://img.insight.co.kr/static/2018/02/12/700/vrk5z3a409vt02d3jvb7.jpg" style={{width : "300px",  height : "200px", objectFit: "cover"}}/>
      </PrismaZoom>
      </div>

      <button onClick={()=>{prizmaZoom.current.zoomIn(1)}}>플러스</button>
      <button onClick={()=>{prizmaZoom.current.zoomOut(1)}}>마이너스</button>

      <div className="container">
        <ul className='row'>
          <li style={{marginRight : "20px"}}><Link to="/attendance">attendance</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/detail-class">Detail class</Link></li>
          <li><Link to="/plus-learning">plus-learning</Link></li>
        </ul>
      </div>


      <Suspense fallback={<div>로딩</div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/detail-class" element={<DetailClass/>}/>
        <Route path="/plus-learning" element={<PlusLearning/>}/>
        <Route path="*" element={<div>페이지 없습니둥</div>} />
      </Routes>
      </Suspense>

    </div>
   );
}



export default App;