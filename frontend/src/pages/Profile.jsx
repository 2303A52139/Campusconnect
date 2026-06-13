import { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile
} from "../services/authService";

function Profile() {

    const [user, setUser] = useState({
        bio: "",
        company: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res =
                    await getProfile(token);

                setUser(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();

    }, []);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {

        try {

            await updateProfile(token, {
                bio: user.bio,
                company: user.company
            });

            alert("Profile Updated");

        } catch (error) {

            alert("Update Failed");
        }
    };

    return (
        <div>

            <h2>Profile</h2>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <input
                type="text"
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
            />

            <br /><br />

            <input
                type="text"
                name="company"
                value={user.company || ""}
                onChange={handleChange}
                placeholder="Company"
            />

            <br /><br />

            <button onClick={handleUpdate}>
                Update Profile
            </button>

        </div>
    );
}

export default Profile;