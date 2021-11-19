import { Router } from "express"

import { ensureAuthenticate } from "./middlewares/ensureAuthenticated"
import { UpdatePasswordController } from "./controllers/UpdatePasswordController"
import { DeletePasswordController } from "./controllers/DeletePasswordController"
import { CreatePasswordController } from "./controllers/CreatePasswordController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { GeneratePasswordController } from "./controllers/GeneratePasswordController"
import { GetPasswordsByUserController } from "./controllers/GetPasswordsByUserController"

const router = Router()

router.post("/auth", new AuthenticateUserController().handle)
router.put("/pwd", ensureAuthenticate, new UpdatePasswordController().handle)

router.post(
  "/pwd-random",
  ensureAuthenticate,
  new GeneratePasswordController().handle
)

router.post(
  "/pwd-create",
  ensureAuthenticate,
  new CreatePasswordController().handle
)

router.get(
  "/pwd",
  ensureAuthenticate,
  new GetPasswordsByUserController().handle
)

router.delete(
  "/pwd/:id",
  ensureAuthenticate,
  new DeletePasswordController().handle
)

export { router }
