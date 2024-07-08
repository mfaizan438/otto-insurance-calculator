import UserRoute from "./users.routes";

/**
 * Defines the application's main routing configuration.
 * This class is responsible for aggregating all route configurations and making them available
 * as a single array of route objects. Each route object is an instance of a route class,
 * which encapsulates the route's path, middleware, and handler functions.
 */
class Routes {
    /**
     * Aggregates all route configurations into a single array.
     * @returns {Array<Object>} An array of route configurations.
     */
    route() {
        return [
            // Instance of UserRoute to handle user-related routes
            new UserRoute().route(),
        ];
    }
}
export default Routes;
