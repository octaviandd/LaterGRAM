/** @format */

import { css, CSSObject } from "styled-components";

export const breakpoints = (
  cssProp = "padding",
  cssPropUnits = "px",
  values = [],
  mediaQueryType = "max-width"
) => {
  //   const breakpointProps = values.reduce((mediaQueries, value) => {
  //     const [screenBreakpoint, cssPropBreakPoint] = [
  //       Object.keys(value)[0],
  //       Object.values(value)[0],
  //     ];
  //     return (mediaQueries += `
  //             @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
  //                 ${cssProp}: ${cssPropBreakPoint}${cssPropUnits};
  //             }
  //         `);
  //   }, "");
  //   return css([breakpointProps]);
};
