export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>Waypoint Stays — a demo booking explorer</span>
        <span>
          Data via{" "}
          <a href="https://demohotelsapi.pythonanywhere.com/" target="_blank" rel="noreferrer">
            Hotel Search API Playground
          </a>
        </span>
      </div>
    </footer>
  );
}
