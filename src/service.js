import {rfetch} from "utils/http";
import Base from "./base";
import logger from "utils/logger";

const log = logger("rancher-lib:service:");
/**
 * @class Service
 * @extends Base
*/
class Service extends Base {
  templateString() {
    return `v1/projects/${this.accountId}/services/${this.id}`;
  }
  /**
   * Restart a service
   * @return {Promise}
   */
  restart(data = {rollingRestartStrategy: ""}) {
    return rfetch(`${this.templateString()}/?action=restart`, this.connection, {
      method: "POST", 
      body: JSON.stringify(data)
    });
  }
  //TODO: put check in place if id was passed to the constructor
  /**
   * Upgrade a service
   * @return {Promise}
   */
  upgradeService(config) {
    return this.refresh().then(() => {
      const body = Object.assign({
        inServiceStrategy: {
          secondaryLaunchConfigs: [],
          batchSize: 1,
          intervalMillis: 2000,
          launchConfig: this.launchConfig,
          previousLaunchConfig: null,
          previousSecondaryLaunchConfigs: [],
          startFirst: false,
        },
        toServiceStrategy: null,
      }, config);
      log.info(`upgrading service ${this.accountId} ${this.id}`);
      const uri = `v1/projects/${this.accountId}/services/${this.id}/?action=upgrade`;
      return rfetch(uri, this.connection, {method: "POST", body: JSON.stringify(body)});
    }).then((response) => {
      Object.assign(this, response);
    });
  }
  /**
   * Finish upgrading a service
   * @return {Promise}
   */
  finishUpgrade() {
    log.info(`finished upgrading service ${this.accountId} ${this.id}`);
    const uri = `v1/projects/${this.accountId}/services/${this.id}/?action=finishupgrade`;
    return rfetch(uri, this.connection, {method: "POST"});
  }
  /**
   * Waits for a service to be upgraded
   * @return {Promise}
   */
  waitForServiceUpgraded() {
    log.info(`checking service ${this.accountId} ${this.id}`);
    return new Promise((resolve, reject) => {
      try {
        const check = () => {
          log.info("state", this.state);
          return this.refresh().then(() => {
            if (this.state !== "upgraded" && this.state !== "active") {
              return setTimeout(check, 1000);
            }
            return resolve();
          });
        };
        return check();
      } catch (err) {
        return reject(err);
      }
    });
  }
}

export default Service;
