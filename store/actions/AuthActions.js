export const SIGNUP = "SIGNUP";

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
        "https://dukaandar-e4590.firebaseio.com/Users.json",
        {
          method: "POST",
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
        `https://dukaandar-e4590.firebaseio.com/DukaanDar/${resData.localId}.json`,
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

    dispatch({
      type: SIGNUP,
    });
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


    dispatch({
      type: SIGNUP,
    });
  };
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
