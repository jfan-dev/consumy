async function signIn(email, password, onSuccess) {
  console.log("will sign in...")
  const body = {
  login: {
  email: email,
  password: password
  }
  }
  const response = await fetch(
  "http://localhost:3000/sign_in", {
  method: "POST",
  headers: {
  "Accept": "application/json",
  "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
  })
  response.json().then((json) => {console.log(json); onSuccess()})
 }


export const auth = {
  signIn: signIn
 }