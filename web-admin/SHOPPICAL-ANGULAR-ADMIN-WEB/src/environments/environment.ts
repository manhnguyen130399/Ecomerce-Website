// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userServiceUrl: "https://user-service-net.herokuapp.com/api",
  orderServiceUrl: "https://order-service-net.herokuapp.com/api",
  productServiceUrl: "https://backend-java-api.herokuapp.com/api",
  localUserServiceUrl: "https://localhost:5001/api",
  localOrderServiceUrl: "https://localhost:5002/api",
  tokenKey: "token",
  verifyKey: "verifyKey",
  backendDomain: [
    "user-service-net.herokuapp.com",
    "order-service-net.herokuapp.com",
    "backend-java-api.herokuapp.com"
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
