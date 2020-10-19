// utils
import response from "../utils/response";

const controller = {};

controller.simple = (req, res) => {
  response(res, [], "hello user", false, 200);
};

export default controller;
