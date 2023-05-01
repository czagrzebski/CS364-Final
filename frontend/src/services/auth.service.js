import api from "./api";
import tokenService from "./token.service";

const AUTH_ENDPOINT = "/auth/";

class AuthService {
  async login(username, password) {
    return await api
      .post(AUTH_ENDPOINT + "login", { username, password })
      .then((response) => {
        console.log(response)
        if (response.data.accessToken) {
          tokenService.setUserToken(response.data.accessToken, response.data.fullName);
        }
        return response.data;
      });
  }

  async fetchRefreshToken() {
    return await api
      .post(AUTH_ENDPOINT + "refresh_token", { withCredentials: true })
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response)
          tokenService.setUserToken(response.data.accessToken, response.data.fullName);
        }
        return response.data;
      })
  }

  async logout() {
    tokenService.removeUserToken();
    console.log("Logging out")
    api
      .post(AUTH_ENDPOINT + "logout", { withCredentials: true })
      .then((response) => {
        return response.data;
      })
  }

}

export default new AuthService();