export default function Nav() {
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#references", label: "References" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="navbar navbar-expand py-4">
      <div className="container-fluid">
        <div className="navbar-brand">
          <a className="nav-link" href="#top">
            Aaron Sanders
          </a>
        </div>
        <ul className="navbar-nav">
          {navItems.map(({ href, label }) => (
            <li key={label} className="nav-item">
              <a className="nav-link" href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
