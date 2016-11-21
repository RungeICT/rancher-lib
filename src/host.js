import {rfetch} from "utils/http";
import logger from "utils/logger";
import Base from "./base";
import Container from "./container";


const log = logger("rancher-lib:host:");
/**
 * @class Host
 * @extends Base
*/
class Host extends Base {
  templateString() {
    return `v1/projects/${this.accountId}/hosts/${this.id}`;
  }
  /**
   * Get all containers on a host
   * @returns {Container[]} Resolve
   * @returns {Error} Reject
   */
  getContainers() {
    return rfetch(`v1/projects/${this.accountId}/hosts/${this.id}/instances`, this.connection, undefined)
      .then((response) => response.data.map((d) => new Container(this.connection, d)));
  }
}
export default Host;