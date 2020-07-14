import React, { useState, useCallback, useEffect } from 'react';

function Menu(props) {
    const [fragata, setFragata] = useState(4);
    const [crucero, setCrucero] = useState(3);
    const [destructor, setDestructor] = useState(2);
    const [portaviones, setPortaviones] = useState(1);

    function botonAsignar(tipo){
        var identificador = "";
        if (tipo === "fragata"){
            identificador = `F${fragata}`
        } else if (tipo === "crucero") {
            identificador = `C${crucero}`
        } else if (tipo === "destructor") {
            identificador = `D${destructor}`
        } else if (tipo === "portaviones") {
            identificador = `P1`
        }
        props.funcionAsignar()
    }


    return (
        <div>
            <h3>Select a ship and add it to the board: </h3>

            <div>
                <button onClick={(e) => botonAsignar("fragata")}> Fragata ({fragata}) </button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("crucero")}> Crucero ({crucero})</button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("destructor")}>Destructor ({destructor})</button> 
            </div>
            <div>
                <button onClick={(e) => botonAsignar("portaviones")}>Portaviones ({portaviones})</button> 
            </div>
        </div>
    );
}
export default Menu;