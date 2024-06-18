import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { StationReducer } from './reducers/StationReducer';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { FAQReducer } from './reducers/FAQReducer';
import { ProfitReducer } from './reducers/ProfitReducer';
import { TripReducer } from './reducers/TripReducer';
import { DriverReducer } from './reducers/DriverReducer';
import { OrderReducer } from './reducers/OrderReducer';
import { PromoteTripReducer } from './reducers/PromoteTripReducer';
import { NewReducer } from './reducers/NewReducer';
import { OfferReducer } from './reducers/OfferReducer';
import { IndustryReducer } from "./reducers/IndustryReducer";
import { JobTypeReducer } from "./reducers/JobTypeReducer";
import { LevelReducer } from "./reducers/LevelReducer";
import { CityProvinceReducer } from "./reducers/CityProvinceReducer";
import { SubscriptionPlanReducer } from "./reducers/SubscriptionPlanReducer";
import { AccountReducer } from './reducers/AccountReducer';
import { CompanyReducer } from './reducers/CompanyReducer';





// LevelReducer

const rootReducer = combineReducers({

    IndustryReducer,
    JobTypeReducer,
    LevelReducer,
    CityProvinceReducer,
    SubscriptionPlanReducer,
    UserReducer,
    AccountReducer,
    CompanyReducer,
    StationReducer,
    DriverReducer,
    TripReducer,
    OrderReducer,
    LoadingReducer,
    FAQReducer,
    ProfitReducer,
    PromoteTripReducer,
    NewReducer,
    OfferReducer
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));