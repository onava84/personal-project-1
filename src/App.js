import "./App.css";
import routes from "./routes";
import Menu from "./components/Menu/Menu";
import { updateUsername, updateUserId } from "./redux/reducer";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      dispatch(updateUsername(response.data.username));
      dispatch(updateUserId(response.data.id));
    });
  }, []);

  return (
    <div className="App">
      <Menu />
      {routes}
    </div>
  );
}

export default App;
