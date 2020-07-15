import React, { useState, useCallback, useEffect } from 'react';

function Menu(props) {

    function botonAsignar(tipo){
        var restantes_fragata = 4 - props.cantidadAsignados[0];
        var restantes_crucero = 3 - props.cantidadAsignados[1];
        var restantes_destructor = 2 - props.cantidadAsignados[2]
        var restantes_portaviones = 1 - props.cantidadAsignados[3];
        var identificador = "";
        if (tipo === "fragata"){
            identificador = `F${restantes_fragata}`
        } else if (tipo === "crucero") {
            identificador = `C${restantes_crucero}`
        } else if (tipo === "destructor") {
            identificador = `D${restantes_destructor}`
        } else if (tipo === "portaviones") {
            identificador = `P1`
        }
        props.funcionAsignar(identificador, tipo);
    }

    function botonReiniciar() {
        props.reiniciar();
    }

    function botonIniciar() {
        var restantes_fragata = 4 - props.cantidadAsignados[0];
        var restantes_crucero = 3 - props.cantidadAsignados[1];
        var restantes_destructor = 2 - props.cantidadAsignados[2]
        var restantes_portaviones = 1 - props.cantidadAsignados[3];
        //if (restantes_destructor !== 0 || restantes_fragata !== 0 || restantes_crucero !== 0 || restantes_portaviones !== 0) {
           // alert("Aun te quedan barcos por asignar")
        //} else {
        props.comenzarJugada("")
        //}
    }
    
    return (
        <div>
         
            <h3>Select a ship and add it to the board: </h3>
            <div>
                <button className="button-barcos" onClick={(e) => botonAsignar("fragata")}> Fragata ({4 - props.cantidadAsignados[0]}) </button> 
            </div>
            <div>
                <button className="button-barcos" onClick={(e) => botonAsignar("crucero")}> Crucero ({3 - props.cantidadAsignados[1]})</button> 
            </div>
            <div>
                <button className="button-barcos" onClick={(e) => botonAsignar("destructor")}>Destructor ({2 - props.cantidadAsignados[2]})</button> 
            </div>
            <div>
                <button className="button-barcos" onClick={(e) => botonAsignar("portaviones")}>Portaviones ({1 - props.cantidadAsignados[3]})</button> 
            </div>
            <div>
                <button className="button2" onClick={(e) => botonReiniciar()}> Reiniciar </button> 
            </div>
            <div>
                <button className="button-iniciar" onClick={(e) => botonIniciar()}> Jugar </button> 
            </div>
        </div>
    );
}
export default Menu;