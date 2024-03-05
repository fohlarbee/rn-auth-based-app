import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
} from "react-native";

import { AuthNavigatorTypes } from "../navigation/AuthNavigator";
import { signinUrl, signupUrl } from "../url";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}


const SignIn: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthNavigatorTypes>>();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const {updateAuthState} = useContext(AuthContext);


  const handleSignin = async () => {
    // TODO: validate your userInfo
   const signinRes =  await fetch(signinUrl, {
      method: 'POST',
      body:JSON.stringify(userInfo),
      headers:{
        "Content-Type": "application/json"
      }
    })

    const apiResponse = await signinRes.json() as {profile: {name: string, email: string, role: 'admin' | 'user'}, token: string}
    
    updateAuthState({loggedIn:true, profile:apiResponse.profile, busy:true})
    await AsyncStorage.setItem("auth_token", apiResponse.token);


  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={userInfo.email}
        onChangeText={(email) => setUserInfo({ ...userInfo, email })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={userInfo.password}
        onChangeText={(password) => setUserInfo({ ...userInfo, password })}
        secureTextEntry
      />
      <Button title="Signin" onPress={handleSignin} />

      <Pressable onPress={() => navigate("signup")}>
        <Text style={styles.link}>I am new signup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  input: {
    padding: 5,
    borderWidth: 2,
    marginVertical: 20,
  },
  link: {
    color: "blue",
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default SignIn;
