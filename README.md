# rancher-lib

## Introduction
This is a promise based library that use's es6 classes and node-fetch to enable Node.js applications to interface with rancher programmatically.

### Dependencies
 - "bluebird": "^3.4.6"
 - "debug": "^2.3.2"
 - "node-fetch": "^1.6.3"

### Debugging
This library uses [debug](https://github.com/visionmedia/debug) for its logging, We prefix all logging entries with rancher-lib:
```
SET DEBUG=rancher-lib*
```

### Example
```
import {Environment} from "rancher-lib";

const connection = {
  protocol: "http",
  env: "1a5",
  host: "testserver.com:8000",
  username: "Access Key",
  password: "Secret Key",
};

const env = new Environment(connection, config.env);

Promise.all([
  env.getServiceByPath("Database\\Postgres")
    .then((service) => service.restart()),
  env.getContainerByHostAndName("HOSTNAME", "logrotate")
    .then((container) => container.restart()),
]).then(() => {
  console.log("complete");
})
```

### TODO
 - Flesh out the rest of the api