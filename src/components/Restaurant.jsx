import React, { useState, useCallback, useEffect } from 'react';
import Mesa from "./Mesa";
import Pedido from "./Pedido";
import Celda from "./Celda";
import CeldaMarco from "./CeldaMarco";
import Menu from "./Menu";
import Jugar from "./Jugar";
import correrApi from "../api/token";
import iniciarJuego from "../api/iniciarJuego";
import accion from "../api/accion";
import getShips from "../api/getShips";
import pruebaAccion from "../api/pruebaAccion";

function Restaurant() {


  const [fijarBarco, setFijarBarco] = useState(false); 
  const [cantidadPorBarco, setCantidadPorBarco] = useState([0, 0, 0, 0]); // para ir guardando cuantos ya van asignados de cada tipo de barco
  const [asignacionCasillas, setAsignacionCasillas] = useState(new Array(100).fill("",0,100))
  const [casillasValidas, setCasillasValidas] = useState(new Array(100).fill(false,0,100))
  const [inicioJugada, setInicioJugada] = useState(new Array(100).fill(false,0,100)) //para indicar si en una jugada una casilla esta siendo marcada como inicio
  const [jugando, setJugando] = useState(false);
  const [jugada, setJugada] = useState(""); // puede ser vacio, mover o disparar
  const [seleccionarInicio, setSeleccionarInicio] = useState(false); // para saber que ya se selecciono la primera celda (ahora ver a dd se ataca/mueve)
  const [nuevoBarco, setNuevoBarco] = useState(false); // el identificador del nuevo barco que quizas se mueve
  const [aMover, setAMover] = useState(200); // id de la celda que quizas pierda a su barco
  const [hundido, sethundido] = useState(new Array(100).fill(false,0,100)) //para indicar si en una jugada una casilla esta siendo marcada como inicio
  const [mensajes, setMensajes] = useState([]);
  const [token, setToken] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [jugadaOponente, setJugadaOponente] = useState("");
  const [turno, setTurno] = useState(false);
  const [events, setEvents] = useState([]);
  const [fin, setFin] = useState(false); // 1 si gano yo, 2 si gana el computador
  const [esperandoIniciar, setEsperandoIniciar] = useState(true);
  const [posiciones, setPosiciones] = useState([])
  const [accionAux, setAccionAux] = useState(0); //1 para Mover, 2 para disparar



  if (!token){
    correrApi().then(resp => {setToken(resp.token); iniciarJuego(resp.token).then(resp => setGameId(resp.gameId))})
    //despues el setgameid tirarlo en un boton de iniciar juego
  }
  //console.log(posiciones, "asd")

  function creaMarcoSup() {
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var celdas = [<CeldaMarco key={0} marca={""} limite={true}/>];
    for (var i = 0; i < 10; i++) {
    celdas.push(<CeldaMarco key={i} marca={letras[i]} limite={true}/>)
    }
    return celdas;
  }

  function creaCeldas() {
    var celdas = [];
    var aux_columna = 0;
    var aux_fila = 1;
    var contador_aux = 0;
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (var i = 0; i < 100; i++) {
      celdas.push(<Celda key={i} id={i} limite={false} jugada={jugada} jugando={jugando} 
        seleccionarInicio={seleccionarInicio} inicioJugada={inicioJugada[i]} asignacion={asignacionCasillas[i]} 
        marca={`(${letras[aux_columna]},${aux_fila})`} fijarBarco={fijarBarco} 
        notificarBarcoAsignado={notificarBarcoAsignado} 
        seleccionarCasillaJugadaInicio={seleccionarCasillaJugadaInicio} nuevoBarco={nuevoBarco} desde={aMover}
        muevoFin={muevoFin} hundido={hundido[i]} disparo={disparo} valida={casillasValidas[i]}/>);
      aux_columna = aux_columna + 1;
      contador_aux = contador_aux + 1;
      if (contador_aux == 10) {
        contador_aux = 0;
        aux_fila = aux_fila + 1;
        aux_columna = 0;
      }
    }
    return celdas;
  }
  
  var celdas = creaCeldas();

  // funcion que se utiliza en menu para recibir la señal de que se esta seleccionando un barco
  function asignarBarcoMenu(identificador, tipo) {
    setFijarBarco(identificador);
  }

  // funcion para que cada celda avise cuando ya se asigno para proceder a descontar la cantidad 
  //de barcos en el menu
  function notificarBarcoAsignado(tipo, idCelda, identificador){
    if (tipo === "fragata" && cantidadPorBarco[0] === 4) {
      alert(`Ya asignaste las 4 fragatas que tenías disponible`)
    } else if (tipo === "crucero" && cantidadPorBarco[1] === 3) {
      alert(`Ya asignaste los 3 cruceros que tenías disponible`)
    } else if (tipo === "destructor" && cantidadPorBarco[2] === 2) {
      alert(`Ya asignaste los 2 destructores que tenías disponible`)
    } else if (tipo === "portaviones" && cantidadPorBarco[3] === 1) {
      alert(`Ya asignaste el portaviones que tenías disponible`)
    } else {
      var aux_asignacion_celda = [...asignacionCasillas]
      aux_asignacion_celda[idCelda] = identificador;
      setAsignacionCasillas(aux_asignacion_celda);

      setFijarBarco(false);
      if (tipo === "fragata"){
        var aux_cantidad_barcos = [...cantidadPorBarco];
        aux_cantidad_barcos[0] = aux_cantidad_barcos[0] + 1;
        setCantidadPorBarco(aux_cantidad_barcos);
      } else if (tipo === "crucero") {
        var aux_cantidad_barcos = [...cantidadPorBarco];
        aux_cantidad_barcos[1] = aux_cantidad_barcos[1] + 1;
        setCantidadPorBarco(aux_cantidad_barcos);
      } else if (tipo === "destructor") {
        var aux_cantidad_barcos = [...cantidadPorBarco];
        aux_cantidad_barcos[2] = aux_cantidad_barcos[2] + 1;
        setCantidadPorBarco(aux_cantidad_barcos);
      } else if (tipo === "portaviones") {
        var aux_cantidad_barcos = [...cantidadPorBarco];
        aux_cantidad_barcos[3] = aux_cantidad_barcos[3] + 1;
        setCantidadPorBarco(aux_cantidad_barcos);
      }
  }
  }

  function reiniciarMenu() {
    var aux_asignacion_celda = [...asignacionCasillas]
    for (var i = 0; i < 100; i++) {
      aux_asignacion_celda[i] = "";
    }
    setAsignacionCasillas(aux_asignacion_celda);
    setCantidadPorBarco([0, 0, 0, 0]);
    setFijarBarco(false);
  }

  // funcion que se ejecuta en Jugar para saber que esta queriendo realizar una jugada
  // asi ahora se puede ir a revisar la celda con la que se quiere jugar
  function comenzarJugada(jugada) {
    if (jugada === "cancelar"){
      setJugada("");
      setSeleccionarInicio(false);
      setAMover(200);
      setNuevoBarco(false);
      setInicioJugada(new Array(100).fill(false,0,100));
      setAccionAux(0);
      setCasillasValidas(new Array(100).fill(false,0,100));

    } else {
      if (jugada === "mover") {
        setAccionAux(1);
      } else if (jugada === "disparar") {
        setAccionAux(2);
      }
      setJugada(jugada);
      setJugando(true);
      setTurno(1);
      setEsperandoIniciar(false);
      var aux = []
      getShips(token, gameId).then(resp => {for (var i =0; i < 10; i++) {aux.push([resp[i] ? resp[i].position.row : "-", resp[i] ? resp[i].position.column : "-"])}})
      setPosiciones(aux)
    }
  }



  function seleccionarCasillaJugadaInicio(idCelda, identificador, celdasValidasMov, celdasValidasDis) {
    setSeleccionarInicio(true);
    setAMover(idCelda);
    setNuevoBarco(identificador);
    var aux_inicio_jugada = [...inicioJugada]
    aux_inicio_jugada[idCelda] = true;
    setInicioJugada(aux_inicio_jugada);
    var aux_validas = [...casillasValidas]
    if (jugada === "mover"){
      for (var i = 0; i < celdasValidasMov.length; i++){
        aux_validas[celdasValidasMov[i]] = true;
      }
    } else if (jugada === "disparar") {
      for (var i = 0; i < celdasValidasDis.length; i++){
        aux_validas[celdasValidasDis[i]] = true;
      }
    }
    setCasillasValidas(aux_validas);
  }

  // funcion para usar en Celda que mueve lo de una celda hacia esta otra
  function muevoFin(idCelda, direccion) {
    // asigno un barco a una nueva celda
    var aux_asignacion_celda = [...asignacionCasillas]
    aux_asignacion_celda[idCelda] = nuevoBarco;
    // quito el de la vieja celda
    aux_asignacion_celda[aMover] = "";
    setAsignacionCasillas(aux_asignacion_celda);
    //agrego mensaje
    var aux_mensajes = <div className="log-mensajes">[Usuario]: Mover - {nuevoBarco} - {direccion[0]} - {direccion[1]}</div>;
    // mando post a la API con mi movimiento
    // type: "MOVE", "ship": 
    setTurno(2); // juega la máquina
    var dict_action = {"type": "MOVE", "ship": nuevoBarco === "P1" ? "AC1" : nuevoBarco, "direction": direccion[0], "quantity": direccion[1]}
    accion(token, gameId, dict_action, []).then(resp => {aplicarJugadaOponente(resp, aux_mensajes)})

    setJugada("");
    setSeleccionarInicio(false);
    setNuevoBarco(false);
    var aux_inicio_jugada = [...inicioJugada]
    aux_inicio_jugada[aMover] = false;
    setInicioJugada(aux_inicio_jugada);
    setAMover(200);
    setCasillasValidas(new Array(100).fill(false,0,100))
    setAccionAux(0);
    //getShips(token, gameId).then(resp => console.log(resp))
  }

  // tirar despues para backend
  function crearCeldasNumeradas(){
    var tupla_celdas = [];
    var fila = 0;
    var aux = 0;
    var col = 0;
    for (var i = 0; i < 100; i++) {
      tupla_celdas.push([col, fila])
      col = col + 1;
      if (col == 10){
        col = 0;
        fila = fila + 1;
      }
    }
    return tupla_celdas;
  }

  function disparo(idCelda, marca){

    //agrego mensaje
    var aux_mensajes = <div className="log-mensajes">[Usuario]: Disparo - {nuevoBarco} - {marca[1]+(marca.slice(3,5) == 10 ? marca.slice(3,5) : marca[3])}</div>
    
    const tupla = crearCeldasNumeradas()[idCelda];

    var dict_action = {"type": "FIRE", "ship": nuevoBarco === "P1" ? "AC1" : nuevoBarco, "row": tupla[1], "column": tupla[0]}
    setTurno(2);
    accion(token, gameId, dict_action, []).then(resp => {aplicarJugadaOponente(resp, aux_mensajes)})

    setJugada("");
    setSeleccionarInicio(false);
    setNuevoBarco(false);
    var aux_inicio_jugada = [...inicioJugada]
    aux_inicio_jugada[aMover] = false;
    setInicioJugada(aux_inicio_jugada);
    setAMover(200);
    setCasillasValidas(new Array(100).fill(false,0,100));
    setAccionAux(0)
  }

  function aplicarJugadaOponente(resp, jugadaMia) {
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var aux_mensajes = [...mensajes];
  
    aux_mensajes.unshift(jugadaMia);
    if (resp.events){
      for (var i = 0; i < resp.events.length; i++) {
        if (resp.events[i].type === "HIT_SHIP" || resp.events[i].type === "SHIP_DESTROYED") {
          aux_mensajes.unshift(<div className="log-mensajes">[COMPUTER]: [{resp.events[i].type === "HIT_SHIP" ? "HIT" : "DESTROYED"}] Ship {resp.events[i].ship}</div>);
      } else {
        setFin(1); //gane yo
      }} 
    }
    if (resp.action.type == "FIRE"){
      aux_mensajes.unshift(<div className="log-mensajes">[COMPUTER]: Disparo - {resp.action.ship} - {letras[resp.action.column]+(resp.action.row+1)}</div>);
      
      verificarAtaque(resp.action.column, resp.action.row, aux_mensajes);
    } else if (resp.action.type == "MOVE"){
      aux_mensajes.unshift(<div className="log-mensajes">[COMPUTER]: Mover - {resp.action.ship} - {resp.action.direction} - {resp.action.quantity}</div>);
      setMensajes(aux_mensajes);
    }
    setTurno(1);
  }

  
  // verifico si el ataque del computador me mato algun barco
  function verificarAtaque(col, row, aux_mensajes) {
    //var dict_action = {"type": "FIRE", "ship": "F1", "row": 0, "column": 2}
    //pruebaAccion(token, gameId, dict_action).then(resp => console.log(resp))


    var celdas = crearCeldasNumeradas(); // col, row
    for (var i = 0; i < celdas.length; i++) {

      if (celdas[i][0] == col &&  celdas[i][1] == row){
        
        if (asignacionCasillas[i]){
          
          var cantidad_aux = [...cantidadPorBarco]
          if (asignacionCasillas[i][0] == "F") {
            cantidad_aux[0] = cantidad_aux[0] - 1;
          } else if (asignacionCasillas[i][0] == "C") {
            cantidad_aux[1] = cantidad_aux[1] - 1;
          } else if (asignacionCasillas[i][0] == "D") {
            cantidad_aux[2] = cantidad_aux[2] - 1;
          } else {
            cantidad_aux[3] = cantidad_aux[3] - 1;
          }
          setCantidadPorBarco(cantidad_aux);
          var aux_asignacion = [...asignacionCasillas]
          aux_mensajes.unshift(<div className="log-mensajes">[Usuario]: [HIT] Ship {aux_asignacion[i]}</div>);
          aux_mensajes.unshift(<div className="log-mensajes">[Usuario]: [Destroyed] Ship {aux_asignacion[i]}</div>);

          aux_asignacion[i] = "";
          setAsignacionCasillas(aux_asignacion);
          var aux_hundido = [...hundido]
          aux_hundido[i] = true;
          sethundido(aux_hundido);
          
          setMensajes(aux_mensajes);
          return ;
        }
      }
    }
    setMensajes(aux_mensajes);
  }
  

  if (!fin && !esperandoIniciar && cantidadPorBarco[0] <= 0 && cantidadPorBarco[1] <= 0 && cantidadPorBarco[2] <= 0 && cantidadPorBarco[3] <= 0){
    setFin(2);
  }

  function botonNuevoJuego() {
    // todo por defecto
    setFijarBarco(false);
    setCantidadPorBarco([0, 0, 0, 0]); 
    setAsignacionCasillas(new Array(100).fill("",0,100))
    setInicioJugada(new Array(100).fill(false,0,100)) 
    setJugando(false);
    setJugada(""); 
    setSeleccionarInicio(false); 
    setNuevoBarco(false); 
    setAMover(200); 
    sethundido(new Array(100).fill(false,0,100)) //para indicar si en una jugada una casilla esta siendo marcada como inicio
    setMensajes([]);
    setToken(false);
    setGameId(false);
    setJugadaOponente("");
    setTurno(false);
    setEvents([]);
    setFin(false); // 1 si gano yo, 2 si gana el computador
    setEsperandoIniciar(true);
  }

  function rendirse(){
    setFin(2);
  }

  return (
    <div className="container">
      {(fin === 1)  && (
        <div className="resultado">
          <div>{"¡Has ganado!"}</div>
          <div><button className="button" onClick={() => botonNuevoJuego()}> Nuevo Juego</button></div>
        </div>
      )}
      {(fin === 2)  && (
        <div className="resultado">
          <div>{"¡Has perdido!"}</div>
          <div><button className="button" onClick={() => botonNuevoJuego()}> Nuevo Juego</button></div>
        </div>
      )}
      {!fin && (
        <div className="tablero">
          <div className="flex-row">
            {creaMarcoSup()}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={1} marca={1} limite={true}/>}{celdas.slice(0,10)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={2} marca={2} limite={true}/>}{celdas.slice(10,20)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={3} marca={3} limite={true}/>}{celdas.slice(20,30)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={4} marca={4} limite={true}/>}{celdas.slice(30,40)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={5} marca={5} limite={true}/>}{celdas.slice(40,50)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={6} marca={6} limite={true}/>}{celdas.slice(50,60)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={7} marca={7} limite={true}/>}{celdas.slice(60,70)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={8} marca={8} limite={true}/>}{celdas.slice(70,80)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={9} marca={9} limite={true}/>}{celdas.slice(80,90)}
          </div>
          <div className="flex-row">
            {<CeldaMarco key={10} marca={10} limite={true}/>}{celdas.slice(90,100)}
          </div>
        </div>   )}
        {(!jugando && !fin) && (
          <div className="opciones">
            {<Menu funcionAsignar={asignarBarcoMenu} cantidadAsignados={cantidadPorBarco} reiniciar={reiniciarMenu} comenzarJugada={comenzarJugada}/>}
          </div>
        )}
        {(jugando && !fin) && (
          <div>
            <div>
              {<Jugar comenzarJugada={comenzarJugada} turno={turno} rendirse={rendirse} accion={accionAux}/>}
            </div>
            <div className="log">
              {mensajes}
            </div>
          </div>
        )}
        
    </div>
  );
}

export default Restaurant;
