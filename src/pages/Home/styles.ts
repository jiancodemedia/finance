import { css, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => {
  return css`
    background: ${theme.palette.background.default};
  `;
});
