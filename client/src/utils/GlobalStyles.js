/** @format */

const sizes = {
  xsm: "320px",
  sm: "450px",
  md: "876px",
};

const device = {
  xs: `@media (max-width: ${sizes.xsm})`,
  sm: `@media (max-width: ${sizes.sm})`,
  md: `@media (max-width: ${sizes.md})`,
};

export default device;
