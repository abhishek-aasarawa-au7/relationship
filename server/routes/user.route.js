// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

// paths
route.get("/", userController.simple);

export default route;
