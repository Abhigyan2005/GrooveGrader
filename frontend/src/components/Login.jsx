import "../App.css";
import fire from "../assets/fire.svg";
import check from "../assets/check.svg";
import score from "../assets/score.svg";
import play from "../assets/play.svg";
import axios from "axios";

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

        <div className="w-full flex gap-3 ">
          <div className="card flex flex-col items-center justify-center rounded-2xl bg-black/20 flex-1 h-[110px] cursor-pointer hover:scale-110 ransition-transform duration-290 ">
            <img
              className="hover:drop-shadow-[0_0_20px_red] w-[35px] h-[35px] "
              src={fire}
              alt=""
            />
            <div className="font-bold text-gray-300">Savage Roast</div>
          </div>
          <div className="card flex flex-col items-center justify-center rounded-2xl bg-black/20 flex-1 h-[110px] cursor-pointer hover:scale-110 ransition-transform duration-290 ">
            <img
              className="hover:drop-shadow-[0_0_20px_yellow] w-[35px] h-[35px]"
              src={check}
              alt=""
            />
            <div className="font-bold text-gray-300">Stats Check</div>
          </div>
          <div className="card flex flex-col items-center justify-center rounded-2xl bg-black/20 flex-1 h-[110px] cursor-pointer hover:scale-110 ransition-transform duration-290">
            <img
              className="hover:drop-shadow-[0_0_20px_blue] w-[35px] h-[35px]"
              src={score}
              alt=""
            />
            <div className="font-bold text-gray-300">Taste Score</div>
          </div>
        </div>

        <div className="w-full bg-black/20 rounded-2xl h-[220px] flex flex-col items-center justify-center p-6 gap-4">
          <button
            onClick={() =>
              (window.location.href = "http://127.0.0.1:8080/api/login")
            }
            className="w-full border border-green-600 text-green-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 bg-black/20 hover:bg-white hover:text-black cursor-pointer transition-all duration-300"
          >
            <img src={play} alt="" className="w-[30px] h-[30px]" />
            Connect Your Spotify
          </button>
        </div>
      </div>
      ;
    </>
  );
}

export default Login;
