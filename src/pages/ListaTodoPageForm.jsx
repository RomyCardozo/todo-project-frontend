import { useEffect, useState } from "react";
import { createTodo, getTodoById, updateTodo } from "../services/todos";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";


const ListaTodoPageForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await getTodoById(id);
        setFormData({
          titulo: data.titulo ?? "",
          descripcion: data.descripcion ?? "",
          fecha_vencimiento: new Date(data.fecha_vencimiento).toISOString().split("T")[0] ?? "",
          prioridad: data.prioridad ?? ""
        });
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
        toast.error("Error al cargar la tarea");
      }finally{
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_vencimiento: "",
    prioridad: ""
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado", e.target);
    console.log("Datos del formulario:", formData);
    //llamar a la api de crear todo
    try {
      if (id) {
        //llamar a la api de actualizar todo
        const response = await updateTodo(id, formData);
        toast.success(response.message);
        navigate("/");
      } else {
        //llamar a la api de crear todo
        const response = await createTodo(formData);
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al enviar el formulario");
    }
    return;
  }

  const handleChange = (e) => {
    //console.log("cambiando el valor de ", e.target.name, " a ", e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Formulario de Tarea</h1>
      {loading && toast.info("Cargando...")}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titulo:</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Descripcion:</label>
          <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </div>
        <br />
        <div>
          <label>Fecha de vencimiento:</label>
          <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} 
          />
        </div>
        <br />
        <div>
          <label>Prioridad:</label>
          <input type="text" name="prioridad" value={formData.prioridad} onChange={handleChange} />
        </div>
        <br />
        <button type="submit">Guardar</button>

      </form>
    </div>
  )
}

export default ListaTodoPageForm
