import { useEffect, useState } from "react";
import { formatPrice, formatRating, ratingLabel } from "../utils/formatters";
import { useFavorites } from "../context/FavoritesContext";

export default function HotelModal({ hotel, onClose }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setActivePhoto(0);
  }, [hotel]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!hotel) return null;

  const photos = hotel.photos?.length ? hotel.photos : [hotel.thumbnail];
  const saved = isFavorite(hotel.id);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotel-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal__gallery">
          <img
            className="modal__gallery-main"
            src={photos[activePhoto]}
            alt={`${hotel.name} photo ${activePhoto + 1}`}
          />
          {photos.length > 1 && (
            <div className="modal__gallery-thumbs">
              {photos.slice(0, 8).map((photo, idx) => (
                <button
                  type="button"
                  key={photo + idx}
                  className={`modal__thumb ${idx === activePhoto ? "is-active" : ""}`}
                  onClick={() => setActivePhoto(idx)}
                  aria-label={`Show photo ${idx + 1}`}
                >
                  <img src={photo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal__body">
          <div className="modal__heading">
            <div>
              <span className="modal__location">{hotel.location}</span>
              <h2 id="hotel-modal-title">{hotel.name}</h2>
            </div>
            <button
              type="button"
              className={`btn btn--outline modal__save ${saved ? "is-saved" : ""}`}
              onClick={() => toggleFavorite(hotel.id)}
            >
              {saved ? "Saved ✓" : "Save stay"}
            </button>
          </div>

          <div className="modal__meta">
            <span className="modal__rating">
              <strong>{formatRating(hotel.rating)}</strong> · {ratingLabel(hotel.rating)}
            </span>
            <span className="modal__price">
              {formatPrice(hotel.price)} <em>/ night</em>
            </span>
          </div>

          <p className="modal__description">{hotel.description}</p>

          <button type="button" className="btn btn--primary modal__cta">
            Reserve this stay
          </button>
          <p className="modal__disclaimer">
            Demo project — reservations aren't processed.
          </p>
        </div>
      </div>
    </div>
  );
}
