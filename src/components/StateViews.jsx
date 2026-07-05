export function EmptyState({ onReset }) {
  return (
    <div className="state-view">
      <div className="state-view__icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="17" cy="17" r="11" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <line x1="25.5" y1="25.5" x2="35" y2="35" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
      <h3>No stays match those filters</h3>
      <p>Try widening your price range or clearing a filter or two.</p>
      <button type="button" className="btn btn--primary" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-view state-view--error">
      <div className="state-view__icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M20 4 L37 34 H3 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <line x1="20" y1="16" x2="20" y2="24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="20" cy="29" r="1.6" fill="currentColor" />
        </svg>
      </div>
      <h3>The hotel service didn't respond</h3>
      <p>{message || "Something went wrong while loading hotels."}</p>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
