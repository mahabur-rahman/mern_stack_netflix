import axios from "axios";
import {
  getListsFailure,
  getListsStart,
  getListsSuccess,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  createListStart,
  createListFailure,
  createListSuccess,
} from "./ListActions";

// get lists
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(`/lists`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

// delete list
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());

  try {
    await axios.delete(`/lists/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(deleteListSuccess());
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

// create list
export const createList = async (list, dispatch) => {
  dispatch(createListStart());

  try {
    const res = await axios.post(`/lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(createListSuccess(res.data));
    console.log("res : ", res.data);
  } catch (err) {
    dispatch(createListFailure());
  }
};
