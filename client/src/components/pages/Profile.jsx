import React from 'react';
import "./Profile.css";
import user from '../../../../server/models/user';

const Profile = (props) => {
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Profile Page";
        get(`/api/user`, {userId: props.userId}).then((userObj) => setUser(userObj));
    }, []);

    return (
        <>
            <div className='Profile-container'>
                <img src='wide-tim.webp' alt='wide tim picture'/>
                {/* <h1>{user.name}</h1> */}
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
