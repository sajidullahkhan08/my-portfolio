import { useState } from "react";
import { FiLock, FiUser, FiSave, FiCheck, FiAlertCircle } from "react-icons/fi";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Admin.css";

export default function AccountSettings() {
  const { user } = useAuth();

  // Profile state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaving, setProfileSaving] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [msg, setMsg] = useState({ text: "", type: "" });

  const showMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 4000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      return showMsg("Name and email are required", "error");
    }
    setProfileSaving(true);
    try {
      await authAPI.updateProfile({ name, email });
      showMsg("Profile updated successfully!");
    } catch (err) {
      showMsg(err.response?.data?.message || "Error updating profile", "error");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      return showMsg("All password fields are required", "error");
    }
    if (newPassword.length < 8) {
      return showMsg("New password must be at least 8 characters", "error");
    }
    if (newPassword !== confirmPassword) {
      return showMsg("New passwords do not match", "error");
    }
    setPasswordSaving(true);
    try {
      await authAPI.changePassword({ currentPassword, newPassword });
      showMsg("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showMsg(
        err.response?.data?.message || "Error changing password",
        "error"
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Account Settings</h1>
      </div>

      {msg.text && (
        <div
          className={`alert ${msg.type === "error" ? "alert-error" : "alert-success"}`}
        >
          {msg.type === "error" ? (
            <FiAlertCircle size={16} />
          ) : (
            <FiCheck size={16} />
          )}{" "}
          {msg.text}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Profile Section */}
        <div className="card">
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiUser /> Profile Information
          </h3>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={profileSaving}
            >
              <FiSave /> {profileSaving ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="card">
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiLock /> Change Password
          </h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                className="form-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  className="form-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  className="form-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={passwordSaving}
            >
              <FiLock /> {passwordSaving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
