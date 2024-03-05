import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AdminNavigator from "./AdminNavigator";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";
import { View, Text } from "react-native";


const Navigator = () => {
  const {loggedIn, profile, busy} = useContext(AuthContext);
  // we can return different navigators like <AuthNavigator /> <AdminNavigator /> or <AppNavigator/>
if(busy) return (<View style={{flex: 1, justifyContent:'center', alignItems:"center"}}>
  <Text>Loading...</Text>
</View>)

  const isAdmin = profile?.role === 'admin'
  if (!loggedIn) return <AuthNavigator />
  if(isAdmin) return <AdminNavigator />
  
  return <AppNavigator />
};

export default Navigator;
