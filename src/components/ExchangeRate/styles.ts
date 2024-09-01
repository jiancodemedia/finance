import { css, styled } from "@mui/material";

export const Container = styled("div")(() => {
  return css`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  `;
});
