import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { mediaAPI } from "../services/api";
import "./GalleryPage.css";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [page, setPage] = useState(1);

  const fetchGallery = async (category = "all", pageNum = 1) => {
    setLoading(true);
    try {
      const params = { page: pageNum, limit: 50 };
      if (category !== "all") params.category = category;
      const res = await mediaAPI.getGallery(params);
      setImages(res.data.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await mediaAPI.getCategories();
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchGallery();
  }, []);

  useEffect(() => {
    fetchGallery(selectedCategory, page);
  }, [selectedCategory, page]);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const currentImage = images[selectedImageIndex];

  return (
    <main>
      <Helmet>
        <title>Gallery — Sajidullah Khan</title>
      </Helmet>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg-grid" />
        <div className="page-hero-glow" />
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <span className="hero-label" style={{ marginBottom: 16 }}>
            Visual Portfolio
          </span>
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-subtitle">
            A collection of my work and inspirations.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="container">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="gallery-filters">
              <button
                className={`filter-tab ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory("all");
                  setPage(1);
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner" />
            </div>
          ) : images.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--text-secondary)",
              }}
            >
              <p style={{ fontSize: "1.05rem" }}>
                No images in this gallery yet.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="gallery-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {images.map((img, idx) => (
                  <motion.div
                    key={img._id}
                    className="gallery-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={img.secureUrl || img.url}
                      alt={img.title || img.originalFilename}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        {img.title && (
                          <h3 className="gallery-title">{img.title}</h3>
                        )}
                        {img.category && (
                          <span className="tag">{img.category}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <FiX size={24} />
              </button>

              <img
                src={currentImage.secureUrl || currentImage.url}
                alt={currentImage.title || currentImage.originalFilename}
                className="lightbox-image"
              />

              {(currentImage.title || currentImage.description) && (
                <div className="lightbox-info">
                  {currentImage.title && (
                    <h3 className="lightbox-title">{currentImage.title}</h3>
                  )}
                  {currentImage.description && (
                    <p className="lightbox-description">
                      {currentImage.description}
                    </p>
                  )}
                  {currentImage.category && (
                    <span className="tag">{currentImage.category}</span>
                  )}
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    className="lightbox-nav lightbox-prev"
                    onClick={prevImage}
                    aria-label="Previous"
                  >
                    <FiChevronLeft size={28} />
                  </button>
                  <button
                    className="lightbox-nav lightbox-next"
                    onClick={nextImage}
                    aria-label="Next"
                  >
                    <FiChevronRight size={28} />
                  </button>
                  <div className="lightbox-counter">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
