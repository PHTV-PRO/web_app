import { GET_COMPANY_DETAIL, GET_COMPANY_LIST } from "../constants";

const initialState = {
    arrCompany: [],
    companyDetail: {}
}

export const CompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY_LIST:
            state.arrCompany = action.arrCompany;
            return { ...state }
        case GET_COMPANY_DETAIL: {
            state.companyDetail = action.companyDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}