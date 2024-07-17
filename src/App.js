import "./App.css";
import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";


import Loading from "./components/Loading/Loading";
import { AdminTemplate } from "./templates/AdminTemplate";
import UserOrder from "./pages/Admin/UserMng/UserOrder";

//Industry
import IndustryMng from "./pages/Admin/IndustryMng/IndustryMng";
import AddIndustry from "./pages/Admin/IndustryMng/AddIndustry";
import EditIndustry from "./pages/Admin/IndustryMng/EditIndustry";
//Skill
import SkillMng from "./pages/Admin/SkillMng/SkillMng";
import AddSkill from "./pages/Admin/SkillMng/AddSkill";
import EditSkill from "./pages/Admin/SkillMng/EditSkill";
// JobType
import JobTypeMng from "./pages/Admin/JobTypeMng/JobTypeMng";
import AddJobType from "./pages/Admin/JobTypeMng/AddNewJobType";
import EditJobType from "./pages/Admin/JobTypeMng/EditJobType";
// Level
import LevelMng from "./pages/Admin/LevelMng/LevelMng";
import AddNewLevel from "./pages/Admin/LevelMng/AddNewLevel";
import EditLevel from "./pages/Admin/LevelMng/EditLevel";
//City Province
import CityProvinceMng from "./pages/Admin/CityProvinceMng/CityProvinceMng";
import AddNewCityProvince from "./pages/Admin/CityProvinceMng/AddNewCityProvince";
import EditCityProvince from "./pages/Admin/CityProvinceMng/EditCityProvince";
//SubscriptionPlan 
import SubscriptionPlanMng from "./pages/Admin/SubscriptionPlanMng/SubscriptionPlanMng";
import AddNewSubscriptionPlan from "./pages/Admin/SubscriptionPlanMng/AddNewSubscriptionPlan";
import EditSubscriptionPlan from "./pages/Admin/SubscriptionPlanMng/EditSubscriptionPlan";
// Employer
import EmployerMng from "./pages/Admin/UserMng/EmployerMng/EmployerMng";
import AddNewEmployer from "./pages/Admin/UserMng/EmployerMng/AddNewEmployer";
import EmployerEdit from "./pages/Admin/UserMng/EmployerMng/EmployerEdit";
// Account
import AccountMng from "./pages/Admin/UserMng/AccountMng/AccountMng";
import AddAccount from "./pages/Admin/UserMng/AccountMng/AddAccount";
import AccountEdit from "./pages/Admin/UserMng/AccountMng/EditAccount";
import Profile from "./pages/Profile/Profile";
// User
import UserMng from "./pages/Admin/UserMng/AdminUserMng";
import UserEdit from "./pages/Admin/UserMng/UserEdit";
import AddUser from "./pages/Admin/UserMng/AddUser";
//Company
import CompanyMng from "./pages/Admin/CompanyMng/CompanyMng";
import AddNewCompany from "./pages/Admin/CompanyMng/AddCompany";
import EditCompany from "./pages/Admin/CompanyMng/EditCompany";
//Job
import JobMng from "./pages/Admin/JobMng/JobMng";
import AddNewJob from "./pages/Admin/JobMng/AddJob";
import EditJob from "./pages/Admin/JobMng/EditJob";

//Location
import LocationMng from "./pages/Admin/LocationMng/LocationMng";
import AddNewLocation from "./pages/Admin/LocationMng/AddNewLocation";
import EditLocation from "./pages/Admin/LocationMng/EditLocation";

// Proflie Employer
import EmployerProfile from "./pages/EmployerManager/EmployerProfile";
import EmployerJobMng from "./pages/EmployerManager/EmployerJob/EmployerJobMng";

//
import UserTemplate from "./templates/UserTemplate";
import Login from "./pages/Login/Login";


import { ProfileTemplate } from "./templates/ProfileTemplate";
import NewJobEmployer from "./pages/EmployerManager/EmployerJob/NewJobEmployer";
import EmployerEditJob from "./pages/EmployerManager/EmployerJob/EditEmployerJob";
// import NewJobEmployer from "./pages/EmployerManager/EmployerJob/NewJobEmployer";





export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />

      <Switch>

        {/* -------------------------------------------------------------------------- */}

        {/* Industry */}
        <AdminTemplate path="/admin/industry" exact Component={IndustryMng} />
        <AdminTemplate path="/admin/industry/addindustry" exact Component={AddIndustry} />
        <AdminTemplate path="/admin/industry/edit/:id" exact Component={EditIndustry} />
        {/* Skill */}
        <AdminTemplate path="/admin/skillmng" exact Component={SkillMng} />
        <AdminTemplate path="/admin/skillmng/addskill" exact Component={AddSkill} />
        <AdminTemplate path="/admin/skillmng/edit/:id" exact Component={EditSkill} />
        {/* Job Type */}
        <AdminTemplate path="/admin/jobtypemng" exact Component={JobTypeMng} />
        <AdminTemplate path="/admin/jobtypemng/addjobtype" exact Component={AddJobType} />
        <AdminTemplate path="/admin/jobtypemng/edit/:id" exact Component={EditJobType} />

        {/* Level */}
        <AdminTemplate path="/admin/levelmng" exact Component={LevelMng} />
        <AdminTemplate path="/admin/levelmng/addlevel" exact Component={AddNewLevel} />
        <AdminTemplate path="/admin/levelmng/edit/:id" exact Component={EditLevel} />

        {/* City Province */}
        <AdminTemplate path="/admin/cityprovincemng" exact Component={CityProvinceMng} />
        <AdminTemplate path="/admin/cityprovincemng/addcityprovince" exact Component={AddNewCityProvince} />
        <AdminTemplate path="/admin/cityprovincemng/edit/:id" exact Component={EditCityProvince} />

        {/* Location */}
        <AdminTemplate path="/admin/locationmng" exact Component={LocationMng} />
        <AdminTemplate path="/admin/locationmng/addlocation" exact Component={AddNewLocation} />
        <AdminTemplate path="/admin/locationmng/edit/:id" exact Component={EditLocation} />

        {/* SubscriptionPlan */}
        <AdminTemplate path="/admin/subplanmng" exact Component={SubscriptionPlanMng} />
        <AdminTemplate path="/admin/subplanmng/addsubplan" exact Component={AddNewSubscriptionPlan} />
        <AdminTemplate path="/admin/subplanmng/edit/:id" exact Component={EditSubscriptionPlan} />

        {/* Company */}
        <AdminTemplate path="/admin/companymng" exact Component={CompanyMng} />
        <AdminTemplate path="/admin/companymng/addcom" exact Component={AddNewCompany} />
        <AdminTemplate path="/admin/companymng/edit/:id" exact Component={EditCompany} />

        {/* Job */}
        <AdminTemplate path="/admin/jobmng" exact Component={JobMng} />
        <AdminTemplate path="/admin/jobmng/addjob" exact Component={AddNewJob} />
        <AdminTemplate path="/jobmng/edit/:id" exact Component={EditJob} />

        {/* Employer */}
        <AdminTemplate path="/admin/empmng" exact Component={EmployerMng} />
        <AdminTemplate path="/admin/empmng/addemp" exact Component={AddNewEmployer} />
        <AdminTemplate path="/admin/empmng/edit/:id" exact Component={EmployerEdit} />

        {/* Account */}
        <AdminTemplate path="/admin/accmng" exact Component={AccountMng} />
        <AdminTemplate path="/admin/accmng/addacc" exact Component={AddAccount} />
        <AdminTemplate path="/admin/accmng/edit/:id" exact Component={AccountEdit} />

        {/* User */}
        {/* EmployerProfile */}
        <AdminTemplate path="/users/profile" exact Component={Profile} />
        <AdminTemplate path="/employer/emprofile" exact Component={EmployerProfile} />

        {/* job employer */}
        <AdminTemplate path="/employer/empljobmng" exact Component={EmployerJobMng} />
        <AdminTemplate path="/employer/emplnewjob" exact Component={NewJobEmployer} />
        <AdminTemplate path="/employer/job/edit/:id" exact Component={EmployerEditJob} />


        <AdminTemplate path="/admin" exact Component={UserMng} />
        <AdminTemplate path="/admin/users/edit/:id" exact Component={UserEdit} />
        <AdminTemplate path="/admin/users/adduser" exact Component={AddUser} />
        <AdminTemplate path="/admin/ordershistory/:id" exact Component={UserOrder} />



        {/* <HomeTemplate path="/" exact Component={Home} /> */}
        <UserTemplate path="/" exact Component={Login} />

      </Switch>
    </Router>
  );
}

export default App;
