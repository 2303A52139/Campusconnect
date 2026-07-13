import { useEffect, useState } from "react";
import { updateProfile } from "../services/authService";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

export default function Profile() {
  const [formData, setFormData] = useState({
    bio: "",
    company: "",
    experience: "",
    city: "",
    availability: "Available",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, token, updateUser } = useUser();

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || "",
        company: user.company || "",
        experience: user.experience || "",
        city: user.city || "",
        availability: user.availability || "Available",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    const experienceValue = formData.experience
      ? Number(formData.experience)
      : "";

    if (formData.bio && formData.bio.length > 500) {
      setError("Bio must not exceed 500 characters");
      return;
    }

    if (formData.company && formData.company.length > 100) {
      setError("Company name must not exceed 100 characters");
      return;
    }

    if (formData.city && formData.city.length > 100) {
      setError("City must not exceed 100 characters");
      return;
    }

    if (
      formData.experience &&
      (Number.isNaN(experienceValue) ||
        experienceValue < 0 ||
        experienceValue > 80)
    ) {
      setError("Experience must be a number between 0 and 80");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        experience: formData.experience ? experienceValue : "",
      };

      const res = await updateProfile(token, payload);
      updateUser(res.data);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loader message="Loading profile..." />;
  }

  if (loading) {
    return <Loader message="Saving profile..." />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
            Your account
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">Profile</h2>
          <p className="mt-2 text-sm text-slate-300">
            Update your professional details so seniors and juniors can connect with you.
          </p>
        </div>

        <div className="mb-6 grid gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">Name:</span> {user.name}
          </p>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">Email:</span> {user.email}
          </p>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">Role:</span> {user.role}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        )}

        <div className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Short bio"
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of experience"
              min="0"
              max="80"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            >
              <option value="Available">Available</option>
              <option value="Limited Availability">Limited Availability</option>
              <option value="Not Accepting Requests">Not Accepting Requests</option>
            </select>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-2 rounded-2xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-400 active:scale-[0.99]"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}