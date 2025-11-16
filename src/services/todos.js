import api from "./api";


export const getTodos = async () => {
    //const token = localStorage.getItem("tokenDeRomi"); // recupera el token
    const { data } = await api.get("/todos");
    return data;
};

export const getTodoById = async (id) => {
    const { data } = await api.get(`/todos/${id}`);
    return data;
}


export const createTodo = async (todo) => {
    const { data } = await api.post("/todos", todo);
    return data;
}

export const updateTodo = async (id, todo) => {
    const { data } = await api.put(`/todos/${id}`, todo);
    return data;
}