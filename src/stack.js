import {rfetch} from "utils/http";
import logger from "utils/logger";
import Base from "./base";
import Service from "./service";

const log = logger("rancher-lib:service:");
/**
 * @class Stack
 * @extends Base
*/
class Stack extends Base {
  templateString() {
    return `v1/projects/${this.accountId}/environments/${this.id}`;
  }
  /**
   * Get all services on a stack
   * @returns {Container[]} Resolve
   * @returns {Error} Reject
   */
  getServices() {
    return rfetch(`v1/projects/${this.accountId}/environments/${this.id}/services`, this.connection, undefined)
      .then((response) => response.data.map((d) => new Service(this.connection, d)));
  }
}

export default Stack;
