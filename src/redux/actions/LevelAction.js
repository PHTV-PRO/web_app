import { GET_LEVEL_DETAIL, GET_LEVEL_LIST } from "../constants";
import { history } from "../../App";
import { levelService } from "../../services/LevelService";
import { notification } from "antd";


export const getLevelListAction = () => {
    return async (dispatch) => {
        try {
            const result = await levelService.getLevelList();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_LEVEL_LIST,
                    arrLevel: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getLevelByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await levelService.getLevelById(id);
            console.log(result);
            console.log(result.data.data);
            dispatch({
                type: GET_LEVEL_DETAIL,
                levelDetail: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addJobTypeAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await levelService.addNewLevel(formData)
            console.log(result);
            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new Level successfully.</>
                    ),
                });
                history.push('/admin/levelmng');
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Add new Level fail.</>
                    ),
                });
            }


        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateLevelByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await levelService.updateLevel(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Job Type successfully</>
                ),
            });
            history.push('/admin/levelmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteLevelAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await levelService.deleteLevel(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete Level successfully</>
                ),
            });
            dispatch(getLevelListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}