import React, { useState, useCallback, useEffect } from 'react';

function Celda(props) {
    const [idMesa, setIdMesa] = useState(props.numero);
    const [asignacion, setAsignacion] = useState("");

    function fijarBarco() {
        if (props.fijarBarco){
            setAsignacion(props.fijarBarco);
        }
    }
    return (
        //<div className={props.estado ? "mesa-ocupada" : props.estado === 0 ? "mesa-cerrada" : "mesa"} onClick={() => props.menu(props.id)}>
        <div className="celda" onClick={() => fijarBarco()}>
        <span> {props.marca} </span>
        <span> {asignacion} </span>
      </div>
    );
  }
  
  export default Celda;
  