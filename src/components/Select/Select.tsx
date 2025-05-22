import React from "react";
import styles from "./Select.module.scss";
import Typography from "@/components/Typography";
import { IoIosArrowDown } from "react-icons/io";

import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  options: Option[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  required,
  options,
  className,
  ...props
}) => (
  <div className={clsx(styles.selectGroup, className)}>
    {label && (
      <Typography type="title-4" className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </Typography>
    )}
    <div className={styles.selectWrapper}>
      <select className={styles.select} required={required} {...props}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === ""}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.arrow}>
        <IoIosArrowDown color="black" size={20} />
      </span>
    </div>
  </div>
);

export default Select;
