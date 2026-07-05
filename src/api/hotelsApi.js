const BASE_URL = "https://demohotelsapi.pythonanywhere.com";

/**
 * Builds a query string from a params object, skipping empty/undefined values.
 */
function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, value);
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Fetches the hotel list from the API, applying optional filters, search,
 * sorting and pagination as supported by the backend.
 *
 * Supported params: location, price, min_price, max_price, rating,
 * min_rating, max_rating, search, limit, skip, order_by
 */
export async function fetchHotels(params = {}) {
  const url = `${BASE_URL}/hotels/${buildQuery(params)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Hotel API responded with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload.status !== 200) {
    throw new Error(payload.message || "Failed to fetch hotels");
  }

  return {
    hotels: payload.data ?? [],
    count: payload.count ?? 0,
    returned: payload.returned ?? 0,
  };
}

/**
 * Fetches a single hotel by its numeric id.
 */
export async function fetchHotelById(id) {
  const response = await fetch(`${BASE_URL}/hotels/${id}/`);

  if (!response.ok) {
    throw new Error(`Hotel API responded with status ${response.status}`);
  }

  const payload = await response.json();
  const hotel = Array.isArray(payload.data) ? payload.data[0] : payload.data;

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
}
