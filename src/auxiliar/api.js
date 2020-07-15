export default async function correrApi() {

    const result = await fetch("https://battleship.iic2513.phobos.cl/auth", {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify({"email": "fncabrera@uc.cl", "studentNumber": "16637666"}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
    })
    const token = await result.json()
    return token;
  }
  