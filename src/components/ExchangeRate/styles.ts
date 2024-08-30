import { css, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => {
  return css`
    background: ${theme.palette.background.default};

    color: red;
  `;
});

export const Input = styled("input")(
  ({ theme }) => css`
    padding: 8px;
    border: 1px solid ${theme.palette.divider};
    border-radius: 4px;
    font-size: 16px;
    color: ${theme.palette.text.primary};
    width: 12%;
  `
);
