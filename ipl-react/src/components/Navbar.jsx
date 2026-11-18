
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        IPL <span>2026</span>
      </h2>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#matches">Matches</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#guidelines">Guidelines</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
