import { t, type Context } from "elysia";
import { auth } from "../middleware/auth";
import UserModel from "../models/User.model";
import { Http } from "../utils/Http";
import BaseController from "./baseController";

export default class UserController extends BaseController {
  constructor() {
    super(UserController.name);
  }

  private async signup(context: Context) {
    const { body, set } = context;
    try {
      const { name, email, password, height, weight, phone } = body as any;

      const passHash = await Bun.password.hash(password);

      const savedUser = await new UserModel({
        name,
        email,
        password: passHash,
        phone,
        height,
        weight,
        bmi: Math.floor((weight / height) * height),
      }).save();

      this.logger.log(`Saved user`, savedUser);

      return { data: { user: savedUser } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async login(context: Context) {
    //@ts-ignore
    const { set, body, jwt } = context;
    try {
      const { email, password } = body as any;

      const user = await UserModel.findOne({ email });

      if (!user) return this.returnError(set, "Invalid Email", Http.AUTH);

      const isPasswordVerified = await Bun.password.verify(
        password,
        user.password
      );

      if (!isPasswordVerified)
        return this.returnError(set, "Invalid Password", Http.AUTH);

      //@ts-ignore
      const token = await jwt.sign({
        id: user._id,
        email: user.email,
      });

      return {
        data: {
          token,
          message: "Logged in",
        },
      };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async getUser(context: Context) {
    const { set, headers } = context;
    try {
      const user = await UserModel.findById(headers.uid).select("-password");

      if (!user) this.returnError(set, "User not found", Http.AUTH);

      return { data: { user } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async updateUser(context: Context) {
    const { set, headers, body } = context;
    try {
      const userId = headers.uid;
      const user = await UserModel.findById(userId).select("-password");

      if (!user) this.returnError(set, "User not found", Http.AUTH);

      const { height, weight } = body as any;

      await UserModel.updateOne({ _id: userId }, { height, weight });

      return { data: { user } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.group("api/v1", (app) =>
      app
        .post("/signup", this.signup.bind(this), {
          body: t.Object({
            name: t.String(),
            password: t.String(),
            phone: t.String(),
            email: t.String({ format: "email" }),
            height: t.Number(),
            weight: t.Number(),
          }),
        })
        .post("/login", this.login.bind(this), {
          body: t.Object({
            password: t.String(),
            email: t.String({ format: "email" }),
          }),
        })
        .group("/user", (innerApp) => {
          return innerApp
            .use(auth)
            .get("/", this.getUser.bind(this))
            .put("/", this.updateUser.bind(this));
        })
    );
  }
}
