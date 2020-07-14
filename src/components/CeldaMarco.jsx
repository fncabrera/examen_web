import React, { useState, useCallback, useEffect } from 'react';

function CeldaMarco(props) {

    return (
        //<div className={props.estado ? "mesa-ocupada" : props.estado === 0 ? "mesa-cerrada" : "mesa"} onClick={() => props.menu(props.id)}>
        <div className="celda-marco">
        <span> {props.marca} </span>
      </div>
    );
  }
  
  export default CeldaMarco;
  