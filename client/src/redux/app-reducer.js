import {api} from "../components/api";

const SET_TASKS = 'SET_TASKS';
const EDIT_TASK = 'EDIT_TASK';


const initialState = {
    tasks: [],
};
function appReducer(state = initialState, action){
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: [...action.payload]
            }
         case EDIT_TASK:
            return {
                ...state,
                tasks: [...action.payload]
            }
        default:
            return state;
    }
}
export const setTasks = (userTasks) => ({ type: SET_TASKS, payload:userTasks});
export const editTasks = (newTasks) => ({ type: SET_TASKS, payload:newTasks});


export const getData = (userEmail) => async (dispatch)=> {
    try {
        const todos = await api.getTasks(userEmail)
        dispatch(setTasks(todos))
    }catch (err){
        console.error(err)
    }
}

export const createTask = (data) => async (dispatch) => {
    try{
       const status = await api.createTask(data)
        if(status===200){
            dispatch(getData(data.user_email))
        }else{
            throw("An error occurred")
        }
    }catch (error){
        console.log(error)
    }
}

export const updateTask = (data, id) => async (dispatch) => {
    try{
        const status = await api.updateTask(data,id)
        if(status===200){
            dispatch(getData(data.user_email))
        }else{
            throw("An error occurred")
        }
    }catch (error){
        console.log(error)
    }
}
export const deleteTask = (id, userEmail) => async (dispatch) => {
    try{
        const status = await api.deleteTask(id)
        if(status===200){
            dispatch(getData(userEmail))
        }else{
            throw("An error occurred")
        }
    }catch (error){
        console.log(error)
    }
}

export const auth = async (values, endpoint) => {
    try {
        return await api.auth(values,endpoint)
    }catch (err){
        console.error(err)
    }

}



export default appReducer;