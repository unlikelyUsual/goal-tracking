import { t, type Context } from "elysia";
import { auth } from "../middleware/auth";
import GoalModel from "../models/goal.model";
import TaskModel, { type ITask } from "../models/task.model";
import { Http } from "../utils/Http";
import BaseController from "./baseController";

export default class GoalController extends BaseController {
  constructor() {
    super(GoalController.name);
  }

  private async createGoal(context: Context) {
    const { body, set, headers } = context;
    try {
      const { uid } = headers;
      const { title, minTimeline, maxTimeline, tasks, startDate } = body as any;

      const goals = await GoalModel.find({ userId: uid });

      if (goals.length >= 2)
        return this.returnError(set, "ALready two goals added", Http.BAD);

      const goal = await GoalModel.create({
        title,
        startDate,
        userId: uid,
        minTimeline,
        maxTimeline,
      });

      await Promise.all(
        tasks.map(async (task: ITask) => {
          const savedTask = await TaskModel.create({
            ...task,
            goalId: goal._id,
          });
          goal.tasks.push(savedTask._id);
        })
      );

      const saved = await goal.save();

      return { data: { goal: saved } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async getGoals(context: Context) {
    const { set, headers } = context;
    try {
      const { uid } = headers;

      const goals = await GoalModel.find({ userId: uid }).populate("tasks");

      return { data: { goals } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async getGoal(context: Context) {
    const { set, params } = context;
    try {
      const { id } = params as any;

      this.logger.log("Goal Id", params);

      const goal = await GoalModel.findById(id).populate("tasks");

      if (!goal) return this.returnError(set, "Goal not found", Http.BAD);

      return { data: { goal } };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async updateGoal(context: Context) {
    const { body, set } = context;
    try {
      const { id, title } = body as any;

      const updateRes = await GoalModel.findByIdAndUpdate(
        id,
        { $set: { title } },
        { new: true }
      );

      this.logger.log(`Updated res : `, updateRes);

      return { data: {} };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  private async deleteGoal(context: Context) {
    const { set, params } = context;
    try {
      const { id } = params as any;

      const deleteRes = await GoalModel.deleteOne({ _id: id });

      this.logger.log(`Delete res`, deleteRes);

      return { data: {} };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.group("api/v1", (app) =>
      app
        .use(auth)
        .post("/goal", this.createGoal.bind(this), {
          body: t.Object({
            title: t.String(),
            minTimeline: t.Date(),
            maxTimeline: t.Date(),
            startDate: t.Date(),
            tasks: t.Array(t.Any()),
          }),
        })
        .get("/goals", this.getGoals.bind(this))
        .get("/goal/:id", this.getGoal.bind(this))
        .put("/goal/:id", this.updateGoal.bind(this))
        .delete("/goal/:id", this.deleteGoal.bind(this))
    );
  }
}
