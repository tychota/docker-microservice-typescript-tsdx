import grpc, { Client } from "grpc";
import protoLoader from "@grpc/proto-loader";

const protoPath = `${__dirname}/../protos/test.proto`;

const packageDefinition = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

// @ts-ignore
const AdditionService: typeof Client = grpcObject.AdditionService;

export const client = new AdditionService(
  "localhost:3333",
  grpc.credentials.createInsecure()
);
