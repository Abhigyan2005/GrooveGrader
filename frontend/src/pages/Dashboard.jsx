import axios from 'axios'
import { useEffect, useState } from 'react';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userprofile = await axios.get('http://127.0.0.1:8080/api/profile',{withCredentials: true});
        setUserData({
          profile: userprofile.data
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  if (loading) {
    return <div className='w-full h-screen bg-amber-300'>loading bitch</div>;
  }

  if (!userdata || !userdata.profile) {
    return <div className='w-full h-screen bg-red-500'>failed to load</div>;
  }

  return (
    <>
      <img src={userdata.profile.images[0].url} alt="" />
      <div className="text-white">{userdata.profile.display_name}</div>
    </>
  );
}

export default Dashboard
