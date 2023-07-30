const SET_TASKS = 'SET_TASKS';
const EDIT_TASK = 'EDIT_TASK';

const initialState = {
    tasks: []
};
function appReducer(state = initialState, action){
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload
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
        const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
        const todos = await response.json();
        dispatch(setTasks(todos))
    }catch (err){
        console.error(err)
    }
}

export const createTask = (data) => async (dispatch) => {
    try{
        const response = await fetch(`http://localhost:8000/todos`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return response.status
    }catch (error){
        console.log(error)
    }
}

export const updateTask = (data, id) => async (dispatch) => {
    try{
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if(response.status===200){
            const userEmail = data.user_email;
            const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
            const todos = await response.json();
            dispatch(editTasks(todos))
        }
    }catch (error){
        console.log(error)
    }
}
export const deleteTask = (id) => async (dispatch) => {
    try{
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "DELETE"
        })
        //return await response.status;
    }catch (error){
        console.log(error)
    }
}


export default appReducer;