import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_SET_SUCCESS,
    PASSWORD_SET_FAIL,
  } from "./types";
  import axios from "../../axiosInstance";


export const load_user = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        try {
            const res = await axios.get("http://localhost:8080/auth/users/me/");
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const body = JSON.stringify({ token: localStorage.getItem("access") });
  
      try {
        const res = await axios.post("http://localhost:8080/auth/jwt/verify", body);
  
        if (res.data.code !== "token_not_valid") {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIL,
          });
        }
      } catch (err) {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  };

  export const login = (email, password) => async (dispatch) => {
      const body = JSON.stringify({email, password});

      try {
          const res = await axios.post("http://localhost:8080/auth/jwt/create", body);
        
          dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data,
          });

          dispatch(load_user());
      } catch (err) {
          dispatch({
              type: LOGIN_FAIL,
          });
          return false;
      }
      return true;
  };

  export const signup = (
      first_name,
      lasyt_name,
      email,
      password,
      re_password
  ) => async (dispatch) => {
      const config ={
          headers: {
              "Content-type": "application/json",
          },
      };


      const body = JSON.stringify({
          first_name,
          lasyt_name,
          email,
          password,
          re_password,
      });

      try {
          const res = await axios.post("http://localhost:8080/auth/users/", body, config);

          dispatch({
              type: SIGNUP_SUCCESS,
              payload: res.data,
          });
      } catch (err) {
          dispatch({
              type: SIGNUP_FAIL,
          });
      }
  };

  export const verify = (uid, token) => async (dispatch) => {
      const config = {
          headers: {
              "Content-type": "application/json",
          },
      };

      const body = JSON.stringify( uid, token);

      try {
          await axios.post("http://localhost:8080/auth/users/activation/", body, config);

          dispatch({
              type: ACTIVATION_SUCCESS,
          });
      } catch (err) {
          dispatch({
              type: ACTIVATION_FAIL,
          });
      }
  };


  export const change_password = (
    new_password,
    re_new_password,
    current_password
  ) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({
      new_password,
      re_new_password,
      current_password,
    });
  
    try {
      await axios.post("http://localhost:8080/auth/users/set_password/", body, config);
  
      dispatch({
        type: PASSWORD_SET_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_SET_FAIL,
      });
    }
  };

  export const reset_password = (email) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ email });
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        body,
        config
      );
  
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
      });
    }
  };


  export const reset_password_confirm = (
    uid,
    token,
    new_password,
    re_new_password
  ) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
  
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };
  
  export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };