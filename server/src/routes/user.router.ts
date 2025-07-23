import { Router } from "express";
import { validateBody } from "../middlewares/valitade";
import {
  deleteUserById,
  findAllUsers,
  findUserByEmail,
  findUserByID,
  updateUser,
} from "../controllers/UserController";
import { updateUserSchema } from "../schemas/user";

const router = Router();

router.route("/").get(findAllUsers);

router.route("/search").get(findUserByEmail);

router
  .route("/:id")
  .get(findUserByID)
  .put(validateBody(updateUserSchema), updateUser)
  .delete(deleteUserById);

export default router;
