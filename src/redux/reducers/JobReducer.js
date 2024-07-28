import { GET_JOB_DETAIL, GET_JOB_LIST, GET_CHART_OF_EMPLOYER, GET_CHART_OF_ADMIN } from "../constants";

const initialState = {
    arrJob: [],
    jobDetail: {},
    arrDataChart: {},
    chartAdmin: {}
}

export const JobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_LIST:
            state.arrJob = action.arrJob;
            return { ...state }
        case GET_JOB_DETAIL: {
            state.jobDetail = action.jobDetail;
            return { ...state }
        }
        case GET_CHART_OF_EMPLOYER:
            state.arrDataChart = action.arrDataChart;
            return { ...state }
        case GET_CHART_OF_ADMIN:
            state.chartAdmin = action.chartAdmin;
            return { ...state }
        default:
            return { ...state }
    }
}