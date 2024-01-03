const app = require('./app')
const dbConnect = require("./db/connection");
const {PORT} = process.env;

const startServer = async () =>{
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error); 
  }
}
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
startServer();
