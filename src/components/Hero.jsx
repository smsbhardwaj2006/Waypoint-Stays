export default function Hero({ resultCount, isFiltered }) {
  return (
    <section className="hero">
      <div className="hero__ticket">
        <div className="hero__stub">
          <span className="hero__eyebrow">Departures &middot; All of India</span>
          <h1 className="hero__title">
            Find your next stay, <em>not</em> just a room.
          </h1>
          <p className="hero__copy">
            500 hand-modeled listings across twelve cities — search by name,
            filter by budget and rating, and sort the way you like. No
            surprises at checkout, just the stay that fits.
          </p>
        </div>
        <div className="hero__perforation" aria-hidden="true" />
        <div className="hero__counter">
          <span className="hero__counter-value">
            {resultCount.toLocaleString("en-IN")}
          </span>
          <span className="hero__counter-label">
            {isFiltered ? "matching stays" : "stays on file"}
          </span>
        </div>
      </div>
    </section>
  );
}
