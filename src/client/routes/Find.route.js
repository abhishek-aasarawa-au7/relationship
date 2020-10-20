import { find } from "../configs/webUrl";
import Find from "../pages/Find/Find.page";

const FindRoute = [
  {
    path: find,
    exact: true,
    isProtected: false,
    component: Find,
  },
];

export default FindRoute;
