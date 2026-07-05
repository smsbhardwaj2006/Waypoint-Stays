import { useCallback, useEffect, useRef, useState } from "react";
import { fetchHotels } from "../api/hotelsApi";

const PAGE_SIZE = 12;

const DEFAULT_FILTERS = {
  search: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  sortBy: "-rating",
};

/**
 * Owns all state related to browsing hotels: the active filters, the current
 * page, and the async request lifecycle (loading / error / data).
 */
export function useHotels() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [errorMessage, setErrorMessage] = useState("");

  const requestId = useRef(0);

  const load = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setStatus("loading");
    setErrorMessage("");

    try {
      const { hotels: results, count } = await fetchHotels({
        search: filters.search || undefined,
        location: filters.location || undefined,
        min_price: filters.minPrice || undefined,
        max_price: filters.maxPrice || undefined,
        min_rating: filters.minRating || undefined,
        order_by: filters.sortBy || undefined,
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      });

      // Ignore stale responses if a newer request has since been fired.
      if (currentRequest !== requestId.current) return;

      setHotels(results);
      setTotalCount(count);
      setStatus("success");
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      setErrorMessage(err.message || "Something went wrong while loading hotels.");
      setStatus("error");
    }
  }, [filters, page]);

  useEffect(() => {
    load();
  }, [load]);

  const updateFilters = useCallback((partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    hotels,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    totalPages,
    totalCount,
    pageSize: PAGE_SIZE,
    status,
    errorMessage,
    retry: load,
  };
}
