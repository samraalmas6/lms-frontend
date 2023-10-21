import "./components/styles/App.css";
import "./components/styles/HomePage.css";
import "./components/styles/Responsive.css";

import SigninPage from "./components/content/SigninPage";
import HomePage from './components/content/HomePage'
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddUser from "./components/pages/users/AddUser";
import PrivateRoute from "./components/content/PrivateRoute";
import AllUsers from "./components/pages/users/AllUsers";
import CreateCourse from "./components/pages/courses/instructor/CreateCourse";
import AllCourse from "./components/pages/courses/instructor/AllCourses";
// import VerificationPage from "./components/content/VerificationPage";
import VerificationPage from "./components/content/VerificationPage";
import AddTeam from "./components/pages/teams/AddTeam";
import AllTeams from "./components/pages/teams/AllTeams";
import AddCategory from "./components/pages/category/AddCategory";
import AllCategory from "./components/pages/category/AllCategory";
import MyCourses from "./components/pages/courses/learner/MyCourses";
import CourseTable from "./components/pages/courses/learner/CourseTable";
import AssignmentView from "./components/pages/courses/learner/AssignmentView";
import AssignmentScreen from "./components/pages/courses/instructor/AssignmentScreen";
import AssignmentGrading from "./components/pages/courses/instructor/AssignmentGrading";
import Practice from "./components/hooks/Practice";
import ForgetPassword from "./components/content/ForgetPassword";
import CourseContent from "./components/pages/courses/instructor/CourseContent";


export const CourseProbs = createContext(null);

function App() {

  const [courseId, setCourseId] = useState(null);
  const [courseCoauthors, setCourseCoauthors] = useState([]);
  const [courseCreator, setCourseCreator] = useState(null);

  return (
    <div>
       <BrowserRouter>
       {/* It is just use for Testing purpose it will be remove from here */}
       <Routes>
        <Route path="/test" element={<Practice />} ></Route>
       </Routes>


       <Routes>
       <Route element={<SigninPage />} path="/auth/login" />
       <Route element= {<VerificationPage />} path="/auth/verification"></Route>
       <Route element= {<ForgetPassword />} path="/auth/reset_password"></Route>
       </Routes>
       <CourseProbs.Provider value={{ courseId, setCourseId, courseCoauthors, setCourseCoauthors, courseCreator, setCourseCreator }}>
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
        <Route path="/course/content" element={<PrivateRoute><CourseContent /></PrivateRoute>}></Route>
        <Route path="/course/my-courses" element={<PrivateRoute><MyCourses /></PrivateRoute>}></Route>
        <Route path="/course/create-assignment" element={<PrivateRoute><AssignmentScreen /></PrivateRoute>}></Route>
        <Route path="/course/my-assignments" element={<PrivateRoute><AssignmentView /></PrivateRoute>}></Route>
        <Route path="/course/assignment-hub" element={<PrivateRoute><AssignmentGrading /></PrivateRoute>}></Route>
        <Route path="/my-courses/show" element={<PrivateRoute><CourseTable /></PrivateRoute>}></Route>
        <Route path="/category/add" element={<PrivateRoute><AddCategory /></PrivateRoute>}></Route>
        <Route path="/category/all" element={<PrivateRoute><AllCategory /></PrivateRoute>}></Route>

      </Routes>
      </CourseProbs.Provider>

      </BrowserRouter>

  </div>
  );
}

export default App;
