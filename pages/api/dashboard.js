export default async function handler(req, res) {
  const requestMethod = req.method;
  // const body = JSON.parse(req.body);
  const query = req.query;
  const host = process.env.HOST

  switch (requestMethod) {
    case 'POST':
      await fetch(`${host}/uploadfile/`, {
        method: 'POST',
        body: req.body,
        redirect: "follow",
        "Content-Type": "multipart/form-data",
      });

      res.status(200).json({
        code: "upload/success",
        message: "file upload successfully",
      })

    case 'GET':
      const files = await fetch(`${host}/getfile/${query.u_id}/${query.File_Type}`, {
        method: 'GET',
      });
      const filesRes = await files.json();

      res.status(200).json(filesRes)


    // handle other HTTP methods
    // default:
    //   res.status(200).json({ message: 'Welcome to API Routes!' })
  }
}