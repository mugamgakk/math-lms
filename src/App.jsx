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

import Authentication from "./components/Authentication";
import Attendance from "./Pages/Attendance";
import DetailClass from "./Pages/DetailClass";
import PlusLearning from "./Pages/PlusLearning";
import TodayClass from "./Pages/TodayClass";
import Evaluation from "./Pages/Evaluation";
import Statistics from "./Pages/Statistics";
import Reference from "./Pages/ReferenceNotification";
import { lazy } from "react";

const ErrorPage = lazy(()=> import("./Pages/ErrorPage.jsx") )

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Authentication />}>
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="detail-class" element={<DetailClass />} />
                    <Route path="plus-learning" element={<PlusLearning />} />
                    <Route path="today-class" element={<TodayClass />} />
                    <Route path="evaluation" element={<Evaluation />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="Reference" element={<Reference />} />
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
                </Route>
                <Route
                    path="*"
                    element={<ErrorPage/>}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
