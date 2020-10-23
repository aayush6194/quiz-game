import * as express from "express";
import { SetRoutes } from "./routes";
import { InitMiddleWare } from "./middlewares";
import * as swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs";
import { Port } from "./config";
import * as http from 'http';

const app = express();
let server = http.createServer(app);

InitMiddleWare(app);
app.listen(Port, "localhost");
console.log(`Running on Port : ${Port}`);


//Routes
SetRoutes(app);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400)
  .send({ success: false, message: err.message || err });
});

export default app;