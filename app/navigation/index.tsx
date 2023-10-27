import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // we can return different navigators like <AuthNavigator /> <AdminNavigator /> or <AppNavigator/>

  return <AuthNavigator />;
};

export default Navigator;
