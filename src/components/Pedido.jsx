import React, { useState, useCallback, useEffect } from 'react';

function Pedido(props) {
    const [menu1, setMenu1] = useState(0);
    const [menu2, setMenu2] = useState(0);
    const [menu3, setMenu3] = useState(0);
    const [total, setTotal] = useState(0);
    const [idMesa, setidMesa] = useState(100);

    if (idMesa !== props.idMesa) {
        setidMesa(props.idMesa);
        setMenu1(0);
        setMenu2(0);
        setMenu3(0);
    }

    // caso que aun no se selecciona una mesa
    if (props.idMesa === 100) {
        return (
            <div>
                <h3>Gestión del Menú</h3>
                <p>Presione una mesa para escoger su menu</p>
            </div>
        );
    }

    //tipo 1 o 2 para saber si es agregar o quitar y menu para saber cual es
    //despues aca meter la restriccion de que puedan ser max 4 u 8 
    function botonPresionado(tipo, menu) {
        var cantidad = props.cantidadPedido;
        if (tipo === 1) {
            if (menu1 + menu2 + menu3 === cantidad) {
                alert(`Puedes pedir hasta máximo ${cantidad} menús!`)
            } else {
                if (menu === 1) {
                    setMenu1(menu1 + 1)
                    setTotal(total + 2500)
                } else if (menu === 2) {
                    setMenu2(menu2 + 1)
                    setTotal(total + 3000)
                } else {
                    setMenu3(menu3 + 1)
                    setTotal(total + 4500)
            }}
        } else {
            if (menu === 1) {
                setMenu1(menu1 - 1)
                setTotal(total - 2500)
            } else if (menu === 2) {
                setMenu2(menu2 - 1)
                setTotal(total - 3000)
            } else {
                setMenu3(menu3 - 1)
                setTotal(total - 4500)
            }
        }
    }

    function confirmarPedido() {
        props.confirmar(total, props.idMesa, props.cantidadPedido)
    }

    function botonFin(decision) {
        props.cerrarMesa(total, props.idMesa, decision)
    }

    return (
        <div>
            <h3>Gestión del Menú para la mesa: {props.idMesa}</h3>
            {!props.estado && (
                <div>
                    <h4>Ofertas de menu: </h4>
                    <p>Básico - $2500 - Cant: {menu1}</p>
                    <button onClick={(e) => botonPresionado(1, 1)}> Agregar </button> <button onClick={(e) => botonPresionado(2, 1)}>Quitar</button>
                    <p>Normal - $3000 - Cant: {menu2}</p>
                    <button onClick={(e) => botonPresionado(1, 2)}>Agregar</button> <button onClick={(e) => botonPresionado(2, 2)}>Quitar</button> 
                    <p>Extra - $4500 - Cant: {menu3}</p>
                    <button onClick={(e) => botonPresionado(1, 3)}>Agregar</button> <button onClick={(e) => botonPresionado(2, 3)}>Quitar</button> 
                    <h4>Total: {total}</h4>
                    <button onClick={confirmarPedido}> Confirmar pedido </button>
                </div>
            )}
            {props.estado && (
                <div>
                <button onClick={(e) => botonFin(true)}> Cerrar la cuenta </button> <button onClick={(e) => botonFin(false)}>Cancelar pedido</button>
                </div>
            )}
        </div>
    );
}
export default Pedido;