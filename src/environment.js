import {rfetch} from "utils/http";
import logger from "utils/logger";
import Base from "./base";
import Host from "./host";
import Stack from "./stack";

const log = logger("rancher-lib:enviroment:");
/**
 * @class Environment
 * @extends Base
*/
class Environment extends Base {
  templateString() {
    return `v1/projects/${this.id}`;
  }
  /**
   * Get all stacks on an environment
   * @returns {Stack[]} Resolve
   * @returns {Error} Reject
   */
  getStacks() {
    return rfetch(`v1/projects/${this.id}/environments`, this.connection, undefined)
      .then((response) => response.data.map((d) => new Stack(this.connection, d)));
  }
  /**
   * Get all hosts on an environment
   * @returns {Host[]} Resolve
   * @returns {Error} Reject
   */
  getHosts() {
    return rfetch(`v1/projects/${this.id}/hosts`, this.connection, undefined)
      .then((response) => response.data.map((d) => new Host(this.connection, d)));
  }
  //TODO: put more checks for invalid
  /**
   * Parse a string based path to return a service
   * @param {string} path - Path to the service, e.g. Database\Postgres.
   * @returns {Service} Resolve
   * @returns {Error} Reject
   */
  getServiceByPath(p) { //e.g. Database\Database
    const [stackName, serviceName] = p.split("\\");
    return this.getStacks().then((stacks) => {
      return stacks.filter((stack) => {
        return stack.name === stackName;
      })[0].getServices().then((services) => {
        return services.filter((service) => {
          return service.name === serviceName;
        })[0];
      });
    });
  }
  
  //TODO: put more checks for invalid
  /**
   * Parse a string based path to return a service
   * @param {string} hostName - Host name,
   * @param {string} containerName - Container name,
   * @returns {Container} Resolve
   * @returns {Error} Reject
   */
  getContainerByHostAndName(hostName, containerName) {
    return this.getHosts().then((hosts) => {
      return hosts.filter((host) => {
        return host.hostname === hostName;
      })[0].getContainers().then((containers) => {
        return containers.filter((container) => {
          return container.name === containerName;
        })[0];
      });
    });
  }

}

export default Environment;