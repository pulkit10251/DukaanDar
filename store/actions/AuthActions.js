import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const signup = (email, password, name, contact, type) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASH-pS6-FOO4BUVPjtcTVRnq-i6w1pmuw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "The email address is already in use by another account";
      } else {
        message = errorId.split(":")[1];
      }
      throw new Error(message);
    }

    const resData = await response.json();

    if (type === "User" && response.ok) {
      const addServerResponse = await fetch(
        `https://dukaandar-e4590.firebaseio.com/Users/${resData.localId}.json?auth=${resData.idToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: resData.localId,
            contact: contact,
          }),
        }
      );
      const addserverRes = await addServerResponse.json();
    } else if (type === "DukaanDar" && response.ok) {
      const addServerResponse = await fetch(
        `https://dukaandar-e4590.firebaseio.com/DukaanDar/${resData.localId}.json?auth=${resData.idToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: resData.localId,
            contact: contact,
            shopId: "DD-" + Math.floor(Math.random() * 100000),
          }),
        }
      );
      const addserverRes = await addServerResponse.json();
    }

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDatatoStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      type,
      resData.refreshToken
    );

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

export const signin = (email, password, type) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASH-pS6-FOO4BUVPjtcTVRnq-i6w1pmuw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message =
          "The given email address is not registered! please signup first?";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password is incorrect!";
      } else {
        message = errorId.split(":")[1];
      }
      throw new Error(message);
    }

    const resData = await response.json();

    const responseData = await fetch(
      `https://dukaandar-e4590.firebaseio.com/DukaanDar/${resData.localId}.json`
    );

    const data = await responseData.json();
    if (type === "DukaanDar" && data === null) {
      throw new Error("Sorry! You are not registered as a DukaanDar !");
    }

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    console.log("in signin", type);

    saveDatatoStorage(
      resData.idToken,
      resData.localId,
      expirationDate,
      type,
      resData.refreshToken
    );

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

const saveDatatoStorage = (
  token,
  userId,
  expirationDate,
  type,
  refreshToken
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      type: type,
      refreshToken: refreshToken,
    })
  );
};

export const passwordReset = (emailId) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyASH-pS6-FOO4BUVPjtcTVRnq-i6w1pmuw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailId,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message =
          "The given email address is not registered! please signup first !";
      } else {
        message = errorId.split(":")[1];
      }
      throw new Error(message);
    }
  };
};

export const refreshCredentials = (refreshToken, type) => {
  return async (dispatch) => {
    console.log(type);
    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyASH-pS6-FOO4BUVPjtcTVRnq-i6w1pmuw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=refresh_token&refresh_token=" + refreshToken,
      }
    );

    if (!response.ok) {
      console.log("error occured!!!");
      const resData = await response.json();
      const error = resData.error.message;
      throw new Error(error);
    }

    const resData = await response.json();

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expires_in) * 1000
    );

    saveDatatoStorage(
      resData.id_token,
      resData.user_id,
      expirationDate,
      type,
      resData.refresh_token
    );
    dispatch(
      authenticate(
        resData.user_id,
        resData.id_token,
        parseInt(resData.expires_in) * 1000
      )
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const setLogoutTimer = (expirationTime) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);

    timer = setTimeout(async () => {
      try {
        dispatch(
          refreshCredentials(transformedData.refreshToken, transformedData.type)
        );
      } catch (err) {
        dispatch(logout());
      }
    }, expirationTime);
  };
};
