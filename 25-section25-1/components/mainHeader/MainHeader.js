import Link from "next/link";
import Image from "next/image";
import classes from "./main-header.module.css";
import logoImage from "@/assets/logo.png";
import MainHeaderBackground from "./MainHeaderBacjground";
import NavLink from "../navLink/NavLink";
export default function MainHeader() {
  return (
    <header className={classes.header}>
      <MainHeaderBackground />
      <Link className={classes.logo} href="/">
        <Image src={logoImage} alt="a plate with food on it" priority />
        NextLevel food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Explore meals</NavLink>
          </li>

          <li>
            <NavLink href="/community">join our community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
