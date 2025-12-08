"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Box, InputLabel, TextField, TextFieldProps } from "@mui/material";
import { clamp } from "../helpers";

export const parseOrFallback = (raw: string, fallback: number) => {
  const n = parseFloat(raw);
  return Number.isNaN(n) ? fallback : n;
};

interface NumberFieldProps
  extends Omit<TextFieldProps<"outlined">, "onChange" | "variant"> {
  id: string;
  label?: string;
  value: number;
  min: number;
  max: number;
  onChange?: (v: number) => void;
}

export const NumberField: FC<NumberFieldProps> = ({
  id,
  label,
  value,
  min,
  max,
  onChange,
  ...restTextFieldProps
}) => {
  const [inputValue, setInputValue] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (inputValue.trim() === "") {
      setInputValue(String(value));
      return;
    }

    const parsed = parseOrFallback(inputValue, value);

    let clamped = clamp(parsed, min, max);

    const rounded = Number(clamped.toFixed(4));

    onChange?.(rounded);
    setInputValue(String(rounded));
  };

  const handleFocus = () => setIsFocused(true);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(String(value));
    }
  }, [value, isFocused]);

  return (
    <Box width="100%">
      {label && (
        <InputLabel htmlFor={id} sx={{ mb: 1 }}>
          {label}
        </InputLabel>
      )}
      <TextField
        id={id}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        fullWidth
        autoComplete="off"
        size="small"
        {...restTextFieldProps}
      />
    </Box>
  );
};
