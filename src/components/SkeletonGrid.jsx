export default function SkeletonGrid({ count = 8 }) {
  return (
    <div className="hotel-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="hotel-card hotel-card--skeleton" key={i}>
          <div className="skeleton skeleton--photo" />
          <div className="hotel-card__perforation" />
          <div className="hotel-card__stub">
            <div className="hotel-card__stub-main">
              <div className="skeleton skeleton--line" style={{ width: "70%" }} />
              <div className="skeleton skeleton--line" style={{ width: "40%" }} />
            </div>
            <div className="skeleton skeleton--line" style={{ width: "50px" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
