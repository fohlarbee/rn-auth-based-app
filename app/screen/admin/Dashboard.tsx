import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

interface Props {}



const Dashboard: FC<Props> = (props) => {
  const {updateAuthState} = useContext(AuthContext)

  const logOutUser = async() => {
    await AsyncStorage.removeItem('auth_token');
    updateAuthState({loggedIn:false, profile:null})
    
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
        Welcome to Admin Dashboard
      </Text>

      <Button onPress={logOutUser} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Dashboard;
