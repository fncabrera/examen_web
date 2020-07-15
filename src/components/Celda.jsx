import React, { useState, useCallback, useEffect } from 'react';
import Imagen from "../images/barco.png";

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
                return ["NORTH", Math.abs(tupla_desde[1] - tupla_hacia[1]) ]
            } else if (tupla_desde[1] - tupla_hacia[1] < 0){
                return ["SOUTH", Math.abs(tupla_desde[1] - tupla_hacia[1])]
            }   
        }
        if (tupla_desde[1] == tupla_hacia[1]) {
            if (tupla_desde[0] - tupla_hacia[0] > 0){
                return ["WEST", Math.abs(tupla_desde[0] - tupla_hacia[0])]
            } else if (tupla_desde[0] - tupla_hacia[0] < 0){
                return ["EAST", Math.abs(tupla_desde[0] - tupla_hacia[0])]
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

    function verificarValidezMov(){
        var celdas = crearCeldasNumeradas();
        var tupla_desde = celdas[props.id];
        var tupla_hacia = 0;
        var celdasValidas = [];
        for (var i = 0; i < 100; i++){
            tupla_hacia = celdas[i];
            console.log(props.asignacion)
            if (props.asignacion[0] == "F") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 4) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 4)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "C") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 3) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 3)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "D") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "P") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 1) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 1)) {
                    celdasValidas.push(i);
                }
            }
        }
        return celdasValidas
    }

    function verificarValidezDis(){
        var celdas = crearCeldasNumeradas();
        var tupla_desde = celdas[props.id];
        var tupla_hacia = 0;
        var celdasValidas = [];
        for (var i = 0; i < 100; i++){
            tupla_hacia = celdas[i];
            console.log(props.asignacion)
            if (props.asignacion[0] == "F") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "C") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 2) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 2)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "D") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 3) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 3)) {
                    celdasValidas.push(i);
                }
            } else if (props.asignacion[0] == "P") {
                if ((tupla_desde[0] == tupla_hacia[0] && Math.abs(tupla_desde[1] - tupla_hacia[1]) <= 5) || 
                (tupla_desde[1] == tupla_hacia[1] && Math.abs(tupla_desde[0] - tupla_hacia[0]) <= 5)) {
                    celdasValidas.push(i);
                }
            }
        }
        return celdasValidas
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
                props.seleccionarCasillaJugadaInicio(props.id, identificador, verificarValidezMov(), verificarValidezDis())
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
                    props.disparo(props.id, props.marca);
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
        <div className={props.hundido ? "celda-hundida" : (props.valida ? "blink-bg" : (props.asignacion ? "celda-ocupada" : "celda"))} onClick={() => apretarCelda()}>
            {(props.asignacion && !props.hundido) && (
                <img className="image" src={Imagen} alt="barco"/>
            )}
            <div className="top-left">
                <span> {props.hundido ? "X" : props.asignacion} </span>
            </div>
        </div>
    );
  }
  
  export default Celda;
  