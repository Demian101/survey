import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NeedAuth from "./components/NeedAuth";
import AuthPage from "./pages/AuthPage";
import FormPage from "./pages/FormPage";


// import Header from "./widgets/Header";
// import Footer from "./widgets/Footer";
// import ReactQuery from './components/ReactQuery'
// import ReduxTest from './components/ReduxTest'
// import SignupForm from './form/SignupForm';
// import HookForm from './form/HookFormRadio';

const App = () => {
  return (
    // <div className="container mx-auto p-4">
    <>
      <Routes>
        <Route path={"/"} element={<HomePage/>}/>
        <Route path={"form"} element={<FormPage />}/>
        <Route path={"auth-form"} element={<AuthPage/>}/>
        <Route path={"forminfo"} element={<NeedAuth><ProfilePage/></NeedAuth>}/>
      </Routes>

      {/* <SignupForm /> */}
      {/* <ReactQueryTest /> */}
      {/* <ReduxTest /> */}
      {/* <ReactQuery /> */}
      {/* <Main /> */}
      {/* <EditWord /> */}
      {/* <HookForm /> */}
      {/* // </div> */}
    </>
  );
}

export default App;