import React from "react";
import "./Home.css";
// import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

const Home = (props) => {
  return (
    <div>
      <div className="above-the-fold-container">
        <div className="container">
          <div className="left-container">
            <div className="text-group">
              <h1 className="encabezado-principal toleft">
                Create your soccer tournament in 3 easy steps
              </h1>
              <h2 className="toleft margin subencabezado">
                Subencabezado de la página
              </h2>
              <Button
                style={{ alignSelf: "flex-start" }}
                sive="large"
                variant="contained"
                color="secondary"
                href="/#/register"
              >
                Sign up
              </Button>
            </div>
          </div>
          <div className="right-container"></div>
        </div>
      </div>
      <div className="segundo-bloque">
        <div className="contenido-cuadros">
          <div className="cuadro-1">
            <h2 className="subtitulo">Sign up</h2>
            <p className="texto">Open an account that is totally free</p>
            <img src="https://cdn.pixabay.com/photo/2016/03/23/12/26/football-1274661_1280.jpg" />
          </div>
          <div className="cuadro-1">
            <h2 className="subtitulo">Enter the teams name</h2>
            <p className="texto">Enter the names of the tournament teams</p>
            <img src="https://online.jwu.edu/sites/default/files/styles/article_feature_page/public/field/image/Five%20Facts%20About%20World%20Cup%20Security%20-%20JWU%20Online.jpg?itok=cZa9V63s" />
          </div>
          <div className="cuadro-1">
            <h2 className="subtitulo">Change date & time</h2>
            <p className="texto">Change the date and time of the matches</p>
            <img src="https://cdn.pixabay.com/photo/2014/10/14/20/24/football-488714__340.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
