import React, { useState, useCallback, useEffect } from 'react';
import Mesa from "./Mesa";
import Pedido from "./Pedido";
import Celda from "./Celda";
import Menu from "./Menu";

function Restaurant() {
  const [idMesa, setIdMesa] = useState(100);
  const [cantidadPedido, setCantidadPedido] = useState(0);
  const [estadoMesas, setEstadoMesas] = useState([false, false, false, false, false, false, false, false]);
  const [ingresos, setIngresos] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [ingresosAcum, setIngresosAcum] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [ventaDiaria, setVentaDiaria] = useState(0);
  const [abierto, setAbierto] = useState(true);

  const [fijarBarco, setFijarBarco] = useState(false);

  function creaMesas() {
    var mesas = [];
    // para crear las primeras 4 de 4 personas, despues otras 4 más de 8 personas
    // el estado indica si esta ocupada o no
    for (var i = 0; i < 4; i++) {
      mesas.push(<Mesa id={i} key={i} numero={i} cantidad={4} menu={seleccionMesa} estado={estadoMesas[i]} total={ingresos[i]} totalAcum={ingresosAcum[i]}/>);
    }
    for (var j = 4; j < 8; j++) {
      mesas.push(<Mesa id={j} key={j} numero={j} cantidad={8} menu={seleccionMesa} estado={estadoMesas[j]} total={ingresos[j]} totalAcum={ingresosAcum[j]}/>);
    }
    return mesas;
  }

  function creaCeldas() {
    var celdas = [];
    var aux_columna = 0;
    var aux_fila = 1;
    var contador_aux = 0;
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (var i = 0; i < 100; i++) {
      celdas.push(<Celda id={i} marca={`(${letras[aux_columna]},${aux_fila})`} fijarBarco={fijarBarco}/>);
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

  // funcion que se utiliza en menu para recibir la señal de que se esta seleccionando un barco
  function asignarBarcoMenu(id) {
    setFijarBarco(id);
    // vuelvo setearlo a false dps
    // setFijarBarco(false);
  }


  var mesas = creaMesas()
  var celdas = creaCeldas();


  function seleccionMesa(id) {
    setIdMesa(id);
    if (id <= 3) {
      setCantidadPedido(4)
    } else if (id <= 8) {
      setCantidadPedido(8)
    } else {
      setCantidadPedido(0)
    }
  }

  function hacerPedido(ingreso, idMesa, cantidad) {
    setIdMesa(100);
    setCantidadPedido(0);
    var aux_ingresos = ingresos;
    aux_ingresos[idMesa] = ingreso;
    setIngresos(aux_ingresos);

    var aux_estados_mesas = estadoMesas;
    aux_estados_mesas[idMesa] = true;
    setEstadoMesas(aux_estados_mesas);
  }


  return (
    <div className="container">      
        <div className="tablero">
        <div className="letras">
          <div>A</div>
          <div>B</div>
        </div>
          <div className="flex-row">
            {celdas.slice(0,10)}
          </div>
          <div className="flex-row">
            {celdas.slice(10,20)}
          </div>
          <div className="flex-row">
            {celdas.slice(20,30)}
          </div>
          <div className="flex-row">
            {celdas.slice(30,40)}
          </div>
          <div className="flex-row">
            {celdas.slice(40,50)}
          </div>
          <div className="flex-row">
            {celdas.slice(50,60)}
          </div>
          <div className="flex-row">
            {celdas.slice(60,70)}
          </div>
          <div className="flex-row">
            {celdas.slice(70,80)}
          </div>
          <div className="flex-row">
            {celdas.slice(80,90)}
          </div>
          <div className="flex-row">
            {celdas.slice(90,100)}
          </div>
        </div>   
        <div className="opciones">
          <Menu funcionAsignar={asignarBarcoMenu}/>
        </div>
      
    </div>
  );
}

export default Restaurant;
