import { JwtService } from './../services/jwt.service';
import { environment } from '@env';
export function jwtOptionsFactory(jwtService: JwtService) {
  return {
    tokenGetter: () => {
      return jwtService.getToken();
    },
    authScheme: "Bearer ",
    allowedDomains: environment.backendDomain,
    disallowedRoutes: [], // not token in header
  }
}
