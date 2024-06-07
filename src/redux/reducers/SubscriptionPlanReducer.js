import { GET_SUBSCRIPTION_PLAN_DETAIL, GET_SUBSCRIPTION_PLAN_LIST } from "../constants";

const initialState = {
    arrSubscriptionPlan: [],
    subscriptionPlanDetail: {}
}

export const SubscriptionPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBSCRIPTION_PLAN_LIST:
            state.arrSubscriptionPlan = action.arrSubscriptionPlan;
            return { ...state }
        case GET_SUBSCRIPTION_PLAN_DETAIL: {
            state.subscriptionPlanDetail = action.subscriptionPlanDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}