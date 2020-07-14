import React, { useState, useCallback, useEffect } from 'react';
import Mesa from "./Mesa";
import Pedido from "./Pedido";
import Celda from "./Celda";
import CeldaMarco from "./CeldaMarco";
import Menu from "./Menu";
import { isConstructorDeclaration } from 'typescript';

function Restaurant() {


  const [fijarBarco, setFijarBarco] = useState(false); 
  const [cantidadPorBarco, setCantidadPorBarco] = useState([0, 0, 0, 0]); // para ir guardando cuantos ya van asignados de cada tipo de barco
  const [asignacionCasillas, setAsignacionCasillas] = useState(new Array(100).fill("",0,100))

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
      celdas.push(<Celda key={i} id={i} limite={false} asignacion={asignacionCasillas[i]} marca={`(${letras[aux_columna]},${aux_fila})`} fijarBarco={fijarBarco} notificarBarcoAsignado={notificarBarcoAsignado}/>);
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

  function reiniciarMenu() {
    var aux_asignacion_celda = [...asignacionCasillas]
    for (var i = 0; i < 100; i++) {
      aux_asignacion_celda[i] = "";
    }
    setAsignacionCasillas(aux_asignacion_celda);
    setCantidadPorBarco([0, 0, 0, 0]);
    setFijarBarco(false);
  }


  return (
    <div className="container">      
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
        </div>   
        <div className="opciones">
          {<Menu funcionAsignar={asignarBarcoMenu} cantidadAsignados={cantidadPorBarco} reiniciar={reiniciarMenu}/>}
        </div>
      
    </div>
  );
}

export default Restaurant;
