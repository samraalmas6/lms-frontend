import "./components/styles/App.css";
import "./components/styles/HomePage.css"
import "./components/styles/Responsive.css"

import SigninPage from "./components/pages/SigninPage";
import HomePage from './components/content/HomePage'
import { useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import AddUser from "./components/pages/AddUser";
import PrivateRoute from "./components/content/PrivateRoute"
import AllUsers from "./components/pages/AllUsers";
import CreateCourse from "./components/pages/courses/CreateCourse";
import AllCourse from "./components/pages/courses/AllCourses";
import VerificationPage from "./components/pages/VerificationPage";

function App() {
  const [showlogin, setShowLogin] = useState(false)

  return (
    <div>
      <CourseTable/>
       {/* <BrowserRouter>
       <Routes>
       <Route element={<SigninPage />} path="/auth/login" />
       <Route element= {<VerificationPage />} path="/auth/verification"></Route>
       </Routes>
			<Routes>
				<Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><HomePage /></PrivateRoute>} ></Route>
				<Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} ></Route>
        <Route path="/adduser" element={<PrivateRoute><AddUser /></PrivateRoute>}></Route>
        <Route path="/allusers" element={<PrivateRoute><AllUsers /></PrivateRoute>}></Route>
        <Route path="/course/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>}></Route>
        <Route path="/course/all" element={<PrivateRoute><AllCourse /></PrivateRoute>}></Route>
        <Route path="/course/my-courses" element={<PrivateRoute><MyCourses /></PrivateRoute>}></Route>
      </Routes>

      </BrowserRouter> */}

  </div>
  );
}

export default App;
