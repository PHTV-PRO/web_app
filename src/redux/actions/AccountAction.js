import { GET_ACCOUNT_DETAIL, GET_ACCOUNT_LIST } from "../constants";
import { history } from "../../App";
import { accountService } from "../../services/AccountService";
import { notification } from "antd";

export const getListAccountAction = () => {
    return async (dispatch) => {
        try {
            const result = await accountService.getListAccount();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_ACCOUNT_LIST,
                    arrAccount: result.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const createAccountAction = (newAc) => {
    return async (dispatch) => {
        try {
            const result = await accountService.createAccount(newAc);
            console.log(result);
            notification.success({
                closeIcon: true,
                message: "Success",
                description: <>Create New Account Successfully.</>,
            });
            history.push("/admin/accmng");
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Error",
                description: <>Create New Account fail!</>,
            });
        }
    };
};
export const deleteAccountAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await accountService.deleteAccount(id);
            notification.success({
                closeIcon: true,
                message: "Success",
                description: <>Delete Account successfully</>,
            });
            dispatch(getListAccountAction());
        } catch (error) {
            console.log("error", error);
        }
    };
};
export const getAccountByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await accountService.getAccountById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_ACCOUNT_DETAIL,
                    accountDetail: result.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const updateAccountByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await accountService.updateAccount(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Account successfully</>
                ),
            });
            history.push('/admin/accmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}