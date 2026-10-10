import Link from "next/link";
import GammaLogo from "./logos/gamma";
import KarweiLogo from "./logos/karwei";

// Both logos render, CSS shows the one for the active theme, so there is no flash on load.
// The hidden logo is display: none, so the link reads as "Gamma, naar de homepage" or "Karwei, ...".
const Logo = () => {
  return (
    <Link
      href="/"
      className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <span className="karwei:hidden">
        <GammaLogo />
      </span>
      <span className="gamma:hidden">
        <KarweiLogo />
      </span>
      <span className="sr-only">, naar de homepage</span>
    </Link>
  );
};

export default Logo;
