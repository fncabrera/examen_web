export default async function getShips(token, gameId) {
    const result = await fetch(`https://battleship.iic2513.phobos.cl/games/${gameId}/test/ships`, {
            method: 'GET', // or 'PUT'
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
    })
    const aux = await result.json()
    return aux;
}
