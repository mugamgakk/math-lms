import React, { lazy, Suspense,  } from 'react';
import './style/reset.scss';
import './style/component.scss';
import './style/common.scss';
import './style/utility.scss'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';

// ui
import Components from './Pages/Components';
import PrismaZoomPage from './Pages/ComponentsPage/PrismaZoomPage';
import DatePickerPage from './Pages/ComponentsPage/DatePickerPage';
import PrintPage from './Pages/ComponentsPage/PrintPage';
import AudioPage from './Pages/ComponentsPage/AudioPage';
import SelectPage from './Pages/ComponentsPage/SelectPage';
import TableToExcel from './Pages/ComponentsPage/TableToExcel';
import Editor from './Pages/ComponentsPage/Editor';


const Login = lazy(()=> import('./Pages/Login') )
const Attendance = lazy(()=> import('./Pages/Attendance') )
const DetailClass = lazy(()=> import('./Pages/DetailClass'))
const PlusLearning = lazy(()=> import('./Pages/PlusLearning') )
const TodayClass = lazy(()=> import('./Pages/TodayClass') )
const Evaluation = lazy(()=> import('./Pages/Evaluation') )
const Statistics = lazy(()=> import('./Pages/Statistics') )
const FileDownLoad = lazy(()=> import('./Pages/ComponentsPage/FileDownLoad') )


function App() {


  return ( 
    <div>

      <div className="container">
        <ul className='row'>
          <li style={{marginRight : "20px"}}><Link to="/attendance">출석체크</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/today-class">오늘의 수업</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/detail-class">학생별 수업 관리</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/plus-learning">플러스 러닝</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/evaluation">평가관리</Link></li>
          <li style={{marginRight : "20px"}}><Link to="/statistics">학습 통계</Link></li>
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
        <Route path="/evaluation" element={<Evaluation/>}/>
        <Route path="/statistics" element={<Statistics/>}/>

        <Route path="/components" element={<Components/>}>
            <Route path="prismazoom" element={<PrismaZoomPage/>} />
            <Route path="datepicker" element={<DatePickerPage/>} />
            <Route path="print" element={<PrintPage/>} />
            <Route path="audio" element={<AudioPage/>} />
            <Route path="select" element={<SelectPage/>} />
            <Route path="file" element={<FileDownLoad/>}/>
            <Route path="table-excel" element={<TableToExcel/>}/>
            <Route path="editor" element={<Editor/>}/>
        </Route>
        <Route path="*" element={<div style={{textAlign : "center"}}>페이지 없습니둥</div>} />
      </Routes>
      </Suspense>

    </div>
   );
}



export default App;