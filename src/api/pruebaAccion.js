export default async function pruebaAccion(token, idGame, dict_accion) {

    const result = await fetch(`https://battleship.iic2513.phobos.cl/games/${idGame}/test/action`, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify({"action": dict_accion, "events": []}), // data can be `string` or {object}!
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
    })
    const aux = await result.json()
    return aux;
}
