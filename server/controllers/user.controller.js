// model
import userModel from "../models/users.model";

// utils
import response from "../utils/response";
import catchError from "../utils/catchError";
import findAllPath from "../utils/findPaths";

const controller = {};

controller.new = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let { firstPerson, secPerson, relation } = req.body;

  // search persons
  let first = await userModel.findOne({ name: firstPerson });
  let second = await userModel.findOne({ name: secPerson });

  // if not found
  if (!first) first = new userModel({ name: firstPerson });
  if (!second) second = new userModel({ name: secPerson });

  await second.save();

  // adding relation
  first.relationWith.push(second._id);
  first.relation.push(relation);
  await first.save();

  response(res, [], "relation added successfully", false, 200);
});

// all relations of one user
controller.all = catchError(async (req, res, next) => {
  const name = req.query.name;

  // find name in database
  let user = await userModel
    .findOne({ name })
    .populate("relationWith", "name")
    .exec();

  // if not found
  if (!user) return response(res, [], `${name} is not in database`, true, 404);

  // if found
  response(res, user, `Relations of ${name}`, false, 200);
});

// finding degree of relationship
controller.find = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let { firstPerson, secPerson } = req.body;

  // check if persons are in database
  let first = await userModel.findOne({ name: firstPerson });
  let second = await userModel.findOne({ name: secPerson });

  // if not found
  if (!first)
    return response(res, [], `${firstPerson} is not in database.`, true, 404);
  if (!second)
    return response(res, [], `${secPerson} is not in database.`, true, 404);

  // if both are in database
  let paths = await findAllPath(first, second);

  response(res, paths, "all possible degree of relationship", false, 200);
});

// update the relation
controller.update = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let { firstPerson, secPerson, relation } = req.body;

  // search persons
  let first = await userModel.findOne({ name: firstPerson });
  let second = await userModel.findOne({ name: secPerson });

  // if not found
  if (!first)
    return response(res, [], `${firstPerson} is not in database.`, true, 404);
  if (!second)
    return response(res, [], `${secPerson} is not in database.`, true, 404);

  // update relation
  let isEqualId = (ele) => ele.toString() === second._id.toString();
  let index = first.relationWith.findIndex(isEqualId);

  if (index === -1)
    return response(
      res,
      [],
      `${firstPerson} and ${secPerson} do not have relation.`,
      true,
      404
    );

  first.relation.splice(index, 1, relation);
  await first.save();

  response(res, [], "relation added successfully", false, 200);
});

export default controller;
