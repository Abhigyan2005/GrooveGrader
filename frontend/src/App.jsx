import "./App.css";
import Login from "./components/Login";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
  return (
    <>
      <div class="relative min-h-screen overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute  -top-[10%] -left-[10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px]" />
          <div className="absolute  -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[700px] px-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

        {/* GitHub icon */}
        <a
          href="https://github.com/Abhigyan2005"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-4 right-4 w-10 h-10 text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.28-1.552 3.282-1.23 3.282-1.23.653 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.815 1.096.815 2.21 0 1.595-.015 2.882-.015 3.27 0 .32.21.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
