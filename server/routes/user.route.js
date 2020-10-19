// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

// paths
// for making relationship
route.post("/new", userController.new);

// for getting all relations of specific user
route.get("/all", userController.all);

// for find possible relation
route.post("/find", userController.find);

export default route;
