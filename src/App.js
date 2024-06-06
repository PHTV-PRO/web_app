import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";

import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail/Detail";
import CheckOutTemplate from "./templates/CheckOutTemplate";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import UserTemplate from "./templates/UserTemplate";
import Loading from "./components/Loading/Loading";
import { AdminTemplate } from "./templates/AdminTemplate";
import Edit from "./pages/Admin/IndustryMng/EditBus";
import UserMng from "./pages/Admin/UserMng/AdminUserMng";
import UserEdit from "./pages/Admin/UserMng/UserEdit";
import AddUser from "./pages/Admin/UserMng/AddUser";
import Profile from "./pages/Profile/Profile";
import { ProfileTemplate } from "./templates/ProfileTemplate";
import OrderHistory from "./pages/Admin/UserMng/OrderHistory";
import Search from "./pages/Search/Search";
import AdminUserMng from "./pages/Admin/UserMng/AdminUserMng";
import RevenueMonth from "./pages/Admin/Revenue/RevenueMonth";
import UserOrder from "./pages/Admin/UserMng/UserOrder";
import AboutUs from "./pages/AboutUs/AboutUs";
import GeneralTerms from "./pages/Terms/GeneralTerms";
import TermsOfTransaction from "./pages/Terms/TermsOfTransaction";
import ForgetPassword from "./pages/Login/ForgetPassword";
import BusMng from "./pages/Admin/IndustryMng/IndustryMng";
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
import ModMng from "./pages/Admin/UserMng/ModMng/ModMng";
import AddMod from "./pages/Admin/UserMng/ModMng/AddMod";
import ModEdit from "./pages/Admin/UserMng/ModMng/ModEdit";
import RegisterDriverMng from "./pages/Admin/DriverMng/RegisterDriverMng";
import LoginDriver from './pages/Driver/LoginDriver';
import RegisterDriver from "./pages/Driver/RegisterDriver";
import ForgetPasswordDriver from './pages/Driver/ForgetPasswordDriver';
import DetailTripOfDriver from "./pages/Driver/DetailTripOfDriver";
import ProfileDriver from "./pages/Driver/ProfileDriver";
import PromoteTripMng from "./pages/Admin/PromoteTripMng/PromoteTripMng";
import AddNewPromoteTrip from "./pages/Admin/PromoteTripMng/AddNewPromoteTrip";
import EditPromoteTrip from "./pages/Admin/PromoteTripMng/EditPromoteTrip";
import CancelTicket from "./pages/Admin/UserMng/CancelTicket";
import EditTrip from "./pages/Admin/TripMng/EditTrip";
import News from './pages/News/News';
import NewsDetail from './pages/News/NewsDetail';
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

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <CheckOutTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/news/detail/:id' exact Component={NewsDetail} />

        {/* Footer */}
        <HomeTemplate path="/about" exact Component={AboutUs} />
        <HomeTemplate path="/terms" exact Component={GeneralTerms} />
        <HomeTemplate path="/termsoftransaction" exact Component={TermsOfTransaction} />

        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/forgetPassword" exact Component={ForgetPassword} />

        {/* Become Driver */}
        <UserTemplate path="/loginDriver" exact Component={LoginDriver} />
        <UserTemplate path="/registerDriver" exact Component={RegisterDriver} />
        <UserTemplate path="/forgetPasswordDriver" exact Component={ForgetPasswordDriver} />
        <HomeTemplate path="/detailTripOfDriver" exact Component={DetailTripOfDriver} />

        <ProfileTemplate path="/users" exact Component={Profile} />
        <ProfileTemplate path="/users/profile" exact Component={Profile} />
        <ProfileTemplate path="/users/edit/:id" exact Component={UserEdit} />
        <ProfileTemplate path="/users/ordershistory" exact Component={OrderHistory} />
        <ProfileTemplate path="/users/ordershistory/cancel/:id" exact Component={CancelTicket} />

        {/* User */}
        <AdminTemplate path="/admin" exact Component={UserMng} />
        <AdminTemplate path="/admin/adminusers" exact Component={AdminUserMng} />
        <AdminTemplate path="/admin/users/edit/:id" exact Component={UserEdit} />
        <AdminTemplate path="/admin/users/adduser" exact Component={AddUser} />
        <AdminTemplate path="/admin/ordershistory/:id" exact Component={UserOrder} />

        {/* Mod */}
        <AdminTemplate path="/admin/modmng" exact Component={ModMng} />
        <AdminTemplate path="/admin/modmng/addmod" exact Component={AddMod} />
        <AdminTemplate path="/admin/modmng/edit/:id" exact Component={ModEdit} />

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

        {/* <HomeTemplate path="/" exact Component={Home} /> */}
        <UserTemplate path="/" exact Component={Login} />
        <HomeTemplate path="/search/" exact Component={Search} />
        <HomeTemplate Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
