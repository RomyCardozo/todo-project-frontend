import ListaTodoPageForm from "./pages/ListaTodoPageForm"
import ListaTodoPage from "./pages/ListaTodoPage";
import ListaTodoPageDetail from "./pages/ListaTodoPageDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {

  return (
		<>
			{/* Rutas */}
      <nav>
        <a href="/">Lista de Tareas</a> |{" "}
        <a href="/create">Crear Tarea</a>
        <a href="/edit/1"> | Editar Tarea (ID: 1)</a>
        <a href="/1"> | Ver Detalle de Tarea (ID: 1)</a>
      </nav>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ListaTodoPage />} />
					<Route path="/:id" element={<ListaTodoPageDetail />} />
					<Route path="/create" element={<ListaTodoPageForm />} />
					<Route path="/edit/:id" element={<ListaTodoPageForm />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
  );
}

export default App
