import { GET_BUS_DETAIL, GET_INDUSTRY_LIST, GET_BUS_TYPE_DETAIL, GET_BUS_TYPE_LIST, GET_ENABLE_BUS_LIST } from "../constants";
import { history } from "../../App";
import { industryService } from "../../services/IndustryService";
import { notification } from "antd";


export const getIndustryListAction = () => {
    return async (dispatch) => {
        try {
            const result = await industryService.getIndustryList();
            if (result.status === 200) {
                dispatch({
                    type: GET_INDUSTRY_LIST,
                    arrIndustry: result.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getEnableBusListAction = () => {
    return async (dispatch) => {
        try {
            const result = await industryService.getEnableBusList();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_ENABLE_BUS_LIST,
                    arrEnableBus: result.data.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getBusByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await industryService.getBusById(id);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_BUS_DETAIL,
                    busDetail: result.data.data[0],
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addIndustryAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await industryService.addNewIndustry(formData)
            if(result.data.status===200){
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Add new Industry successfully.</>
                    ),
                });
                dispatch(getIndustryListAction())
            }
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Add new Industry fail.</>
                ),
            });

        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateBusByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await industryService.updateBus(id,formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update bus successfully</>
                ),
            });
            history.push('/admin/busmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const enableBusAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await industryService.enableBus(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>{result.data.data.enabled ? "Enable successfully" : "Disable successfully"}</>
                ),
            });
            dispatch(getIndustryListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteBusAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await industryService.deleteBus(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete bus type successfully</>
                ),
            });
            dispatch(getIndustryListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}



// Bus Type
export const getBusTypeListAction = () => {
    return async (dispatch) => {
        try {
            const result = await industryService.getBusTypeList();
            dispatch({
                type: GET_BUS_TYPE_LIST,
                arrBusType: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getBusTypeByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await industryService.getBusTypeById(id);
            dispatch({
                type: GET_BUS_TYPE_DETAIL,
                busTypeDetail: result.data.data[0]
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addBusTypeAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await industryService.addNewBusType(formData)
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Add new bus type successfully</>
                ),
            });
            history.push('/admin/bustypemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateBusTypeByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await industryService.updateBusType(id,formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update bus type successfully</>
                ),
            });
            history.push('/admin/bustypemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteBusTypeAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await industryService.deleteBusType(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete bus type successfully</>
                ),
            });
            dispatch(getBusTypeListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}