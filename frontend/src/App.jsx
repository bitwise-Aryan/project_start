import Navigation from "./pages/Auth/Navigation";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Navigation />
      <div className="flex-1 p-4">
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
