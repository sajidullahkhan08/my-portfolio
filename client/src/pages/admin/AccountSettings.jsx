import { useState } from "react";
import {
  FiSave,
  FiLock,
  FiUser,
  FiMail,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Admin.css";

export default function AccountSettings() {
  const { user } = useAuth();

  // Profile state
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleProfileSave = async () => {
    setProfileSaving(true);
    setProfileMsg("");
    try {
      await authAPI.updateProfile(profile);
      setProfileMsg("Profile updated successfully!");
      setTimeout(() => setProfileMsg(""), 4000);
    } catch (err) {
      setProfileMsg(
        err.response?.data?.message || "Error updating profile"
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMsg("");

    if (!passwords.currentPassword || !passwords.newPassword) {
      setPasswordMsg("Both current and new password are required");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPasswordMsg("New password must be at least 6 characters");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMsg("New passwords do not match");
      return;
    }
    if (passwords.currentPassword === passwords.newPassword) {
      setPasswordMsg("New password must be different from current password");
      return;
    }

    setPasswordSaving(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswordMsg("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setPasswordMsg(""), 4000);
    } catch (err) {
      setPasswordMsg(
        err.response?.data?.message || "Error changing password"
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const isSuccess = (msg) =>
    msg.includes("successfully") || msg.includes("Success");

  return (
    <div>
      <div className="admin-page-header">
        <h1>Account Settings</h1>
      </div>

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
            <FiUser size={18} /> Profile Information
          </h3>
          {profileMsg && (
            <div
              className={`alert ${isSuccess(profileMsg) ? "alert-success" : "alert-error"}`}
            >
              {profileMsg}
            </div>
          )}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder="admin@example.com"
                  style={{ paddingLeft: 36 }}
                />
                <FiMail
                  size={16}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleProfileSave}
            disabled={profileSaving}
            style={{ marginTop: 8 }}
          >
            <FiSave /> {profileSaving ? "Saving..." : "Update Profile"}
          </button>
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
            <FiLock size={18} /> Change Password
          </h3>
          {passwordMsg && (
            <div
              className={`alert ${isSuccess(passwordMsg) ? "alert-success" : "alert-error"}`}
            >
              {passwordMsg}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="form-input"
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter your current password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 12,
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-tertiary)",
                  display: "flex",
                }}
                aria-label="Toggle password visibility"
              >
                {showCurrentPassword ? (
                  <FiEyeOff size={16} />
                ) : (
                  <FiEye size={16} />
                )}
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showNewPassword ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Minimum 6 characters"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-tertiary)",
                    display: "flex",
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showNewPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                className="form-input"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Re-enter new password"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            <button
              className="btn btn-primary btn-sm"
              onClick={handlePasswordChange}
              disabled={passwordSaving}
            >
              <FiShield />{" "}
              {passwordSaving ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="card">
          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FiShield size={18} /> Security Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              fontSize: "0.9rem",
            }}
          >
            <div>
              <span
                style={{
                  color: "var(--text-tertiary)",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Role
              </span>
              <span
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "admin"}
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "var(--text-tertiary)",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Account Created
              </span>
              <span style={{ color: "var(--text-primary)" }}>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
