import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import disk from "../assets/vinyl.svg";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState(null);
  const [error, setError] = useState(null);

  const messages = [
    "Analyzing your questionable taste…",
    "Looking for your top artist… hopefully it’s not Pitbull",
    "Roasting your playlists… gently.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const [userProfile, userArtists, userTracks] = await Promise.all([
          axios.get("http://127.0.0.1:8080/api/profile", {
            withCredentials: true,
          }),
          axios.get("http://127.0.0.1:8080/api/artists", {
            withCredentials: true,
          }),
          axios.get("http://127.0.0.1:8080/api/tracks", {
            withCredentials: true,
          }),
        ]);

        if (!userProfile.data || !userArtists.data || !userTracks.data) {
          setError("API returned incomplete data.");
          return;
        }

        setData({
          profile: userProfile.data,
          artist: userArtists.data,
          tracks: userTracks.data,
        });
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://127.0.0.1:8080/api/logout",
      {},
      {
        //get req doesnt have a  req body while post req does.
        withCredentials: true,
      }
    );

    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex flex-col gap-4 justify-center items-center bg-black">
        <div className="w-12 h-12 border-8 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        <div key={index} className="text-lg text-white fade">
          {messages[index]}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen flex flex-col gap-4 justify-center items-center bg-black text-white text-center p-4">
        <div className="text-2xl font-bold mb-4">
          Uh oh… something went wrong!
        </div>
        <div className="mb-4">{error}</div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-screen items-center h-screen text-white">
        <div className="w-[95%]">
          <div className="flex justify-between items-center w-full pl-6 pr-6 pt-1 pb-1 bg-black/60 rounded-2xl mt-10">
            <div className="flex justify-center items-center gap-4">
              <img
                src={Data.profile.images[0].url}
                alt="profile"
                className="w-17 h-17 rounded-full object-cover"
              />
              <div className="text-white">{Data.profile.display_name}</div>
            </div>
            <div
              onClick={handleLogout}
              className="text-green-400 hover:drop-shadow-[0_0_20px_white] cursor-pointer hover:scale-120 transition-transform duration-290"
            >
              Try Again!!
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 w-full mt-5 ">
            <div className="flex flex-col w-full md:w-[50%] bg-black/50 rounded-2xl h-auto p-5">
              <div>{/* basic metre */}</div>
              <div>{/* gemini roast */}</div>
            </div>
            <div className="flex flex-col  w-full md:w-[50%] bg-black/50 rounded-2xl h-auto p-5">
              <div className="flex gap-4 pt-4 pb-4">
                <img src={disk} alt="" />
                <div className="font-bold text-3xl">The Evidence</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold mb-2">TOP ARTISTS</div>
                <div className="flex flex-wrap gap-4">
                  {Data.artist.items.slice(0, 8).map((artist) => {
                    return (
                      <div
                        key={artist.id}
                        className="relative group flex gap- items-center hover:scale-120 transition-transform duration-290"
                      >
                        <img
                          src={artist.images[0].url}
                          className="w-30 h-30 object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center transition-opacity duration-300
                opacity-100 md:opacity-0 group-hover:opacity-100"
                        >
                          {artist.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-bold mb-2 mt-3">
                  TOP TRACKS
                </div>

                <div className="flex flex-col gap-3">
                  {Data.tracks.items.slice(0, 5).map((track) => {
                    return (
                      <div
                        key={track.id}
                        className="flex gap-5 items-center bg-primary"
                      >
                        <img
                          src={track.album.images[0].url}
                          className="w-20 h-20 "
                          alt=""
                        />
                        <div>
                          <div>{track.name}</div>
                          <div className="text-gray-500">
                            {track.artists[0].name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
