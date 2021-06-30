import "./App.css";
import routes from "./routes";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      {routes}
    </div>
  );
}

export default App;
