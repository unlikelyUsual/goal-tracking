import Elysia from "elysia";
import { Http } from "../utils/Http";
import Logger from "../utils/Logger";

export default class BaseController {
  protected readonly logger: Logger;

  public app: Elysia = new Elysia();

  constructor(namespace: string) {
    this.logger = new Logger(namespace);
  }

  // API Error handler
  protected returnError(
    set: { status?: number | Http },
    err: unknown | string,
    status?: Http
  ): any {
    this.logger.error(err);
    set.status = status ?? Http.SERVER_ERROR;
    return { message: status ? err : "Something went wrong!" };
  }
}
