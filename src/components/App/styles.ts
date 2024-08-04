import { css, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => {
  return css`
    background: ${theme.palette.background.default};

    nav {
      height: 50px;
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
      }

      li {
        float: left;
      }

      li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      li a:hover:not(.active) {
        background-color: #111;
      }

      .active {
        background-color: #04aa6d;
      }
    }

    .outlet {
      padding: 5px;
      height: calc(100% - 110px);
      display: flex;
      flex-flow: column;
    }
  `;
});
