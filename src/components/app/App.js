import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(()=> import('../pages/404'))
const MainPage = lazy(()=>import('../pages/MainPage'))
const ComicsPage = lazy(()=>import('../pages/ComicsPage'))
const SinglePage = lazy(()=>import('../pages/SinglePage'))


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/> 
                            <Route path="/comics/:comicId" element={<SinglePage/>}/>
                            <Route path="/charapter/:charId" element={<SinglePage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;