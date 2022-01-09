const currentTableNumberReducer = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_TABLE_NUMBER":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default currentTableNumberReducer;