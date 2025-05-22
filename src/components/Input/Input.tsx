import React from "react";
import styles from "./Input.module.scss";
import Typography from "@/components/Typography";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  required,
  className,
  ...props
}) => (
  <div className={clsx(styles.inputGroup, className)}>
    {label && (
      <Typography type="title-4" className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </Typography>
    )}
    <input className={styles.input} required={required} {...props} />
  </div>
);

export default Input;
