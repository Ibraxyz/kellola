export const updateCurrentPath = (newPath)=>{
    return(dispatch)=>{
        dispatch({
            "type" : "UPDATE",
            "payload" : newPath
        });
    }
}

export const updateCurrentLoginStatus = (payload)=>{
    return(dispatch)=>{
        dispatch({
            "type" : "UPDATE_LOGIN_STATUS",
            "payload" : payload
        });
    }
}

export const updateCurrentUser = (payload)=>{
    return(dispatch)=>{
        dispatch({
            "type" : "UPDATE_CURRENT_USER",
            "payload" : payload
        });
    }
}

export const updateCurrentCart = (payload)=>{
    return(dispatch)=>{
        dispatch({
            "type" : "UPDATE_CART",
            "payload" : payload
        });
    }
}

export const updateCurrentSearchKeyword = (payload)=>{
    return(dispatch)=>{
        dispatch({
            "type" : "UPDATE_SEARCH_KEYWORD",
            "payload" : payload
        });
    }
}