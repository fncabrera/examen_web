import React, { useState, useCallback, useEffect } from 'react';

function Menu(props) {

    function botonAsignar(tipo){
        var identificador = "";
        if (tipo === "fragata"){
            identificador = `F${4 - props.cantidadAsignados[0]}`
        } else if (tipo === "crucero") {
            identificador = `C${3 - props.cantidadAsignados[1]}`
        } else if (tipo === "destructor") {
            identificador = `D${2 - props.cantidadAsignados[2]}`
        } else if (tipo === "portaviones") {
            identificador = `P1`
        }
        props.funcionAsignar(identificador, tipo);
    }

    function botonReiniciar() {
        props.reiniciar();
    }
    
    return (
        <div>
         
            <h3>Select a ship and add it to the board: </h3>
            <div>
                <button onClick={(e) => botonAsignar("fragata")}> Fragata ({4 - props.cantidadAsignados[0]}) </button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("crucero")}> Crucero ({3 - props.cantidadAsignados[1]})</button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("destructor")}>Destructor ({2 - props.cantidadAsignados[2]})</button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("portaviones")}>Portaviones ({1 - props.cantidadAsignados[3]})</button> 
            </div>
            <div>
                <button onClick={(e) => botonReiniciar()}> Reiniciar </button> 
            </div>
        </div>
    );
}
export default Menu;