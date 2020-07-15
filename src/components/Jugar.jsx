import React, { useState, useCallback, useEffect } from 'react';

function Jugar(props) {
    
    function botonJugada(jugada) {
        if (props.turno !== 2){
            if (jugada === "mover" && props.accion === 2){
                alert("Tienes elegida la acción de disparar, cancela si quieres moverte.")
            } else if (jugada === "disparar" && props.accion === 1) {
                alert("Tienes elegida la acción de moverte, cancela si quieres disparar.")
            } else {
                props.comenzarJugada(jugada)
            }
            
        }
    }


    return (
        <div>
            <div>
                <button className="button2" onClick={(e) => props.rendirse()}> Rendirse </button> 
            </div>
            <h3>Select an action: </h3>
            {props.turno === 2 && (
                <div>[Computador jugando...]</div>
            )}
            {props.turno !== 2 && (
                <div> -</div>
            )}
            <div>
                <button className="button" onClick={(e) => botonJugada("mover")}> Mover </button> 
                <button className="button" onClick={(e) => botonJugada("disparar")}> Disparar </button> 
            </div>
            <div>
                <button className="button2" onClick={(e) => botonJugada("cancelar")}> Cancelar </button> 
            </div>

        </div>
    );
}
export default Jugar;