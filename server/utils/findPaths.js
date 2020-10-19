import userModel from "../models/users.model";

const allPathUtils = async (u, d, visited, path, all) => {
  visited.push(u.name);

  path.push(u.name);

  if (u.name === d.name) {
    let paths = [...path];
    all.push(paths);
  } else {
    u = await userModel
      .findOne({ name: u.name })
      .populate("relationWith", "name")
      .exec();

    for (let i of u.relationWith) {
      if (!visited.includes(i.name))
        await allPathUtils(i, d, visited, path, all);
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

  return all;
};

export default allPath;
