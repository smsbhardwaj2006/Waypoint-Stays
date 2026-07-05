import { formatPrice, formatRating, ratingLabel } from "../utils/formatters";
import { useFavorites } from "../context/FavoritesContext";

export default function HotelCard({ hotel, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(hotel.id);

  return (
    <article className="hotel-card">
      <button
        type="button"
        className="hotel-card__photo-btn"
        onClick={() => onOpen(hotel)}
        aria-label={`View details for ${hotel.name}`}
      >
        <img
          className="hotel-card__photo"
          src={hotel.thumbnail}
          alt={hotel.name}
          loading="lazy"
        />
        <span className="hotel-card__location">{hotel.location}</span>
      </button>

      <button
        type="button"
        className={`hotel-card__save ${saved ? "is-saved" : ""}`}
        onClick={() => toggleFavorite(hotel.id)}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved stays" : "Save this stay"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 13.8 2.9 9.4C1.1 7.8 1.2 5 3.1 3.6c1.6-1.2 3.7-.8 4.9.7C9.2 2.8 11.3 2.4 12.9 3.6c1.9 1.4 2 4.2.2 5.8L8 13.8Z"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="hotel-card__perforation" aria-hidden="true" />

      <button
        type="button"
        className="hotel-card__stub"
        onClick={() => onOpen(hotel)}
      >
        <div className="hotel-card__stub-main">
          <h3 className="hotel-card__name">{hotel.name}</h3>
          <span className="hotel-card__rating">
            <strong>{formatRating(hotel.rating)}</strong>
            <em>{ratingLabel(hotel.rating)}</em>
          </span>
        </div>
        <div className="hotel-card__stub-price">
          <span className="hotel-card__price">{formatPrice(hotel.price)}</span>
          <span className="hotel-card__price-note">per night</span>
        </div>
      </button>
    </article>
  );
}
