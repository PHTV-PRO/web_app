import "./App.css";
import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";


import Loading from "./components/Loading/Loading";
import { AdminTemplate } from "./templates/AdminTemplate";
import Edit from "./pages/Admin/IndustryMng/EditBus";

import RevenueMonth from "./pages/Admin/Revenue/RevenueMonth";
import UserOrder from "./pages/Admin/UserMng/UserOrder";
import StationMng from "./pages/Admin/StationMng/StationMng";
import TripMng from "./pages/Admin/TripMng/TripMng";
import AddNewBus from "./pages/Admin/IndustryMng/AddNewBus";
import BusTypeMng from "./pages/Admin/IndustryMng/BusTypeMng/BusTypeMng";
import AddNewBusType from "./pages/Admin/IndustryMng/BusTypeMng/AddNewBusType";
import EditBusType from "./pages/Admin/IndustryMng/BusTypeMng/EditBusType";
import AddNewStation from "./pages/Admin/StationMng/AddNewStation";
import EditStation from "./pages/Admin/StationMng/EditStation";
import AddNewTrip from "./pages/Admin/TripMng/AddNewTrip";
import DriverEdit from "./pages/Admin/DriverMng/DriverEdit";
import AddDriver from "./pages/Admin/DriverMng/AddDriver";
import DriverMng from "./pages/Admin/DriverMng/DriverMng";
import FAQMng from "./pages/Admin/FAQMng/FAQMng";
import EditFAQ from "./pages/Admin/FAQMng/EditFAQ";
import AddNewFAQ from "./pages/Admin/FAQMng/AddNewFAQ";
import RegisterDriverMng from "./pages/Admin/DriverMng/RegisterDriverMng";
import PromoteTripMng from "./pages/Admin/PromoteTripMng/PromoteTripMng";
import AddNewPromoteTrip from "./pages/Admin/PromoteTripMng/AddNewPromoteTrip";
import EditPromoteTrip from "./pages/Admin/PromoteTripMng/EditPromoteTrip";
import EditTrip from "./pages/Admin/TripMng/EditTrip";
import NewsMng from './pages/Admin/NewsMng/NewsMng';
import AddNewNews from './pages/Admin/NewsMng/AddNewNews';
import NewsEdit from "./pages/Admin/NewsMng/NewsEdit";
import RevenueRoute from "./pages/Admin/Revenue/RevenueRoute";
import OfferMng from "./pages/Admin/OfferMng/OfferMng";
import AddOffer from "./pages/Admin/OfferMng/AddOffer";
import OfferEdit from "./pages/Admin/OfferMng/OfferEdit";
import IndustryMng from "./pages/Admin/IndustryMng/IndustryMng";
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
import AddJob from "./pages/Admin/JobMng/AddJob";



//
import UserTemplate from "./templates/UserTemplate";
import Login from "./pages/Login/Login";
import AddNewJob from "./pages/Admin/JobMng/AddJob";
import LocationMng from "./pages/Admin/LocationMng/LocationMng";
import AddNewLocation from "./pages/Admin/LocationMng/AddNewLocation";
import EditLocation from "./pages/Admin/LocationMng/EditLocation";
import { ProfileTemplate } from "./templates/ProfileTemplate";




export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />

      <Switch>
        {/* Driver Management */}
        <AdminTemplate path="/admin/drivermng" exact Component={DriverMng} />
        <AdminTemplate path="/admin/regdrivermng" exact Component={RegisterDriverMng} />
        <AdminTemplate path="/admin/drivermng/edit/:id" exact Component={DriverEdit} />
        <AdminTemplate path="/admin/drivermng/adddriver" exact Component={AddDriver} />

        {/* Bus */}
        <AdminTemplate path="/admin/industry" exact Component={IndustryMng} />
        <AdminTemplate path="/admin/busmng/addnew" exact Component={AddNewBus} />
        <AdminTemplate path="/admin/busmng/edit/:id" exact Component={Edit} />

        {/* Bus Type */}
        <AdminTemplate path="/admin/bustypemng" exact Component={BusTypeMng} />
        <AdminTemplate path="/admin/bustypemng/addnew" exact Component={AddNewBusType} />
        <AdminTemplate path="/admin/bustypemng/edit/:id" exact Component={EditBusType} />

        {/* Station */}
        <AdminTemplate path="/admin/stationmng" exact Component={StationMng} />
        <AdminTemplate path="/admin/stationmng/addnew" exact Component={AddNewStation} />
        <AdminTemplate path="/admin/stationmng/edit/:id" exact Component={EditStation} />

        {/* Trip */}
        <AdminTemplate path="/admin/tripmng" exact Component={TripMng} />
        <AdminTemplate path="/admin/tripmng/addtrip" exact Component={AddNewTrip} />
        <AdminTemplate path="/admin/tripmng/edit/:id" exact Component={EditTrip} />

        {/* Promote Trip */}
        <AdminTemplate path="/admin/promotripmng" exact Component={PromoteTripMng} />
        <AdminTemplate path="/admin/promotripmng/addnew" exact Component={AddNewPromoteTrip} />
        <AdminTemplate path="/admin/promotripmng/edit/:id" exact Component={EditPromoteTrip} />

        {/* Offer */}
        <AdminTemplate path="/admin/offermng" exact Component={OfferMng} />
        <AdminTemplate path="/admin/offermng/addnew" exact Component={AddOffer} />
        <AdminTemplate path="/admin/offermng/edit/:id" exact Component={OfferEdit} />

        {/* Revenue */}
        <AdminTemplate path="/admin/revenuemonth" exact Component={RevenueMonth} />
        <AdminTemplate path="/admin/revenueroute" exact Component={RevenueRoute} />

        {/* FAQ */}
        <AdminTemplate path="/admin/faqmng" exact Component={FAQMng} />
        <AdminTemplate path="/admin/faqmng/addnew" exact Component={AddNewFAQ} />
        <AdminTemplate path="/admin/faqmng/edit/:id" exact Component={EditFAQ} />

        {/* News */}
        <AdminTemplate path='/admin/newsmng' exact Component={NewsMng} />
        <AdminTemplate path='/admin/newsmng/addnews' exact Component={AddNewNews} />
        <AdminTemplate path='/admin/newsmng/edit/:id' exact Component={NewsEdit} />

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
        {/* <AdminTemplate path="/admin/jobmng/edit/:id" exact Component={EditCompany} /> */}

        {/* Employer */}
        <AdminTemplate path="/admin/empmng" exact Component={EmployerMng} />
        <AdminTemplate path="/admin/empmng/addemp" exact Component={AddNewEmployer} />
        <AdminTemplate path="/admin/empmng/edit/:id" exact Component={EmployerEdit} />

        {/* Account */}
        <AdminTemplate path="/admin/accmng" exact Component={AccountMng} />
        <AdminTemplate path="/admin/accmng/addacc" exact Component={AddAccount} />
        <AdminTemplate path="/admin/accmng/edit/:id" exact Component={AccountEdit} />

        {/* User */}
        <ProfileTemplate path="/users/profile" exact Component={Profile} />
        <AdminTemplate path="/admin" exact Component={UserMng} />
        {/* <AdminTemplate path="/admin/adminusers" exact Component={AdminUserMng} /> */}
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
