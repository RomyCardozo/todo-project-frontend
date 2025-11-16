import { useEffect, useState } from "react"
import { getTodos } from "../services/todos";

const ListaTodoPage = () => {

  const [todos, setTodos] = useState([]);
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJSb21paWJiQGdtYWlsLmNvbSIsImlhdCI6MTc2MzMyMTUwMSwiZXhwIjoxNzYzMzI1MTAxfQ.9fMEA0gHhn1_fn0eS2IeqNClWUWAX21DPOprY4zcr4s";

  useEffect(() => {
    localStorage.setItem("tokenDeRomi", TOKEN);
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (error) {
        console.error("el error es: " + error);
        
      }
    }
    fetchTodos();
  }, [])

  return (
    <div>
      <table border="2">
        <thead >
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Fecha de vencimiento</th>
            <th>Prioridad</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.titulo}</td>
              <td>{todo.descripcion}</td>
              <td>{todo.fecha_vencimiento}</td>
              <td>{todo.prioridad}</td>
              <td>
                <a href={`/${todo.id}`}>Ver Detalle</a> |{" "}
                <a href={`/edit/${todo.id}`}>Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListaTodoPage
