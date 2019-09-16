import express, { Application } from "express";
import { client } from "./client";

// Create a new express application instance
const app: Application = express();

app.get("/add/:n1/:n2", function(req, res) {
  console.log(req.params);
  //@ts-ignore
  client.Add(
    {
      firstNumber: req.params.n1,
      secondNumber: req.params.n2,
      label: "test"
    },
    (err: any, data: any) => {
      if (err) {
        res.statusCode = 400;
        res.send(err);
      } else {
        res.send(data.result);
      }
    }
  );
});

app.listen(3000, function() {
  console.log("Listening on 3000");
});
