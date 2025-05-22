import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  className = "",
  bgColor,
  textColor,
  iconPosition = "left",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles["custom-btn"]} ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <span className={styles["custom-btn__icon"]}>{icon}</span>
      )}
      <span className={styles["custom-btn__text"]}>{text}</span>
      {icon && iconPosition === "right" && (
        <span className={styles["custom-btn__icon"]}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
