import HotelCard from "./HotelCard";

export default function HotelGrid({ hotels, onOpen }) {
  return (
    <div className="hotel-grid" role="list">
      {hotels.map((hotel) => (
        <div role="listitem" key={hotel.id}>
          <HotelCard hotel={hotel} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}
