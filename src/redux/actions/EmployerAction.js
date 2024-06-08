import { GET_EMPLOYER_LIST, GET_EMPLOYER_DETAIL } from "../constants";
import { history } from "../../App";
import { employerService } from "../../services/EmployerService";
import { notification } from "antd";

export const getListEmployerAction = () => {
  return async (dispatch) => {
    try {
      const result = await employerService.getListEmployer();
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: GET_EMPLOYER_LIST,
          arrEmp: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const createEmployerAction = (newEmpl) => {
  return async (dispatch) => {
    try {
      const result = await employerService.createEmployer(newEmpl);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Create New Employer Successfully.</>,
      });
      history.push("/admin/empmng");
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: "Error",
        description: <>Create New Employer fail!</>,
      });
    }
  };
};
export const deleteEmployerAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await employerService.deleteEmployer(id);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Delete Employer successfully</>,
      });
      dispatch(getListEmployerAction());
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const getEmployerByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await employerService.getEmployerById(id);
      if (result.status === 200) {
        dispatch({
          type: GET_EMPLOYER_DETAIL,
          empDetail: result.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateEmployerByIdAction = (id, formData) => {
  return async (dispatch) => {
    try {
      const result = await employerService.updateEmployer(id, formData);
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Update Employer successfully</>
        ),
      });
      history.push('/admin/empmng');
    } catch (error) {
      console.log('error', error);
    }
  }
}
