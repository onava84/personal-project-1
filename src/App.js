import "./App.css";
import routes from "./routes";
import Menu from "./components/Menu/Menu";
import { updateUsername, updateUserId } from "./redux/reducer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createTheme, ThemeProvider } from "@material-ui/core";

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
    fontFamily: "Helvetica",
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
          <Menu />
          {routes}
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
