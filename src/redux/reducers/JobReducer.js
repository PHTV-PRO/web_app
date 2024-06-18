import { GET_JOB_DETAIL, GET_JOB_LIST } from "../constants";

const initialState = {
    arrJob: [],
    jobDetail: {}
}

export const JobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_LIST:
            state.arrJob = action.arrJob;
            return { ...state }
        case GET_JOB_DETAIL: {
            state.companyDetail = action.jobDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}