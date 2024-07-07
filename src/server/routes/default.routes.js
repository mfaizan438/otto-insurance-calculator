import UserRoute from "./users.routes";

class Routes {
    route() {
        return [

            new UserRoute().route(),

        ];
    }
}

export default Routes;
