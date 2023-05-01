import useUserStore from "../utils/Stores";
import jwt from "jwt-decode";

class TokenService {
  getUserToken = () => {
    return useUserStore.getState().AccessToken;
  };
  setUserToken = (token, fullName) => {
    var user = jwt(token);
    console.log(user)
    useUserStore.setState({UserId: user.id, FullName: fullName, AccessToken: token})
  };

  //Sets current access token and user to null
  removeUserToken = () => {
    useUserStore.setState({ 
        UserId: -1,
        FullName: "",
        AccessToken: "",})
  };


}

export default new TokenService();