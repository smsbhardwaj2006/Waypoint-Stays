import { useEffect, useState } from "react";
import { CITIES, SORT_OPTIONS } from "../utils/formatters";

/**
 * Debounces the free-text search input locally so we don't fire a network
 * request on every keystroke, then reports up via onChange.
 */
export default function FiltersBar({ filters, onChange, onReset }) {
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchDraft !== filters.search) {
        onChange({ search: searchDraft });
      }
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const hasActiveFilters =
    filters.search || filters.location || filters.minPrice || filters.maxPrice || filters.minRating;

  return (
    <section className="filters" aria-label="Search and filter hotels">
      <div className="filters__row filters__row--search">
        <label className="filters__search" htmlFor="hotel-search">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="12.3" y1="12.3" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            id="hotel-search"
            type="text"
            placeholder="Search by hotel name or city…"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
          />
        </label>

        <select
          className="filters__select"
          aria-label="Filter by city"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        >
          <option value="">All cities</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          className="filters__select"
          aria-label="Sort results"
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value })}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__row filters__row--range">
        <div className="filters__field">
          <span>Min price (₹)</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="1000"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
          />
        </div>
        <div className="filters__field">
          <span>Max price (₹)</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="10000"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
          />
        </div>
        <div className="filters__field">
          <span>Minimum rating</span>
          <select
            value={filters.minRating}
            onChange={(e) => onChange({ minRating: e.target.value })}
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5 &amp; up</option>
            <option value="4">4.0 &amp; up</option>
            <option value="3.5">3.5 &amp; up</option>
            <option value="3">3.0 &amp; up</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button type="button" className="filters__clear" onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
