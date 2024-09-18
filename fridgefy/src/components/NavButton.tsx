import styles from "./button.module.scss";
import React, { ReactNode } from "react";
import Link from "next/link";

type NavButtonProps = {
  href: string;
  children: ReactNode;
};

const NavButton = ({ href, children }: NavButtonProps) => {
  return (
    <Link href={href}>
      <button className={styles.button}>{children}</button>
    </Link>
  );
};

export default NavButton;
