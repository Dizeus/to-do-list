

export const api = {

    async getTasks(userEmail){
        try{
            const response = await fetch(`/todos/${userEmail}`)
            console.log()
            const todos = await response.json();
            return todos;
        }catch (err){
            console.error(err)
        }
    },
    async createTask(data){
        try{
            const response = await fetch(`/todos/`, {
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
            const response = await fetch(`/todos/${id}`, {
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
            const response = await fetch(`/todos/${id}`, {
                method: "DELETE"
            })
            return response.status;
        }catch (error){
            console.error(error)
        }
    },
    async auth(values, endpoint){
        try {
            console.log("in Api")
            const response = await fetch(`/${endpoint}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(  {user_email: values.email, password: values.password})
            })
            console.log("after fetch")
            return await response.json();
        }catch (err){
            //console.error(err)
        }
    },


}