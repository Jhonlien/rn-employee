const initState = {
    data : [],
    loading: true,
    refresh : true
}

export const reducers = (state = initState, action)=>{
    if(action.type == "ADD_DATA"){
        return{
            ...state,
            data:action.payload
        }
    }
    if(action.type == "SET_LOADING"){
        return{
            ...state,
            loading:action.payload
        }
    }
    if(action.type == "SET_REFRESH"){
        return{
            ...state,
            refresh:action.payload
        }
    }
    return state
}