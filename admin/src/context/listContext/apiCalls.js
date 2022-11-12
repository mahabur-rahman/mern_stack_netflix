import axios from "axios";
import {
  getListsFailure,
  getListsStart,
  getListsSuccess,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
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
