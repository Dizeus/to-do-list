

export const api = {

    async getTasks(userEmail){
        try{
            const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
            const todos = await response.json();
            return todos;
        }catch (err){
            console.error(err)
        }
    },
    async createTask(data){
        try{
            const response = await fetch(`http://localhost:8000/todos`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.status
        }catch (err){
            console.error(err)
        }
    },

    async updateTask(data, id){
        try{
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            return response.status
        }catch (err){
            console.error(err)
        }
    },
    async deleteTask(id){
        try{
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "DELETE"
            })
            return response.status;
        }catch (error){
            console.error(error)
        }
    },
    async auth(values, endpoint){
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(  {user_email: values.email, password: values.password})
            })
            return await response.json();
        }catch (err){
            console.error(err)
        }
    },


}