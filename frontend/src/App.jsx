import "./App.css";
import Login from "./components/Login";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
  return (  
    <>
      <div class="relative min-h-screen overflow-x-hidden">
        <div className="absolute inset-0 pointer-events-none z-6">
          <div className="absolute  -top-[10%] -left-[10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px]" />
          <div className="absolute  -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-20 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-h-screen w-screen flex justify-center items-center">
                  <div className="relative z-5 w-full max-w-[700px] px-6">
                    <Login />
                  </div>
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
