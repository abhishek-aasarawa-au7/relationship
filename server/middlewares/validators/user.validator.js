import { check, validationResult } from "express-validator";

// simplify error
import simplyfyErr from "../../utils/simplyfyErr";

export const newRelationChecker = [
  check("firstPerson")
    .exists()
    .withMessage("Please provide first person name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("name must be between 2 to 30 char long"),

  check("secPerson")
    .exists()
    .withMessage("Please provide second person name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("name must be between 2 to 30 char long"),

  check("relation")
    .exists()
    .withMessage("Please provide relation")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("relation must be between 2 to 20 char long"),
];

export const findRelationChecker = [
  check("firstPerson")
    .exists()
    .withMessage("Please provide first person name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("name must be between 2 to 30 char long"),

  check("secPerson")
    .exists()
    .withMessage("Please provide second person name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("name must be between 2 to 30 char long"),

  check("relation")
    .exists()
    .withMessage("Please provide relation")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("relation must be between 2 to 20 char long"),
];

export const errorChecker = (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    const singleKeyError = simplyfyErr(err.array());
    const errors = singleKeyError.map((e) => e.msg);
    const message = errors.join(",");
    req.validationErr = message;
  }
  next();
};
