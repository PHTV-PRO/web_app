import { GET_JOB_LIST, GET_JOB_DETAIL } from "../constants";
import { history } from "../../App";
import { jobService } from "../../services/JobService";
import { notification } from "antd";


export const getJobListAction = () => {
    return async (dispatch) => {
        try {
            const result = await jobService.getListJob();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_JOB_LIST,
                    arrJob: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getJobIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.getJobById(id);
            dispatch({
                type: GET_JOB_DETAIL,
                jobDetail: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addJobAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await jobService.createJob(formData)
            console.log(result);
            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new Job successfully.</>
                    ),
                });
                history.goBack();
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Add new Job fail.</>
                    ),
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addJobOfEmployerAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await jobService.createJobEmployer(formData)
            console.log(result);
            if (result.data.statusCode === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new Job successfully.</>
                    ),
                });
                history.goBack();
            } else {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Add new Job fail.</>
                    ),
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const updateJobByIdAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await jobService.updateJob(id, formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update Job successfully</>
                ),
            });
            history.goBack();
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteJobAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.deleteJob(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete Job successfully</>
                ),
            });
            history.goBack()
        } catch (error) {
            console.log('error', error);
        }
    }
}