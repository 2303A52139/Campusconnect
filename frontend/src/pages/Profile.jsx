import { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile
} from "../services/authService";

function Profile() {

    const [user, setUser] = useState({
        bio: "",
        company: "",
        experience: "",
        city: "",
        availability: "Available"
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
                company: user.company,
                experience: user.experience,
                city: user.city,
                availability: user.availability
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

            <input
                type="number"
                name="experience"
                value={user.experience || ""}
                onChange={handleChange}
                placeholder="Experience"
            />

            <br /><br />

            <input
                type="text"
                name="city"
                value={user.city || ""}
                onChange={handleChange}
                placeholder="City"
            />

            <br /><br />

            <select
                name="availability"
                value={user.availability || "Available"}
                onChange={handleChange}
            >
                <option>Available</option>
                <option>Limited Availability</option>
                <option>Not Accepting Requests</option>
            </select>

            <button onClick={handleUpdate}>
                Update Profile
            </button>

        </div>
    );
}

export default Profile;