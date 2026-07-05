import { useFavorites } from "../context/FavoritesContext";

export default function Navbar({ onShowFavorites, view }) {
  const { favoriteIds } = useFavorites();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <path
                d="M16 2 L29 10 V29 H20 V19 H12 V29 H3 V10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="navbar__title">
            Waypoint <em>Stays</em>
          </span>
        </div>

        <nav className="navbar__actions" aria-label="Primary">
          <button
            type="button"
            className={`navbar__link ${view === "browse" ? "is-active" : ""}`}
            onClick={() => onShowFavorites(false)}
          >
            Browse
          </button>
          <button
            type="button"
            className={`navbar__link navbar__link--tag ${
              view === "favorites" ? "is-active" : ""
            }`}
            onClick={() => onShowFavorites(true)}
          >
            Saved
            <span className="navbar__badge">{favoriteIds.size}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
