import {
    GET_ACCOUNT_DETAIL,
    GET_ACCOUNT_LIST,
    GET_EMPLOYER_COMPANY_DETAIL,
    GET_COMPANY_JOB,
    GET_COMPANY_FOR_EMPLOYER_FROM_ADMIN
} from "../constants";


const initialState = {
    arrAccount: [],
    accountDetail: {},
    employerCompany: {},
    employerCompanyJob: {},
    dataCompanyForEmployerFromAdmin: {}
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
        case GET_COMPANY_JOB:
            state.employerCompanyJob = action.employerCompanyJob;
            return { ...state };
        case GET_COMPANY_FOR_EMPLOYER_FROM_ADMIN:
            state.dataCompanyForEmployerFromAdmin = action.dataCompanyForEmployerFromAdmin;
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
