import { css, styled } from "@mui/material";

export const Container = styled("div")(() => {
  return css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    row-gap: 5px;
  `;
});
