
export default async function iniciarJuegoApi(token) {
    const result = await fetch("https://battleship.iic2513.phobos.cl/games", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({}), // data can be `string` or {object}!
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
    })
    const aux = await result.json()
    return aux;
}
