import {
    GET_ACCOUNT_DETAIL,
    GET_ACCOUNT_LIST,
    GET_EMPLOYER_COMPANY_DETAIL
} from "../constants";


const initialState = {
    arrAccount: [],
    accountDetail: {},
    employerCompany: {},

};

export const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            state.arrAccount = action.arrAccount;
            return { ...state };

        case GET_ACCOUNT_DETAIL:
            state.accountDetail = action.accountDetail;
            return { ...state };

        case GET_EMPLOYER_COMPANY_DETAIL:
            state.employerCompany = action.employerCompany;
            return { ...state };

        // case GET_PROFILE_DETAIL:
        //     state.profile = action.profile;
        //     return { ...state };

        // case GET_CURRENT_USER_ACTION:
        //     state.userLogin = action.userLogin;
        //     return { ...state };

        default:
            return state;
    }
};
