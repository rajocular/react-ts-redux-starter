import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

interface TextFieldProps {
  variant?: any;
  label?: string;
  type?: 'string' | 'password' | 'number';
  className?: string;
  value: any;
  fieldName: string;
  helperText?: string;
  isRequired?: boolean;
  handleChange: Function;
}

const TextField: React.FC<TextFieldProps> = ({
  variant,
  label,
  type,
  className,
  value,
  fieldName,
  helperText,
  isRequired,
  handleChange
}) => (
  <MuiTextField
    variant={variant || 'standard'}
    label={label}
    type={type || 'string'}
    value={value}
    error={!!helperText}
    helperText={helperText}
    classes={{ root: className || null }}
    required={isRequired || false}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(fieldName, e.target.value)}
  />
);

export default TextField;
