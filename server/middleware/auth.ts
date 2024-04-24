import Elysia from "elysia";
import Logger from "../utils/Logger";

const logger = new Logger("Auth Middleware");

export const auth = (app: Elysia) =>
  app.onBeforeHandle({ as: "local" }, async (context) => {
    //@ts-ignore
    const { headers, set, jwt } = context;
    const auth = headers["authorization"] || headers["Authorization"];
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) {
      set.status = 401;
      return {
        message: "Unauthorized",
      };
    }

    //@ts-ignore
    const session = await jwt.verify(token);

    logger.log(`User  => `, session);

    if (!session.id) {
      set.status = 401;
      return {
        message: "Unauthorized",
      };
    }

    context.headers.uid = session.id;
  });
