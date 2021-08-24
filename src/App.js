import "./App.css";
import routes from "./routes";
import MainMenu from "./components/Menu/Menu";
import { updateUsername, updateUserId } from "./redux/reducer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createTheme, ThemeProvider } from "@material-ui/core";
import SimpleMenu from "./components/NavBar/NavBar";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DC4141",
    },
    secondary: {
      main: "#294b7a",
    },
  },
  typography: {
    fontFamily: "Helvetica, Sans-Serif",
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      dispatch(updateUsername(response.data.username));
      dispatch(updateUserId(response.data.id));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          {/* <MainMenu /> */}
          <SimpleMenu />
          {routes}
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
