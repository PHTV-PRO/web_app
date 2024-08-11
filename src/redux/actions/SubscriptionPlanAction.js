import { GET_SUBSCRIPTION_PLAN_DETAIL, GET_SUBSCRIPTION_PLAN_LIST, GET_SUBSCRIPTION_PLAN_BY_ACCOUNT, GET_SUBSCRIPTION_PLAN_FROM_ADMIN_BY_ID_ACCOUNT } from "../constants";
import { history } from "../../App";
import { subcriptionPlanService } from "../../services/SubscriptionPlanService";
import { notification } from "antd";
import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { GET_COMPANY_JOB } from "../constants";
import { accountService } from "../../services/AccountService";

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
export const buyScriptionPlan = (id, price) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getBuySubcriptionPlan(id, price);
            if (result.status === 200) {
                window.open(result.data.data, '_parent').focus();
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}
export const returnBuyScriptionPlan = (paymentId, payerId) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getReturnSubcriptionPlan(paymentId, payerId);
            console.log("check result: ", result);
            if (result.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Buy Subscription Plan Success',
                    description: (
                        <>Add new station successfully.</>
                    ),
                })
                window.open("http://localhost:3000/employer/emprofile", '_parent').focus()
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Buy Subscription Plan Fail. plase try again!!',
                    description: (
                        <>Add new station successfully.</>
                    ),
                })
                history.push("/employer/emprofile")
            }
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

export const getSubscriptionPlanFromAdminByIdAccountAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await subcriptionPlanService.getSubcriptionPlanFromAdminByIdAccount(id);
            dispatch({
                type: GET_SUBSCRIPTION_PLAN_FROM_ADMIN_BY_ID_ACCOUNT,
                arrDataSubcriptionPlanFromAdmin: result.data.data
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