import React, { useState, useCallback, useEffect } from 'react';

function Jugar(props) {
    
    function botonJugada(jugada) {
        if (props.turno !== 2){
            props.comenzarJugada(jugada)
        }
    }


    return (
        <div>
            <h3>Select an action: </h3>
            {props.turno === 2 && (
                <div>[Computador jugando...]</div>
            )}
            {props.turno !== 2 && (
                <div> -</div>
            )}
            <div>
                <button onClick={(e) => botonJugada("mover")}> Mover </button> 
            </div>
            <div>
                <button onClick={(e) => botonJugada("disparar")}> Disparar </button> 
            </div>
            <div>
                <button onClick={(e) => botonJugada("mover")}> Cancelar </button> 
            </div>

        </div>
    );
}
export default Jugar;