import { css, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => {
  return css`
    margin: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  `;
});
