import { GET_BUS_DETAIL, GET_INDUSTRY_LIST, GET_BUS_TYPE_DETAIL, GET_BUS_TYPE_LIST, GET_ENABLE_BUS_LIST } from "../constants";

const initialState = {
    arrIndustry: [],
    arrEnableBus: [],
    busDetail: {},
    arrBusType: [],
    busTypeDetail: {},
}

export const IndustryReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_INDUSTRY_LIST:
            state.arrIndustry = action.arrIndustry;
            return { ...state }
        case GET_ENABLE_BUS_LIST:
            state.arrEnableBus = action.arrEnableBus;
            return { ...state }
        case GET_BUS_DETAIL:
            state.busDetail = action.busDetail;
            return { ...state }
        case GET_BUS_TYPE_LIST:
            state.arrBusType = action.arrBusType;
            return { ...state }
        case GET_BUS_TYPE_DETAIL:
            state.busTypeDetail = action.busTypeDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
