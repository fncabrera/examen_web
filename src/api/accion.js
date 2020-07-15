export default async function accion(token, idGame, dict_accion, lista_eventos) {
    var dict = {}
    if (!lista_eventos){
        dict = {"action": dict_accion}
    } else {
        dict = {"action": dict_accion, "events": lista_eventos}
    }
    const result = await fetch(`https://battleship.iic2513.phobos.cl/games/${idGame}/action`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dict), // data can be `string` or {object}!
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
    })
    const aux = await result.json()
    return aux;
}
