import "./components/styles/App.css";
import "./components/styles/HomePage.css"
import SigninPage from "./components/pages/SigninPage";
import HomePage from './components/pages/HomePage';
import AddUser from "./components/pages/AddUser";
import Dashboard from "./components/pages/Dashboard";
import UploadPicture from "./components/UploadPicture";


function App() {
  return (
    <div>
      {/* <HomePage /> */}
      <AddUser/>
      {/* <Dashboard></Dashboard> */}
      {/* <UploadPicture/> */}
  </div>
  );
}

export default App;
