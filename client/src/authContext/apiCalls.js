import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./authActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(`/auth/login`, user);

    dispatch(loginSuccess(res.data));
    console.log("res : ", res.data);
  } catch (err) {
    dispatch(loginFailure());
  }
};
