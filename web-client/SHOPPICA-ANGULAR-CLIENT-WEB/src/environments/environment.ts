// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userServiceUrl: 'https://user-service-net.herokuapp.com',
  recommendationServiceUrl: 'https://shopica-recommendation.herokuapp.com',
  orderServiceUrl: 'https://order-service-net.herokuapp.com',
  productServiceUrl: 'https://backend-java-api.herokuapp.com',
  localUserServiceUrl: 'https://localhost:5001',
  localOrderServiceUrl: 'https://localhost:5002',
  ghnAPIUrl: 'https://dev-online-gateway.ghn.vn/shiip/public-api',
  tokenKey: 'token',
  emailToken: 'emailToken',
  databaseToken: 'databaseToken',
  cartKey: 'cart',
  shippingAddressKey: 'shippingAddressKey',
  ghnToken: 'aa3d5553-73e6-11eb-8be2-c21e19fc6803',
  loginMethod: 'loginMethod',
  USDToVND: 23000,
  backendDomain: [
    'user-service-net.herokuapp.com',
    'order-service-net.herokuapp.com',
    'backend-java-api.herokuapp.com',
    'localhost:5001',
    'localhost:5002'
  ],
  social: {
    google: {
      clientId: '775013219718-ctvm42dg7sg8m0p0ceocd0eg7msqof3h.apps.googleusercontent.com'
    },
    facebook: {
      clientID: '4903591429710865'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
