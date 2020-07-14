import React, { useState, useCallback, useEffect } from 'react';


function Mesa(props) {
  const [idMesa, setIdMesa] = useState(props.numero);
  return (
    <div className={props.estado ? "mesa-ocupada" : props.estado === 0 ? "mesa-cerrada" : "mesa"} onClick={() => props.menu(props.id)}>
      <span>Mesa {idMesa}</span>
      <p>Estado: {props.estado ? "ocupada" : "libre"}</p>
      <p>Monto: {props.total ? props.total : "-"}</p>
      <p>Monto Acum.: {props.totalAcum ? props.totalAcum : "-"}</p>
      
    </div>
  );
}

export default Mesa;
