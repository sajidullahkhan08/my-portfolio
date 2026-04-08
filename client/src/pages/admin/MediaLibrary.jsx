import { useState, useEffect, useRef } from "react";
import {
  FiUpload,
  FiTrash2,
  FiCopy,
  FiEdit2,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { mediaAPI } from "../../services/api";
import "./Admin.css";

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const fileRef = useRef();

  const fetchData = () => {
    setLoading(true);
    mediaAPI
      .getAll({ limit: 100 })
      .then((res) => setMedia(res.data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await mediaAPI.upload(formData);
      setUploadedMedia(res.data.data);
      setEditData({
        category: "",
        title: "",
        description: "",
        displayInGallery: true,
      });
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleMetadataSave = async () => {
    if (!uploadedMedia) return;
    try {
      await mediaAPI.updateMetadata(uploadedMedia._id, editData);
      setUploadedMedia(null);
      setEditData({});
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Error saving metadata");
    }
  };

  const handleEditMetadata = (m) => {
    setEditingId(m._id);
    setEditData({
      category: m.category || "",
      title: m.title || "",
      description: m.description || "",
      displayInGallery: m.displayInGallery !== false,
    });
  };

  const handleUpdateMetadata = async () => {
    try {
      await mediaAPI.updateMetadata(editingId, editData);
      setEditingId(null);
      setEditData({});
      fetchData();
    } catch (err) {
      alert("Error updating metadata");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this media?")) return;
    try {
      await mediaAPI.delete(id);
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );

  return (
    <div>
      <div className="admin-page-header">
        <h1>Media Library</h1>
        <label className="btn btn-primary btn-sm" style={{ cursor: "pointer" }}>
          <FiUpload /> {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            ref={fileRef}
            onChange={handleUpload}
            accept="image/*,video/*,.pdf"
            style={{ display: "none" }}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Metadata Modal after upload */}
      {uploadedMedia && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => {
            setUploadedMedia(null);
            setEditData({});
          }}
        >
          <div
            className="card"
            style={{ width: "90%", maxWidth: 400, padding: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ margin: 0 }}>Add Media Details</h3>
              <button
                onClick={() => {
                  setUploadedMedia(null);
                  setEditData({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">Title (Optional)</label>
              <input
                className="form-input"
                placeholder="e.g., Product Launch Event"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category (Optional)</label>
              <input
                className="form-input"
                placeholder="e.g., Events, Lifestyle, UI/UX"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea
                className="form-textarea"
                placeholder="Add details about this image..."
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                style={{ minHeight: 80 }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={editData.displayInGallery}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      displayInGallery: e.target.checked,
                    })
                  }
                />
                <span className="form-label" style={{ margin: 0 }}>
                  Show in Gallery
                </span>
              </label>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleMetadataSave}
              >
                <FiCheck /> Save
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  setUploadedMedia(null);
                  setEditData({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit metadata modal */}
      {editingId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => {
            setEditingId(null);
            setEditData({});
          }}
        >
          <div
            className="card"
            style={{ width: "90%", maxWidth: 400, padding: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ margin: 0 }}>Edit Media Details</h3>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditData({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                className="form-input"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                style={{ minHeight: 80 }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={editData.displayInGallery}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      displayInGallery: e.target.checked,
                    })
                  }
                />
                <span className="form-label" style={{ margin: 0 }}>
                  Show in Gallery
                </span>
              </label>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleUpdateMetadata}
              >
                <FiCheck /> Update
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  setEditingId(null);
                  setEditData({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {media.map((m) => (
          <div
            key={m._id}
            className="card"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            {m.resourceType === "image" ? (
              <img
                src={m.secureUrl || m.url}
                alt={m.alt || m.originalFilename}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-tertiary)",
                  fontSize: "0.8rem",
                  color: "var(--text-tertiary)",
                }}
              >
                {m.format?.toUpperCase()}
              </div>
            )}
            {!m.displayInGallery && (
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  background: "var(--error)",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                HIDDEN
              </div>
            )}
            {m.category && !editingId && (
              <span
                className="tag"
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  fontSize: "0.65rem",
                }}
              >
                {m.category}
              </span>
            )}
            <div style={{ padding: 12 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: 8,
                }}
              >
                {m.title || m.originalFilename}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleEditMetadata(m)}
                  title="Edit"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => copyUrl(m.secureUrl || m.url)}
                  title="Copy URL"
                >
                  <FiCopy size={14} />
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDelete(m._id)}
                  style={{ color: "var(--error)" }}
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {media.length === 0 && (
        <div className="empty-state">
          <h3>No media uploaded</h3>
          <p>Upload images, videos, or documents to get started.</p>
        </div>
      )}
    </div>
  );
}
