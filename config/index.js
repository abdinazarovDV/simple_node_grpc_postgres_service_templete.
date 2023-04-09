const config = {
    environment: getConf("NODE_ENV", "dev"),
    RPCPort: getConf("RPC_PORT", 9102),
    postgresHost: getConf("POSTGRES_HOST", "localhost"),
    postgresPort: getConf("POSTGRES_PORT", 5432),
    postgresUser: getConf("POSTGRES_USER", "postgres"),
    postgresPassword: getConf("POSTGRES_PASSWORD", "1"),
    postgresDatabase: getConf("POSTGRES_DATABASE", "node_grpc")
};

function getConf(name, def = "") {
    if (process.env[name]) {
        return process.env[name];
    }
    return def
}

module.exports = config;
