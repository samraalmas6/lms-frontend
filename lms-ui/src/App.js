import "./components/styles/App.css";
import "./components/styles/HomePage.css"
import SigninPage from "./components/pages/SigninPage";
import HomePage from './components/pages/HomePage';
import AddUser from "./components/pages/AddUser";
import ExcelImport from "./components/ExcelImport";
import VerificationPage from "./components/pages/VerificationPage";
import Quizpage from "./components/pages/Quizpage";

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import PrivateRoute from "./components/content/PrivateRoute";


function App() {
  return (

    <div>

    {/* <AddUser/> */}
      <VerificationPage/>
    {/* <VerificationPage/> */}
  
       {/* <BrowserRouter>
			{/* <Routes>
				<Route element={<SigninPage />} path="/login" />
				<Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><HomePage /></PrivateRoute>} ></Route>
				<Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} ></Route>
        <Route path="/adduser" element={<PrivateRoute><AddUser /></PrivateRoute>}></Route>
        {/* <Route path="/allusers" element={<PrivateRoute><AllUsers /></PrivateRoute>}></Route> */}
			{/* </Routes> */} 
       {/* </BrowserRouter> */}

  </div>
  );
}

export default App;
