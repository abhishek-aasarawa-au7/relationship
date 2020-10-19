// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// validation
import {
  newRelationChecker,
  findRelationChecker,
  errorChecker,
} from "../middlewares/validators/user.validator";

// route
let route = express.Router();

// paths
// for making relationship
route.post("/new", newRelationChecker, errorChecker, userController.new);

// for getting all relations of specific user
route.get("/all", userController.all);

// for find possible relation
route.post("/find", findRelationChecker, errorChecker, userController.find);

// for updating relationship
route.post("/update", newRelationChecker, errorChecker, userController.update);

export default route;
