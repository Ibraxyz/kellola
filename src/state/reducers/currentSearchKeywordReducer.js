const currentSearchKeywordReducer = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_SEARCH_KEYWORD":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default currentSearchKeywordReducer;