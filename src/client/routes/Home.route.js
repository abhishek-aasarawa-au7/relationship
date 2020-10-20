import { home } from "../configs/webUrl";
import Home from "../pages/Home/Home.page";

const HomeRoute = [
  {
    path: home,
    exact: true,
    isProtected: false,
    component: Home,
  },
];

export default HomeRoute;
