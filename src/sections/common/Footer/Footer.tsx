import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Typography from "@/components/Typography";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Image
          src="/images/logo-header.svg"
          alt="TA86"
          width={117}
          height={172}
        />
        <Typography type="body-3" className={styles.copyright}>
          © 2025
        </Typography>
      </div>
      <div className={styles.right}>
        <div className={styles.contactTitle}>Liên hệ</div>
        <div className={styles.contactList}>
          <div className={styles.boxContact}>
            <div className={styles.contactItem}>
              <span className={styles.icon}>
                <FaLocationDot />
              </span>
              <Typography type="body-3">
                Cơ sở 1: Tầng 3, Showtime D12 Giảng Võ, Quận Ba Đình, Vietnam
              </Typography>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>
                <FaPhoneAlt />
              </span>
              <Typography type="body-3">0902063898</Typography>
            </div>
          </div>
          <div className={styles.boxContact}>
            <div className={styles.contactItem}>
              <span className={styles.icon}>
                <FaLocationDot />
              </span>
              <Typography type="body-3">
                Cơ sở 2: Tầng 3, Showtime D12 Giảng Võ, Quận Ba Đình, Vietnam
              </Typography>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>
                <FaPhoneAlt />
              </span>
              <Typography type="body-3">0902063898</Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
