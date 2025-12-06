import { createSvgIcon } from "@mui/material";

export const BelowIcon = createSvgIcon(
  <svg
    role="img"
    aria-hidden="true"
    width="32"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.5"
      y="15.0007"
      width="28"
      height="4"
      rx="2"
      fill="white"
      fillOpacity="0.2"
    ></rect>
    <rect
      x="2.5"
      y="15.0007"
      width="14"
      height="4"
      rx="2"
      fill="#B3BEC1"
    ></rect>
    <circle cx="16.5" cy="17.0007" r="4" fill="#B3BEC1"></circle>
  </svg>,
  "Below"
);

export const AboveIcon = createSvgIcon(
  <svg
    role="img"
    aria-hidden="true"
    width="32"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="28"
      height="4"
      rx="2"
      transform="matrix(-1 0 0 1 30.5 15.0007)"
      fill="white"
      fillOpacity="0.2"
    ></rect>
    <rect
      width="14"
      height="4"
      rx="2"
      transform="matrix(-1 0 0 1 30.5 15.0007)"
      fill="#B3BEC1"
    ></rect>
    <circle
      cx="4"
      cy="4"
      r="4"
      transform="matrix(-1 0 0 1 20.5 13.0007)"
      fill="#B3BEC1"
    ></circle>
  </svg>,
  "Above"
);

export const InsideIcon = createSvgIcon(
  <svg
    role="img"
    aria-hidden="true"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.5"
      y="15.0007"
      width="28"
      height="4"
      rx="2"
      fill="white"
      fillOpacity="0.2"
    ></rect>
    <rect
      x="8.5"
      y="15.0007"
      width="16"
      height="4"
      rx="2"
      fill="#B3BEC1"
    ></rect>
    <circle cx="9.5" cy="17.0007" r="4" fill="#B3BEC1"></circle>
    <circle cx="23.5" cy="17.0007" r="4" fill="#B3BEC1"></circle>
  </svg>,
  "Inside"
);

export const OutsideIcon = createSvgIcon(
  <svg
    role="img"
    aria-hidden="true"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.75 17.0008C2.75 15.8962 3.64543 15.0008 4.75 15.0008H8.75C9.85457 15.0008 10.75 15.8962 10.75 17.0008C10.75 18.1053 9.85457 19.0008 8.75 19.0008H4.75C3.64543 19.0008 2.75 18.1053 2.75 17.0008Z"
      fill="#B3BEC1"
    ></path>
    <path
      d="M22.75 17.0008C22.75 15.8962 23.6454 15.0008 24.75 15.0008H28.75C29.8546 15.0008 30.75 15.8962 30.75 17.0008C30.75 18.1053 29.8546 19.0008 28.75 19.0008H24.75C23.6454 19.0008 22.75 18.1053 22.75 17.0008Z"
      fill="#B3BEC1"
    ></path>
    <path
      d="M8.75 17.0008C8.75 15.8962 9.64543 15.0008 10.75 15.0008H22.75C23.8546 15.0008 24.75 15.8962 24.75 17.0008C24.75 18.1053 23.8546 19.0008 22.75 19.0008H10.75C9.64543 19.0008 8.75 18.1053 8.75 17.0008Z"
      fill="white"
      fillOpacity="0.2"
    ></path>
    <circle cx="9.75" cy="17.0008" r="4" fill="#B3BEC1"></circle>
    <circle cx="23.75" cy="17.0008" r="4" fill="#B3BEC1"></circle>
  </svg>,
  "Outside"
);
