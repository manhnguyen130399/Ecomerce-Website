// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userServiceUrl: "https://user-service-net.herokuapp.com",
  orderServiceUrl: "https://order-service-net.herokuapp.com",
  productServiceUrl: "https://backend-java-api.herokuapp.com",
  messageServiceUrl: 'https://localhost:5003',
  localUserServiceUrl: "https://localhost:5001",
  localOrderServiceUrl: "https://localhost:5002",
  localMessageServiceUrl: 'https://localhost:5003',
  ghnAPIUrl: "https://dev-online-gateway.ghn.vn/shiip/public-api",
  tokenKey: "token",
  verifyKey: "verifyKey",
  ghnToken: "aa3d5553-73e6-11eb-8be2-c21e19fc6803",
  backendDomain: [
    "user-service-net.herokuapp.com",
    "order-service-net.herokuapp.com",
    "backend-java-api.herokuapp.com",
    "aspnetclusters-37333-0.cloudclusters.net",
    "localhost:5001",
    "localhost:5002",
    "localhost:5003"
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
