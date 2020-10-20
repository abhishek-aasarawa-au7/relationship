import { relations } from "../configs/webUrl";
import Relations from "../pages/Relations/relations.page";

const RelationsRoute = [
  {
    path: relations,
    exact: true,
    isProtected: false,
    component: Relations,
  },
];

export default RelationsRoute;
