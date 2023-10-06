const initialState = {
    userId: null,
};
const loginUser = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_ID":
            return { ...state, userId: action.payload };

        default:
            return state;
    }
};
export default loginUser;
