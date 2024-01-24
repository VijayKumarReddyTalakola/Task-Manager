import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedLayout from "./components/ProtectedLayout";
import { Toaster } from "react-hot-toast";
import AllTasks from "./components/AllTasks";
import AddTask from "./components/AddTask";
import UpdateTaskDetails from "./components/UpdateTaskDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<AllTasks />} />
            <Route path="/task/new" element={<AddTask />} />
            <Route path="/task/update/:id" element={<UpdateTaskDetails />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </>
  );
}

export default App;
