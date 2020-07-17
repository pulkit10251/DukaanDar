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

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDatatoStorage(resData.idToken, resData.localId, expirationDate);
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

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDatatoStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDatatoStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
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
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
