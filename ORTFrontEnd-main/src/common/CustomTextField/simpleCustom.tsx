import React from "react";

interface CustomTextFieldProps {
  name: string;
  id: string;
  type: string;
  autoComplete: boolean | string;
  label: string;
  fullWidth: boolean;
  value: any;
  error: any;
  helperText: string | undefined | any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const SimpleCustomTextField = ({
  name,
  label,
  value,
  type,
  id,
  autoComplete,
  fullWidth,
  error,
  helperText,
  onChange,
  onBlur,
}: CustomTextFieldProps) => {
  return (
    <div className={`custom-text-field ${fullWidth ? "full-width" : ""}`}>
      <label htmlFor={id ?? name}>{label}</label>
      <input
        id={id ?? name}
        name={name}
        type={type}
        autoComplete={autoComplete ? "on" : "off"}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={error ? "error" : ""}
      />
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
};

export default SimpleCustomTextField;
