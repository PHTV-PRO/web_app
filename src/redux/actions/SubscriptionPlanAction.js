import { GET_SUBSCRIPTION_PLAN_DETAIL, GET_SUBSCRIPTION_PLAN_LIST, GET_SUBSCRIPTION_PLAN_BY_ACCOUNT } from "../constants";
import { history } from "../../App";
import { subcriptionPlanService } from "../../services/SubscriptionPlanService";
import { notification } from "antd";


export const getSubscriptionPlanListAction = () => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getSubcriptionPlanList();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_SUBSCRIPTION_PLAN_LIST,
                    arrSubscriptionPlan: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getSubscriptionPlanByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getSubcriptionPlanById(id);
            console.log(result);
            console.log(result.data.data);
            dispatch({
                type: GET_SUBSCRIPTION_PLAN_DETAIL,
                subscriptionPlanDetail: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getSubscriptionPlanByAccountAction = (token) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getSubcriptionPlanByAccount(token);
            dispatch({
                type: GET_SUBSCRIPTION_PLAN_BY_ACCOUNT,
                subscriptionPlanByAccount: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}



export const addSubscriptionPlanAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.addNewSubcriptionPlan(formData)
            console.log(result);
            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new  SubcriptionPlan successfully.</>
                    ),
                });
                history.push('/admin/subplanmng');
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Add new SubcriptionPlan fail.</>
                    ),
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateSubscriptionPlanByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.updateSubcriptionPlan(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update SubcriptionPlan successfully</>
                ),
            });
            history.push('/admin/subplanmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteSubscriptionPlanAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.deleteSubcriptionPlan(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete SubcriptionPlan successfully</>
                ),
            });
            dispatch(getSubscriptionPlanListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}