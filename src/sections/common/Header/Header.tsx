import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
// import Typography from "../../../components/Typography";
import Link from "next/link";

const Header: React.FC = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Cuộn xuống
        setShow(false);
      } else if (
        currentScrollY < lastScrollY.current - 10 ||
        currentScrollY <= 0
      ) {
        // Cuộn lên một đoạn hoặc về đầu trang
        setShow(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${!show ? styles.hide : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logoBKHN.png"
            alt="HUST"
            width={47}
            height={41}
            className={styles.logoImg}
          />
        </Link>
        <nav className={styles.nav}></nav>
      </div>
    </header>
  );
};

export default Header;
