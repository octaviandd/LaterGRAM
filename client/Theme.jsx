/** @format */

import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    buttonPrimary: "#4395FD",
    textPrimary: "#4395FD",
    backgroundColor: "#fff",
    textDefault: "#363636",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
