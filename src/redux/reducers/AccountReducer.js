import {
    GET_ACCOUNT_DETAIL,
    GET_ACCOUNT_LIST
} from "../constants";


const initialState = {
    arrAccount: [],
    accountDetail: {},
};

export const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            state.arrAccount = action.arrAccount;
            return { ...state };

        case GET_ACCOUNT_DETAIL:
            state.accountDetail = action.accountDetail;
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
