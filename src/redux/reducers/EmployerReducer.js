import { GET_EMPLOYER_LIST, GET_EMPLOYER_DETAIL } from "../constants";

const initialState = {
  arrEmp: [],
  empDetail: {},
};

export const EmployerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYER_LIST:
      state.arrEmp = action.arrEmp;
      return { ...state };
    case GET_EMPLOYER_DETAIL:
      state.empDetail = action.empDetail;
      return { ...state };

    default:
      return state;
  }
};
