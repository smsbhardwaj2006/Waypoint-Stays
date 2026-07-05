export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__nav"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Prev
      </button>

      <ul className="pagination__list">
        {pages.map((entry, idx) =>
          entry === "…" ? (
            <li key={`ellipsis-${idx}`} className="pagination__ellipsis">
              …
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                className={`pagination__page ${entry === page ? "is-active" : ""}`}
                aria-current={entry === page ? "page" : undefined}
                onClick={() => onPageChange(entry)}
              >
                {entry}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__nav"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
}

function getPageWindow(page, totalPages, span = 1) {
  const pages = new Set([1, totalPages, page]);
  for (let i = 1; i <= span; i++) {
    if (page - i >= 1) pages.add(page - i);
    if (page + i <= totalPages) pages.add(page + i);
  }
  const sorted = [...pages].sort((a, b) => a - b);

  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}
