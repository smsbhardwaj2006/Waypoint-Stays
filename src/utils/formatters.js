const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return rupeeFormatter.format(num);
}

export function formatRating(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toFixed(1);
}

export function ratingLabel(value) {
  const num = Number(value);
  if (num >= 4.5) return "Exceptional";
  if (num >= 4.0) return "Excellent";
  if (num >= 3.5) return "Very good";
  if (num >= 3.0) return "Good";
  return "Fair";
}

export const CITIES = [
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Goa",
  "Gurgaon",
  "Hyderabad",
  "Jaipur",
  "Kolkata",
  "Mumbai",
  "Noida",
  "Pune",
];

export const SORT_OPTIONS = [
  { value: "-rating", label: "Rating: high to low" },
  { value: "rating", label: "Rating: low to high" },
  { value: "price", label: "Price: low to high" },
  { value: "-price", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];
