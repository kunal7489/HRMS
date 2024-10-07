import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
 } from "react-router-dom";
import Login from "./components/login/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from "./components/signup/signup";
import Nav from "./components/navbar/Navbaar";
import UserHome from "./components/user/userdata";
import AdminHome from "./components/admin/admin";
import EmployeeModule from "./components/user/employee/employee";
import CandidateModule from "./components/user/candidate/candidate";
import ExpensesModule from "./components/user/expenses/expenses";
import HelpcenterModule from "./components/user/helpcenter/helpcenter";
import ConsultancyModule from "./components/user/consultancy/consultancy";
import SkillsModule from "./components/user/skill/skill";
import ProfileModule from "./components/user/profile/profile";
import AboutHome from "./components/admin/AdminModule/adminModule";
import ChangePassword from "./components/admin/changepassword/changepassword";



function App() {
  return (
       <Router>
        <Routes>
          <Route path="" element={<Nav />} />
          <Route path="/*" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/employee" element={<EmployeeModule />} />
          <Route path="/candidate" element={<CandidateModule />} />
          <Route path="/expenses" element={<ExpensesModule />} />
          <Route path="/helpcenter" element={<HelpcenterModule />} />
          <Route path="/consultancy" element={<ConsultancyModule />} />
          <Route path="/skills" element={<SkillsModule />} />
          <Route path="/profiles" element={<ProfileModule />} />
          <Route path="/admin-about" element={<AboutHome />} />
          <Route path="/changepassword" element={<ChangePassword />} />

        </Routes>
      </Router>
      
   );
  }

export default App;
