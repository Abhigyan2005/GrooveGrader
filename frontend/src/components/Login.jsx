import "../App.css";
import fire from "../assets/fire.svg";
import check from "../assets/check.svg";
import score from "../assets/score.svg";
import play from "../assets/play.svg";


function Login() {
  return (
    <>
      <div className="w-full flex justify-center items-center m-auto flex-col gap-6">
        <h1 className="text-5xl font-extrabold text-amber-50">
          Groove
          <span className="bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            GradeR
          </span>
        </h1>
        <div className="flex flex-col text-center justify-center">
          <span className="text-gray-400">
            Our AI Judges Your Spotify History
          </span>
          <span className="text-gray-800">WARNING: It's Brutally Honest</span>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          <div className="card flex flex-col items-center justify-center rounded-2xl bg-black/20 p-6 h-[110px] cursor-pointer hover:scale-110 transition-transform duration-290 flex-1">
            <img
              className="hover:drop-shadow-[0_0_20px_red] w-[35px] h-[35px]"
              src={fire}
              alt=""
            />
            <div className="font-bold text-gray-300 text-center text-sm">
              Savage Roast
            </div>
          </div>

          <div className="card flex flex-col items-center justify-center rounded-2xl p-6  bg-black/20 h-[110px] cursor-pointer hover:scale-110 transition-transform duration-290 flex-1">
            <img
              className="hover:drop-shadow-[0_0_20px_yellow] w-[35px] h-[35px]"
              src={check}
              alt=""
            />
            <div className="font-bold text-gray-300 text-center text-sm">
              Stats Check
            </div>
          </div>

          <div className="card flex flex-col items-center justify-center rounded-2xl p-6  bg-black/20 h-[110px] cursor-pointer hover:scale-110 transition-transform duration-290 flex-1">
            <img
              className="hover:drop-shadow-[0_0_20px_blue] w-[35px] h-[35px]"
              src={score}
              alt=""
            />
            <div className="font-bold text-gray-300 text-center text-sm">
              Taste Score
            </div>
          </div>
        </div>

        <div className="w-full bg-black/20 rounded-2xl h-[220px] flex flex-col items-center justify-center p-6 gap-4">
          <button
            onClick={() =>
              (window.location.href = "https://groovegrader.onrender.com/api/login")
            }
            className="w-full border border-green-600 text-green-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 bg-black/20 hover:bg-white hover:text-black cursor-pointer transition-all duration-300"
          >
            <img src={play} alt="" className="w-[30px] h-[30px]" />
            Connect Your Spotify
          </button>
        </div>
      </div>
      {/* GitHub icon */}
      <a
        href="https://github.com/Abhigyan2005"
        target="_blank"
        rel="noopener noreferrer"
        className="z-60 fixed top-4 right-4 w-10 h-10 text-white hover:text-gray-300"
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
    </>
  );
}

export default Login;
