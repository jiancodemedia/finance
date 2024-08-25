import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC } from "react";

type Prop = {
  value: string;
  options: readonly string[];
  onChange(value: string): void;
};

export const ToggleButtons: FC<Prop> = ({ value, options, onChange }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      aria-label="text alignment"
      onChange={(event, value) => onChange(value)}
    >
      {options.map((option) => {
        return (
          <ToggleButton key={option} value={option}>
            {option}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};
