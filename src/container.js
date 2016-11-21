import Base from "./base"
import logger from "utils/logger";
import {rfetch} from "utils/http";

const log = logger("rancher-lib:container:");
/**
 * @class Container
 * @extends Base
*/
class Container extends Base {
  templateString() {
    return `v1/projects/${this.accountId}/containers/${this.id}`;
  }
  /**
   * Start a container
   * @return {Promise}
   */
  start() {
    return rfetch(`${this.templateString()}/?action=start`, this.connection, {method: "POST"});
  }
  /**
   * Stop a container
   * @return {Promise}
   */
  stop(data) {
    return rfetch(`${this.templateString()}/?action=stop`, this.connection, {method: "POST", body: data});
  }
  /**
   * Restart a container
   * @return {Promise}
   */
  restart(data) {
    return rfetch(`${this.templateString()}/?action=restart`, this.connection,  {method: "POST", body: data});
  }
  // migrate() {
  //   return rfetch(`${this.templateString()}/?action=migrate`, this.connection, undefined);
  // }
  // logs() {
  //   return rfetch(`${this.templateString()}/?action=logs`, this.connection, undefined);
  // }
  // setlabels() {
  //   return rfetch(`${this.templateString()}/?action=setlabels`, this.connection, undefined);
  // }
  // execute(data) {
  //   return rfetch(`${this.templateString()}/?action=execute`, this.connection, data);
  // }
  // proxy() {
  //   return rfetch(`${this.templateString()}/?action=proxy`, this.connection, undefined);
  // }
}
export default Container;