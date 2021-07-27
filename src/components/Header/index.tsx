import { Link } from "preact-router/match";
import rstudioLogo from "../../assets/RStudio-Logo.svg";
import shinyLogo from "../../assets/Shiny-Logo.png";
import classes from "./style.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <h1>Shiny Visual Editor</h1>
      </Link>
      <div className={classes.logos}>
        <img src={rstudioLogo} alt="RStudio Logo" />
        <img
          src={shinyLogo}
          style="background-color: var(--rstudio-blue)"
          alt="Shiny Logo"
        />
      </div>
      <div class={classes.links}>
        <Link activeClassName="active" href="/">
          Gallery
        </Link>
        <Link activeClassName="active" href="/edit">
          Layout Editor
        </Link>
        <Link activeClassName="active" href="/about">
          About
        </Link>
      </div>
    </header>
  );
}
export default Header;
