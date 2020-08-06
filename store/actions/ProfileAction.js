import firebase from "firebase";

export const getProfileData = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Users/${userId}.json?auth=${token}`
    );
    const resData = await response.json();

    dispatch({
      type: "GET_PROFILE",
      profileData: resData,
    });
  };
};

export const uploadImageUrl = (url) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Users/${userId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      }
    );
    const resData = await response.json();
  };
};
