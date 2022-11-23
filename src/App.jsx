import "./style/component.scss";
import "./style/common.scss";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";

// ui
import Components from "./Pages/Components";
import PrismaZoomPage from "./Pages/ComponentsPage/PrismaZoomPage";
import DatePickerPage from "./Pages/ComponentsPage/DatePickerPage";
import PrintPage from "./Pages/ComponentsPage/PrintPage";
import AudioPage from "./Pages/ComponentsPage/AudioPage";
import SelectPage from "./Pages/ComponentsPage/SelectPage";
import TableToExcel from "./Pages/ComponentsPage/TableToExcel";
import Editor from "./Pages/ComponentsPage/Editor";
import FileDownLoad from "./Pages/ComponentsPage/FileDownLoad";
import Spinner from "./Pages/ComponentsPage/Spinner";
import SkeletonPage from "./Pages/ComponentsPage/SkeletonPage";
import IconPage from "./Pages/ComponentsPage/IconPage";
import Ui from "./Pages/ComponentsPage/UiPage";

import Authentication from "./components/Authentication";
import Attendance from "./Pages/Attendance";

import TodayClass from "./Pages/TodayClass";

//학생별 수업관리
import DetailClass from "./Pages/DetailClass";
import ClassManagement from "./Pages/DetailClass/classTabs/ClassManagement";
import WrongAnswerMaster from "./Pages/DetailClass/classTabs/WrongAnswerMaster";
import LearningBreakdownTable from "./Pages/DetailClass/classTabs/LearningBreakdownTable";
import AttendanceManagement from "./Pages/DetailClass/classTabs/AttendanceManagement";

// 플러스 학습
import PlusLearning from "./Pages/PlusLearning";
import Narrative from "./Pages/PlusLearning/Narrative";
import TextBook from "./Pages/PlusLearning/TextBook";

// 평가관리
import Evaluation from "./Pages/Evaluation";
import EvaluationRoutine from "./Pages/Evaluation/EvaluationRoutine";
import EvaluationJindan from "./Pages/Evaluation/EvaluationJindan";

// 자료 및 알림
import DataService from "./Pages/DataService";
import Reference from "./Pages/ReferenceNotification/Reference";
import Notification from "./Pages/ReferenceNotification/Notification";

import Statistics from "./Pages/Statistics";

import ErrorPage from "./Pages/ErrorPage.jsx";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Authentication />}>
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="today-class" element={<TodayClass />} />
                    <Route path="detail-class" element={<DetailClass />}>
                        <Route path="management" element={<ClassManagement />} />
                        <Route path="wrong-answer" element={<WrongAnswerMaster />} />
                        <Route path="table" element={<LearningBreakdownTable />} />
                        <Route path="attend" element={<AttendanceManagement />} />
                    </Route>
                    <Route path="plus-learning" element={<PlusLearning />}>
                        <Route path="narrative" element={<Narrative/>}/>
                        <Route path="textBook" element={<TextBook/>}/>
                    </Route>
                    <Route path="evaluation" element={<Evaluation />}>
                        <Route path="routine" element={<EvaluationRoutine/>}/>
                        <Route path="jindan" element={<EvaluationJindan/>}/>
                    </Route>
                    <Route path="data-service" element={<DataService />}>
                        <Route path="reference" element={<Reference/>}/>
                        <Route path="notification" element={<Notification/>}/>
                    </Route>
                    <Route path="statistics" element={<Statistics />} />
                </Route>

                <Route path="/components" element={<Components />}>
                    <Route path="prismazoom" element={<PrismaZoomPage />} />
                    <Route path="datepicker" element={<DatePickerPage />} />
                    <Route path="print" element={<PrintPage />} />
                    <Route path="audio" element={<AudioPage />} />
                    <Route path="select" element={<SelectPage />} />
                    <Route path="file" element={<FileDownLoad />} />
                    <Route path="table-excel" element={<TableToExcel />} />
                    <Route path="editor" element={<Editor />} />
                    <Route path="spinner" element={<Spinner />} />
                    <Route path="skeleton" element={<SkeletonPage />} />
                    <Route path="icon" element={<IconPage />} />
                    <Route path="ui" element={<Ui />} />
                </Route>
                <Route
                    path="*"
                    element={<ErrorPage />}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
