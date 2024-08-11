import { GET_JOB_LIST, GET_JOB_DETAIL, GET_CHART_OF_EMPLOYER, GET_CHART_OF_ADMIN, GET_APPLICATION_BY_JOB, GET_CHART_OF_EMPLOYER_BY_ID } from "../constants";
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
export const updateJobByIdForEmployerAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await jobService.updateJobForEmployer(id, formData);
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

// Get Data chat of Employer By Id
export const getDataChartOfEmployer = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.getChartOfEmployerById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_CHART_OF_EMPLOYER,
                    dataChartOfEmployerById: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getDataChartOfEmployerFromAdminById = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.getChartOfEmployerFromAdminById(id);
            if (result.status === 200) {
                dispatch({
                    type: GET_CHART_OF_EMPLOYER_BY_ID,
                    chartEmployerFromAdminById: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}



export const getDataChartOfAdmin = () => {
    return async (dispatch) => {
        try {
            const result = await jobService.getChartOfAdmin();
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_CHART_OF_ADMIN,
                    chartAdmin: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getApplicationByJob = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.getApplicationByJob(id);
            console.log(result);
            if (result.status === 200) {
                dispatch({
                    type: GET_APPLICATION_BY_JOB,
                    arrApplication: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateEnableOfJobByAdmin = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.putEnableOfJobByAdmin(id);
            console.log(result);
            console.log(result.data.data._active);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>{result.data.data._active ? "Enable successfully" : "Disable successfully"}</>
                ),
            });
            dispatch(getJobListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateEnableOfJobByEmployer = (id) => {
    return async (dispatch) => {
        try {
            const result = await jobService.putEnableOfJobByEmployer(id);
            console.log(result);
            console.log(result.data.data._active);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>{result.data.data._active ? "Enable successfully" : "Disable successfully"}</>
                ),
            });
            dispatch(getJobListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}



