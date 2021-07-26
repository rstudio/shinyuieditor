import { html } from "htm/preact";
import { Link } from "preact-router/match";
import rstudioLogo from "../../assets/RStudio-Logo.svg";
import shinyLogo from "../../assets/Shiny-Logo.png";
import "./style.css";

function Header() {
  return html`
    <header class="header">
     <${Link} href="/"><h1>Shiny Visual Editor</h1></${Link}>
      <div class="logos">
        <img src=${rstudioLogo} alt="RStudio Logo" />
        <img
          src=${shinyLogo}
          style="background-color: var(--rstudio-blue)"
          alt="Shiny Logo"
        />
      </div>
      <div class="links">
        <${Link} activeClassName="active" href="/">Gallery</${Link}>
        <${Link} activeClassName="active" href="/about">About</${Link}>
      </div>
    </header>
  `;
}
export default Header;
