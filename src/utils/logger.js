import debug from "debug";

export default function(prefix = "", suffix = "") {
  return {
    error: debug(`${prefix}err${suffix}`),
    info: debug(`${prefix}info${suffix}`),
    warn: debug(`${prefix}warn${suffix}`),
    debug: debug(`${prefix}debug${suffix}`),
    sql: debug(`${prefix}debug:sql${suffix}`),
  };
}
