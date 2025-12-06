import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1aa964",
    },
    secondary: {
      main: "#f97316",
    },
    background: {
      default: "#323738",
      paper: "#3a4142",
    },
    text: {
      primary: "#000",
      secondary: "#b3bec1",
    },
    divider: "#242221",
  },
  typography: {
    button: {
      fontWeight: 700,
    },
    caption: {
      fontSize: 16,
      fontWeight: 600,
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          height: 40,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          background: "#323738",
          "&.Mui-disabled": {
            input: {
              WebkitTextFillColor: "#fff",
            },
            opacity: 0.6,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundImage: "linear-gradient(90deg, #24ee89, #9fe871)",
          boxShadow: "0 0 12px #23ee884d, 0 -2px #1dca6a inset",
          color: "#000",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 30,
          [theme.breakpoints.down("md")]: {
            height: 12,
          },
        }),
        rail: {
          opacity: 0,
        },
        track: {
          opacity: 0,
        },
        thumb: {
          width: 30,
          height: 32,
          borderRadius: 8,
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          backgroundImage: "url(/slider_button.webp)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
        },
      },
    },
  },
});

export default theme;
