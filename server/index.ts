import { Elysia } from "elysia";
import auth from "./config/auth";
import { connectDb } from "./config/db.setup";
import GoalController from "./controllers/goalController";
import TaskController from "./controllers/taskController";
import UserController from "./controllers/userController";

const app = new Elysia();

await connectDb();

//JWT Plugin
app.use(auth);

app.use(new UserController().routes()); // Adding users route
app.use(new TaskController().routes()); // Adding task route
app.use(new GoalController().routes()); // Adding goal route

//Error handler
const PORT = process.env.PORT!;

app
  // if routes match then it goes to error block
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
    else "Something went wrong!";
  })
  // Server listener
  .listen(PORT, () => {
    console.log(`Server started on ${app.server?.hostname}:${PORT}`);
  });
