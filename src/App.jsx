import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FiltersBar from "./components/FiltersBar";
import HotelGrid from "./components/HotelGrid";
import SkeletonGrid from "./components/SkeletonGrid";
import Pagination from "./components/Pagination";
import HotelModal from "./components/HotelModal";
import Footer from "./components/Footer";
import { EmptyState, ErrorState } from "./components/StateViews";
import { useHotels } from "./hooks/useHotels";
import { useFavorites } from "./context/FavoritesContext";

export default function App() {
  const {
    hotels,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    totalPages,
    totalCount,
    status,
    errorMessage,
    retry,
  } = useHotels();

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [view, setView] = useState("browse"); // "browse" | "favorites"
  const { favoriteIds } = useFavorites();

  const isFiltered = Boolean(
    filters.search || filters.location || filters.minPrice || filters.maxPrice || filters.minRating
  );

  const favoritedHotels = useMemo(
    () => hotels.filter((h) => favoriteIds.has(h.id)),
    [hotels, favoriteIds]
  );

  const showingFavoritesOnly = view === "favorites";
  const visibleHotels = showingFavoritesOnly ? favoritedHotels : hotels;

  return (
    <div className="app">
      <Navbar onShowFavorites={(fav) => setView(fav ? "favorites" : "browse")} view={view} />

      <main className="app__main">
        <Hero
          resultCount={showingFavoritesOnly ? favoriteIds.size : totalCount}
          isFiltered={isFiltered && !showingFavoritesOnly}
        />

        {!showingFavoritesOnly && (
          <FiltersBar filters={filters} onChange={updateFilters} onReset={resetFilters} />
        )}

        <section className="results">
          {showingFavoritesOnly && (
            <div className="results__banner">
              <h2>Your saved stays</h2>
              <button type="button" className="filters__clear" onClick={() => setView("browse")}>
                Back to browsing
              </button>
            </div>
          )}

          {status === "loading" && <SkeletonGrid />}

          {status === "error" && !showingFavoritesOnly && (
            <ErrorState message={errorMessage} onRetry={retry} />
          )}

          {status === "success" && visibleHotels.length === 0 && (
            showingFavoritesOnly ? (
              <div className="state-view">
                <h3>No saved stays yet</h3>
                <p>Tap the heart on any hotel card to keep it here.</p>
              </div>
            ) : (
              <EmptyState onReset={resetFilters} />
            )
          )}

          {status === "success" && visibleHotels.length > 0 && (
            <HotelGrid hotels={visibleHotels} onOpen={setSelectedHotel} />
          )}

          {!showingFavoritesOnly && status === "success" && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </section>
      </main>

      <Footer />

      {selectedHotel && (
        <HotelModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  );
}
