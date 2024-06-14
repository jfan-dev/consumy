export const auth = {
  async signIn(email: string, password: string, onSuccess: () => void) {
    console.log("will sign in...");
    const body = { login: { email, password } };
    const response = await fetch("http://localhost:3000/sign_in", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    response.json().then(onSuccess);
  }
};