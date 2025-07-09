import { Router } from "express";
import { validateBody } from "../middlewares/valitade";
import { createUser, deleteUserById, findAllUsers, findUserByEmail, findUserByID, updateUser } from "../controllers/UserController";
import { createUserSchema, updateUserSchema } from "../schemas/user";

const router = Router();

router
  .route("/")
  .get(findAllUsers)
  .post(validateBody(createUserSchema), createUser);

router.route("/search").get(findUserByEmail);

router
  .route("/:id")
  .get(findUserByID)
  .put(validateBody(updateUserSchema), updateUser)
  .delete(deleteUserById);

export default router