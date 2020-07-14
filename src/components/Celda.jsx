import React, { useState, useCallback, useEffect } from 'react';

function Celda(props) {
    const [identificador, setIdentificador] = useState(false); //identificador del barco que esta actualmente

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

    function retornoDireccion() {
        var celdas = crearCeldasNumeradas();
        var tupla_desde = celdas[props.desde];
        var tupla_hacia = celdas[props.id];
        if (tupla_desde[0] == tupla_hacia[0]) {
            if (tupla_desde[1] - tupla_hacia[1] > 0){
                return ["Norte", Math.abs(tupla_desde[1] - tupla_hacia[1]) ]
            } else if (tupla_desde[1] - tupla_hacia[1] < 0){
                return ["Sur", Math.abs(tupla_desde[1] - tupla_hacia[1])]
            }   
        }
        if (tupla_desde[1] == tupla_hacia[1]) {
            if (tupla_desde[0] - tupla_hacia[0] > 0){
                return ["Oeste", Math.abs(tupla_desde[0] - tupla_hacia[0])]
            } else if (tupla_desde[0] - tupla_hacia[0] < 0){
                return ["Este", Math.abs(tupla_desde[0] - tupla_hacia[0])]
            }   
        }
    }

    function verificarMov(){
        var celdas = crearCeldasNumeradas();
        var tupla_desde = celdas[props.desde];
        var tupla_hacia = celdas[props.id];
        
        if (props.nuevoBarco[0] == "F") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 4) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 4)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "C") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 3) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 3)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "D") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "P") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 1) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 1)) {
                return true;
            }
        }
        alert("Movimiento no válido")
        return false;
    }

    function verificarDisparo(){
        var celdas = crearCeldasNumeradas();
        var tupla_desde = celdas[props.desde];
        var tupla_hacia = celdas[props.id];
        
        if (props.nuevoBarco[0] == "F") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "C") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "D") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 3) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 3)) {
                return true;
            }
        } else if (props.nuevoBarco[0] == "P") {
            if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 5) || 
            (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 5)) {
                return true;
            }
        }
        alert("Disparo no disponible: fuera del rango")
        return false;
    }

    function apretarCelda() {
        if (!props.jugando){
            if (!(props.asignacion === "") && props.fijarBarco) {
                alert("Ya tienes puesto un barco acá");
            }
            if (props.fijarBarco && props.asignacion === ""){
                if (props.fijarBarco[0] == "F") {
                    props.notificarBarcoAsignado("fragata", props.id, props.fijarBarco);
                } else if (props.fijarBarco[0] == "C") {
                    props.notificarBarcoAsignado("crucero", props.id, props.fijarBarco);
                } else if (props.fijarBarco[0] == "D") {
                    props.notificarBarcoAsignado("destructor", props.id, props.fijarBarco);
                } else if (props.fijarBarco[0] == "P") {
                    props.notificarBarcoAsignado("portaviones", props.id, props.fijarBarco);
                }
                setIdentificador(props.fijarBarco)
            }

        } else if (props.jugada && !props.inicioJugada && !props.seleccionarInicio) {
            if (!props.asignacion) {
                alert("No hay barco en esta celda")
            } else {
                props.seleccionarCasillaJugadaInicio(props.id, identificador)
            }
            // es el destino de la jugada

        console.log(props.jugada)
        } else if (props.jugada && props.seleccionarInicio) {
            if (props.asignacion && props.jugada === "mover") {
                if (props.hundido){
                    alert("Este lugar no esta disponible, hay un barco hundido")

                } else {
                    alert("Ya tienes un barco ahí, no puedes moverte para allá")
                }
            } else if (props.jugada === "disparar") {
 
                if (verificarDisparo()){
                    props.disparo(props.id);
                }
                
            } else if (!props.asignacion){
                if (props.jugada === "mover") {
                    if (verificarMov()){
                        props.muevoFin(props.id, retornoDireccion())
                        setIdentificador(props.nuevoBarco)
                    }
                }
            }
        }
        
    }


    return (
        //<div className={props.estado ? "mesa-ocupada" : props.estado === 0 ? "mesa-cerrada" : "mesa"} onClick={() => props.menu(props.id)}>
        <div className={props.hundido ? "celda-hundida" : (props.asignacion ? "celda-ocupada" : "celda")} onClick={() => apretarCelda()}>
        <span> {props.marca} </span>
        <span> {props.hundido ? "X" : props.asignacion} </span>
      </div>
    );
  }
  
  export default Celda;
  