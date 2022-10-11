import React, { lazy, Suspense } from "react";
import "./style/reset.scss";
import "./style/component.scss";
import "./style/common.scss";
import "./style/utility.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
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

// 스피너
import FadeLoader from "react-spinners/FadeLoader";
import { useEffect } from "react";

const Attendance = lazy(() => import("./Pages/Attendance"));
const DetailClass = lazy(() => import("./Pages/DetailClass"));
const PlusLearning = lazy(() => import("./Pages/PlusLearning"));
const TodayClass = lazy(() => import("./Pages/TodayClass"));
const Evaluation = lazy(() => import("./Pages/Evaluation"));
const Statistics = lazy(() => import("./Pages/Statistics"));
const Reference = lazy(() => import("./Pages/ReferenceNotification"));

const override = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
};

function App() {
    const isLogin = localStorage.getItem("lmsLogin");
    const navigate = useNavigate();

    useEffect(()=>{
        const pathName = sessionStorage.getItem("pathName");
        isLogin ? navigate(pathName) : navigate("/login");
    },[])

    return (
        <div>
            <Suspense fallback={<FadeLoader color={"#999"} cssOverride={override} size={100} />}>
                <Routes>
                    {isLogin ? (
                        <>
                            <Route path="/" element={<Home />}>
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
                            </Route>
                            <Route
                                path="*"
                                element={<div style={{ textAlign: "center" }}>페이지 없습니둥</div>}
                            />
                        </>
                    ) : (
                        <Route path="/login" element={<Login />} />
                    )}
                </Routes>
            </Suspense>

        </div>
    );
}


export default App;
