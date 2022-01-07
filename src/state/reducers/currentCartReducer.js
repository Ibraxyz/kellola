const currentCartReducer = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_CART":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default currentCartReducer;