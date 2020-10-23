import { isEqual, isEmpty } from "lodash";

import userModel from "../models/users.model";

const allPathUtils = async (u, d, visited, path, all, reverse = false) => {
  visited.push(u.name);

  path.push(u.name);

  if (u.name === d.name) {
    let paths = [...path];
    if (reverse) paths = paths.reverse();
    if (!isEqual(all[all.length - 1], paths)) all.push(paths);
  } else {
    u = await userModel
      .findOne({ name: u.name })
      .populate("relationWith", "name")
      .exec();

    for (let i of u.relationWith) {
      if (!visited.includes(i.name))
        await allPathUtils(i, d, visited, path, all, reverse);
    }
  }

  path.pop();
  visited.pop();
};

const allPath = async (s, d) => {
  let all = [];
  let visited = [];
  let paths = [];

  await allPathUtils(s, d, visited, paths, all);

  // if there is no path
  if (isEmpty(all)) {
    await allPathUtils(d, s, [], [], all, true);
  }

  all.sort((a, b) => (a.length < b.length ? -1 : 1));

  return all;
};

export default allPath;
