import {rfetch} from "utils/http";
import logger from "utils/logger";

const log = logger("rancher-lib:base:");

function isObject(o) {
  return o !== null && typeof o === "object";
}
/** Base class for all entities 
 * @class Base
*/
class Base {
  /**
   * Create a base class
   * @param {object} connection - connection config
   * @param {object} data - either the data object of the entity or the id in a string
   */  
  constructor(connection, data) {
    if (isObject(data)) {
      Object.assign(this, data);
    } else if (data) {
      this.id = data;
    }
    this.connection = connection;
  }
  /** Refresh the current entity 
   * @returns {Base} Resolve
   * @returns {Error} Reject
   */
  refresh() {
    log.info(`refreshing entity ${this.templateString()}`);
    return rfetch(this.templateString(), this.connection, undefined)
      .then((response) => Object.assign(this, response));
  }
}
export default Base;