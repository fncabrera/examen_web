import React, { useState, useCallback, useEffect } from 'react';

function Celda(props) {
    const [asignacion, setAsignacion] = useState("");


    function fijarBarco() {
        if (!(asignacion === "") && props.fijarBarco) {
            alert("Ya tienes puesto un barco acá");
        }
        if (props.fijarBarco && asignacion === ""){
            setAsignacion(props.fijarBarco);
            if (props.fijarBarco[0] == "F") {
                props.notificarBarcoAsignado("fragata", props.id, props.fijarBarco);
            } else if (props.fijarBarco[0] == "C") {
                props.notificarBarcoAsignado("crucero", props.id, props.fijarBarco);
            } else if (props.fijarBarco[0] == "D") {
                props.notificarBarcoAsignado("destructor", props.id, props.fijarBarco);
            } else if (props.fijarBarco[0] == "P") {
                props.notificarBarcoAsignado("portaviones", props.id, props.fijarBarco);
            }
        }
    }

    
    return (
        //<div className={props.estado ? "mesa-ocupada" : props.estado === 0 ? "mesa-cerrada" : "mesa"} onClick={() => props.menu(props.id)}>
        <div className={props.asignacion ? "celda-ocupada" : "celda"} onClick={() => fijarBarco()}>
        <span> {props.marca} </span>
        <span> {props.asignacion} </span>
      </div>
    );
  }
  
  export default Celda;
  