import "./components/styles/App.css";
import "./components/styles/HomePage.css";
import "./components/styles/Responsive.css";

import SigninPage from "./components/content/SigninPage";
import HomePage from './components/content/HomePage'
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";

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
import UnitResourse from "./components/pages/courses/instructor/UnitResourse";


export const CourseProbs = createContext(null);

function App() {

  const [courseId, setCourseId] = useState(null);
  const [instructor, setInstructor] = useState(null);
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
       <CourseProbs.Provider value={{ courseId, setCourseId,instructor, setInstructor, courseCoauthors, setCourseCoauthors, courseCreator, setCourseCreator }}>
			<Routes>
				<Route exact path="/" element={<PrivateRoute page="Dashboard"><HomePage /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute page="Dashboard"><HomePage /></PrivateRoute>} ></Route>
				<Route path="/home" element={<PrivateRoute page="Dashboard"><HomePage /></PrivateRoute>} ></Route>
        <Route path="/user/add" element={<PrivateRoute page="user/add"><AddUser /></PrivateRoute>}></Route>
        <Route path="/user/all" element={<PrivateRoute page="user"><AllUsers /></PrivateRoute>}></Route>
        <Route path="/team/add" element={<PrivateRoute page="team/add"><AddTeam /></PrivateRoute>}></Route>
        <Route path="/team/all" element={<PrivateRoute page="team"><AllTeams /></PrivateRoute>}></Route>
        <Route path="/course/create" element={<PrivateRoute page="course/create"><CreateCourse /></PrivateRoute>}></Route>
        <Route path="/course/all" element={<PrivateRoute  page="course"><AllCourse /></PrivateRoute>}></Route>
        <Route path="/course/content/:courseId" element={<PrivateRoute><CourseContent /></PrivateRoute>}></Route>
        <Route path="/course/my-courses" element={<PrivateRoute page="My Courses"><MyCourses /></PrivateRoute>}></Route>
        <Route path="/course/create-assignment" element={<PrivateRoute><AssignmentScreen /></PrivateRoute>}></Route>
        <Route path="/course/add-resourses" element={<PrivateRoute><UnitResourse /></PrivateRoute>}></Route>
        <Route path="/course/my-assignments/:id" element={<PrivateRoute page="My Assignments"><AssignmentView /></PrivateRoute>}></Route>
        <Route path="/course/assignment-hub" element={<PrivateRoute page="Assignments"><AssignmentGrading /></PrivateRoute>}></Route>
        <Route path="/my-courses/show" element={<PrivateRoute page="Course"><CourseTable /></PrivateRoute>}></Route>
        <Route path="/category/add" element={<PrivateRoute page="Category"><AddCategory /></PrivateRoute>}></Route>
        <Route path="/category/all" element={<PrivateRoute page="Category"><AllCategory /></PrivateRoute>}></Route>
      </Routes>
      </CourseProbs.Provider>

      </BrowserRouter>

  </div>
  );
}

export default App;
