import { Link } from "preact-router/match";
import rstudioLogo from "../../assets/RStudio-Logo.svg";
import shinyLogo from "../../assets/Shiny-Logo.png";
import classes from "./style.module.css";

export function TheHeader() {
  return (
    <header className={classes.header}>
      <div>
        <Link href="/">
          <h1>Shiny Visual Editor</h1>
        </Link>
        <div class={classes.logos}>
          <img src={rstudioLogo} alt="RStudio Logo" />
          <img
            src={shinyLogo}
            style="background-color: var(--rstudio-blue)"
            alt="Shiny Logo"
          />
        </div>
      </div>
      <div class={classes.links}>
        <Link activeClassName={classes.active} href="/">
          Gallery
        </Link>
        <Link activeClassName={classes.active} href="/edit">
          Layout Editor
        </Link>
        <Link activeClassName={classes.active} href="/about">
          About
        </Link>
      </div>
    </header>
  );
}
