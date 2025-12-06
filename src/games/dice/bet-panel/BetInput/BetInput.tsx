"use client";

import { FC } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  InputLabel,
  TextFieldProps,
  Typography,
} from "@mui/material";

import { QuickAmountPresets } from "../QuickAmountPresets";
import { QuickKoefficient } from "../../types";
import { NumberField } from "../../NumberField";

interface BetInputProps
  extends Omit<TextFieldProps<"outlined">, "onChange" | "variant" | "error"> {
  value: number;
  label: string;
  id: string;
  error?: string | null;
  approxAmount?: number;
  quickAmounts?: number[];
  quickCoefficients?: readonly QuickKoefficient[];
  onChange?: (value: number) => void;
  onSelectKoefficient?: (id: string) => void;
}

export const BetInput: FC<BetInputProps> = ({
  value,
  label,
  id,
  error,
  approxAmount,
  quickAmounts,
  quickCoefficients,
  onChange,
  onSelectKoefficient,
  slotProps,
  ...restTextFieldProps
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {typeof approxAmount === "number" && (
          <Typography color="text.secondary">≈{approxAmount} EUR</Typography>
        )}
      </Box>
      <NumberField
        id={id}
        value={value}
        onChange={onChange}
        min={0}
        max={approxAmount || 0}
        slotProps={{
          input: {
            endAdornment: quickCoefficients ? (
              <InputAdornment position="end">
                <ButtonGroup size="small">
                  {quickCoefficients.map(({ label, id }) => (
                    <Button onClick={() => onSelectKoefficient?.(id)}>
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              </InputAdornment>
            ) : null,
          },
          ...slotProps,
        }}
        {...restTextFieldProps}
      />
      {quickAmounts && onChange && (
        <QuickAmountPresets
          presets={quickAmounts}
          onSelect={onChange}
          sx={{ mt: 1 }}
        />
      )}
      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
