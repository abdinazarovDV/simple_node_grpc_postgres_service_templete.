const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const cfg = require('./index')
const logger = require('./logger')

const productService = require("../services/product");

const PROTO_URL = __dirname + "/../proto/scrum_service/scrum_service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const scrumServiceProto =
    grpc.loadPackageDefinition(packageDefinition).scrum_service;

var server = new grpc.Server({
    "grpc.max_receive_message_length": 1024 * 1024 * 40,
    "grpc.max_send_message_length": 1024 * 1024 * 40
});

server.addService(scrumServiceProto.ProductService.service, productService);

server.bindAsync(
    "0.0.0.0:" + cfg.RPCPort,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
        if (err) {
            throw new Error("Error while binding grpc server to the port");
        }

        logger.info("grpc server is running at %s", bindPort);
        server.start();
    }
);
