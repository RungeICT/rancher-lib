import Environment from "./models/environment";
import logger from "utils/logger";

const log = logger("rancher-lib:example:");

const connection = {
  protocol: "http",
  env: "1a5",
  host: "testserver.com:8000",
  username: "Access Key",
  password: "Secret Key",
};

const env = new Environment(connection, connection.env);

Promise.all([
  env.getServiceByPath("Database\\Postgres")
    .then((service) => service.restart()),
  env.getContainerByHostAndName("HOSTNAME", "logrotate")
    .then((container) => container.restart()),
]).then(() => {
  log.info("complete");
})

