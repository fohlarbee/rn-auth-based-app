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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

interface Props {}

const SignUp: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthNavigatorTypes>>();
  const {updateAuthState} = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    // TODO: validate your userInfo
   const signupRes =  await fetch(signupUrl, {
      method: 'POST',
      body:JSON.stringify(userInfo),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const apiResponse = await signupRes.json()
    console.log(apiResponse.success)

    if(apiResponse.success){

      const signinRes =  await fetch(signinUrl, {
        method: 'POST',
        body:JSON.stringify(userInfo),
        headers:{
          'Content-Type': 'application/json'
        }
      })
  
      const apiResponse = await signinRes.json() as {profile: {name: string, email: string, role: 'admin' | 'user'}, token: string}
    
      updateAuthState({loggedIn:true, profile:apiResponse.profile, busy:false})
      await AsyncStorage.setItem("auth_token", apiResponse.token);
  
    }
    

  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userInfo.name}
        onChangeText={(name) => setUserInfo({ ...userInfo, name })}
      />
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
      <Button title="Signup" onPress={handleSignUp} />

      <Pressable onPress={() => navigate("signin")}>
        <Text style={styles.link}>I already have account signin</Text>
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

export default SignUp;
