import "./components/styles/App.css";
import "./components/styles/HomePage.css";
import "./components/styles/Responsive.css";

import SigninPage from "./components/content/SigninPage";
import HomePage from "./components/content/HomePage";
import CourseTable from "./components/pages/CourseTable";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddUser from "./components/pages/users/AddUser";
import PrivateRoute from "./components/content/PrivateRoute";
import AllUsers from "./components/pages/users/AllUsers";
import CreateCourse from "./components/pages/courses/CreateCourse";
import AllCourse from "./components/pages/courses/AllCourses";
import VerificationPage from "./components/content/VerificationPage";
import AddTeam from "./components/pages/teams/AddTeam";
import AllTeams from "./components/pages/teams/AllTeams";
import AddCategory from "./components/pages/category/AddCategory";
import AllCategory from "./components/pages/category/AllCategory";
import MyCourses from "./components/pages/courses/MyCourses";
import AssignmentScreen from "./components/pages/AssignmentScreen";
import AssignmentView from "./components/pages/AssignmentView";


function App() {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <div>
       <BrowserRouter>
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
        <Route path="/addteam" element={<PrivateRoute><AddTeam /></PrivateRoute>}></Route>
        <Route path="/allteams" element={<PrivateRoute><AllTeams /></PrivateRoute>}></Route>
        <Route path="/course/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>}></Route>
        <Route path="/course/all" element={<PrivateRoute><AllCourse /></PrivateRoute>}></Route>
        <Route path="/category/add" element={<PrivateRoute><AddCategory /></PrivateRoute>}></Route>
        <Route path="/category/all" element={<PrivateRoute><AllCategory /></PrivateRoute>}></Route>
      </Routes>

      </BrowserRouter>

  </div>
  );
}

export default App;
