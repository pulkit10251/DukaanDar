const initialState = {
  profileData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      const profileData = action.profileData;
      return {
        profileData: profileData,
      };
  }
  return state;
};
