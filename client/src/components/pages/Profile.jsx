import React from 'react';
import "./Profile.css";

const Profile = (props) => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Profile Page";
        // use userContext/useContext or a get request to get info from backend
        get(`/api/user`, {userId: userId}).then((userObj) => setUser(userObj));
    }, []);

    return (
        <>
            <div className='Profile-container'>
                <img className='profile-img' src='wide-tim.webp' alt='wide tim picture'/>
                <h1>{userId}</h1>
                <h2>Achievements</h2>
            </div>
        </>
        // <>
        // <img src='wide-tim.webp' alt='wide tim picture'/>
        // <h1>{Skeleton.userId}</h1>
        // <h2>Achievements</h2>
        // </>
    )
}
export default Profile;
