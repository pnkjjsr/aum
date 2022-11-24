

export default async function handler(req, res) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  const host = process.env.HOST

  switch (requestMethod) {
    case 'POST':
      const result = await fetch(`${host}/register/`, {
        method: 'POST',
        body: req.body
      });
      const data = await result.json();
      res.status(200).json({
        code: "login/success",
        message: "user login successfully",
      })

    // handle other HTTP methods
    // default:
    //   res.status(200).json({ message: 'Welcome to API Routes!' })
  }
}