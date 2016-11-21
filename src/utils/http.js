import fetch from "node-fetch";
import logger from "utils/logger";

const log = logger("rancher-lib:utils:http:");

export function rfetch(target, connection, options) {
  const {username, password, host, protocol} = connection;
  const uri = `${protocol || "http"}://${username}:${password}@${host}/${target}`;
  log.info(`rfetch: ${protocol || "http"}://${host}/${target}`, {options});
  return fetch(uri, Object.assign({
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }, options))
    .then((response) => response.json())
    .then((response) => {
      if (response.type === "error") {
        throw `Error: ${response.code} : ${protocol || "http"}://${host}/${target}`;
      }
      return response;
    });
}
