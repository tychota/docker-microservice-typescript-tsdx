import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import { add } from "utils-number";

const protoPath = `${__dirname}/../protos/test.proto`;

const packageDefinition = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

// @ts-ignore
const AdditionService = grpcObject.AdditionService;

const server = new grpc.Server();
// @ts-ignore
server.addService(AdditionService.service, {
  add: ({ request }: any, callback: any) => {
    console.log(request);
    const result = {
      result: add(request.firstNumber, request.secondNumber),
      label: request.label
    };
    console.log(result);
    callback(null, result);
  }
});

server.bind("0.0.0.0:3333", grpc.ServerCredentials.createInsecure());
server.start();
console.log("Discovery Service started at port 3333");
