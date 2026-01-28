import React, { useContext, useState, useEffect} from 'react';
import "./Profile.css";
import { UserContext } from '../App';
import { get, post } from "../../utilities";
import wideTim from "../assets/wide-tim.webp"
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Profile = (props) => {
    const { userId, handleLogin, handleLogout, achievements } = useContext(UserContext);
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Profile Page";

        get(`/api/whoami`, {userId: userId}).then((userObj) => setUser(userObj));
    }, [userId]);

    return (
        // <body>
        <>
            <div className='Profile-container'>
                <img className='profile-img' src={wideTim} alt='wide tim image'/>
                <h1>{user?.name}</h1>
                {/* {userId ? (
                        <button
                          onClick={() => {
                            googleLogout();
                            handleLogout();
                          }}
                        >
                          Logout
                        </button>
                      ) : (
                        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                      )} */}
                <h3>Achievements: {achievements}</h3>
            </div>
        </>
        // </body>
        // <>
        // <img src='wide-tim.webp' alt='wide tim picture'/>
        // <h1>{Skeleton.userId}</h1>
        // <h2>Achievements</h2>
        // </>
    )
}
export default Profile;
