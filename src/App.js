import { React, useState, useEffect } from "react";
import { Link, Switch, Route, useHistory, useLocation, useParams } from "react-router-dom";
import './App.css';


function App() {

  let history = useHistory();
  let params = useParams();

  function sayHi(){
    console.log("Hola!");
  }

  let props = {
      title: "Hola, soy un botón que imprime Hola! en la consola",
      onClick: sayHi
  }

  return(
    <div className="App">

      <div>
        <h1>Entregable 2</h1>
        <br/>
        <br/>
      </div>

      <div>
        <h2> Hooks & Spread Notation</h2>
        <p>
          Al seleccionar *Crear Botón* se hace el render de un
          componente botón cuyos parámetros fueron pasados utilizando
          spread notation
        </p>
        <Link to="/button">Crear Botón</Link>
        <br/>
        <br/>
        <Switch>
          <Route exact path="/button">
            <Button {...props}/>
          </Route>
        </Switch>
        <p>
          Al seleccionar *Crear Timer* se hace el render de un componente de reloj
          implementado utilizando useEffect().
        </p>
        <Link to="/timer">Crear Timer</Link>
        <br/>
        <br/>
        <Switch>
          <Route exact path="/timer">
            <Timer/>
          </Route>
        </Switch>
      </div>


      <div>
        <h2>useHistory() Demo</h2>
        <p>
          Puede utilizar los botones *Ir hacia adelante* e *Ir hacia atrás* para
          navegar a través de la cola de páginas cargadas.
        </p>
        <button onClick={history.goBack}>
          Ir hacia atrás
        </button>
        <button onClick={history.goForward}>
          Ir hacia adelante
        </button>
      </div>

      <div>
        <h2> useParams() Demo </h2>
        <p>
          Si selecciona *Nombre como parámetro* podrá observar que el parametro
           pasado al componente rendereado es "Octavio"
        </p>
        <Link to="/params/Octavio"> Nombre como parámetro </Link>
        <br/>
        <br/>
        <p>
          Si selecciona *Nombre y edad como parámetro* podrá observar que los
          parámetros pasados al componente rendereado son "Octavio" y "23"
        </p>
        <Link to="/params/Octavio/23"> Nombre y edad como parámetro </Link>
        <br/>
        <br/>
        <Switch>
         <Route exact path="/params/:name/">
           <Params/>
         </Route>
         <Route exact path="/params/:name/:age/">
           <Params/>
         </Route>
        </Switch>
      </div>

    </div>
  );
}

function Button(props){
  const {title, onClick} = props;
  return(
    <button onClick={onClick}>
      {title}
    </button>
  );
}

function Timer(){

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if(seconds == 59){
        setMinutes(minutes + 1);
        setSeconds(0)
      }
      else if(minutes > 59){
        setHours(hours + 1);
        setMinutes(0)
      }
      else{
        setSeconds(seconds + 1);
      }
    },1000);

    return () => clearInterval(interval);
  });


  return (
    <div>
      <p>{hours}:{minutes}:{seconds}</p>
    </div>
  );
}

function Params(){
  const params = useParams();
  return (
      <p>params: {JSON.stringify(params)}</p>
  );
};

export default App;
