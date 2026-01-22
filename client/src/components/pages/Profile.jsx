import React, { useContext, useState, useEffect} from 'react';
import "./Profile.css";
import { UserContext } from '../App';
import { get, post } from "../../utilities";
import wideTim from "../assets/wide-tim.webp"

const Profile = (props) => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Profile Page";
        // use userContext/useContext or a get request to get info from backend
        get(`/api/user`, {userId: userId}).then((userObj) => setUser(userObj));
    }, []);

    return (
        <body>
            <div className='Profile-container'>
                <img className='profile-img' src={wideTim} alt='wide tim image'/>
                <h1>{userId}</h1>
                <hr></hr>
            </div>
            <h2>Achievements</h2>
        </body>
        // <>
        // <img src='wide-tim.webp' alt='wide tim picture'/>
        // <h1>{Skeleton.userId}</h1>
        // <h2>Achievements</h2>
        // </>
    )
}
export default Profile;
