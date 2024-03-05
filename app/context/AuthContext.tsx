import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { profileUrl } from "../url";



type Props = {
    children: ReactNode
}
type profile = {name: string, email: string, role: 'admin' | 'user'}

interface AuthState {
    loggedIn: boolean,
    busy?: boolean
    profile: profile | null
}
interface AuthContextV2 extends AuthState {
   updateAuthState(state: AuthState): void
}

export const AuthContext = createContext<AuthContextV2>({
    loggedIn:false,
    profile: null,
    updateAuthState(){}
});



export const AuthProvider:FC<Props> = ({children}) => {
    const [authState, setAuthState] = useState<AuthState>({
        loggedIn: false,
        busy:true,
        profile: null
    })

    const updateAuthState = (state: AuthState) => {
        setAuthState({...state})
    }

    // Get Profile function
    const getProfile = async() => {
        const token = await AsyncStorage.getItem('auth_token')
        console.log('This is token', token)
        if(!token)
           return updateAuthState({...authState, busy:false});
    
           const getProfileRes =  await fetch(profileUrl, {
            method: 'GET',
            headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          })
      
          const apiResponse = await getProfileRes.json() as {profile: {name: string, email: string, role: 'admin' | 'user'}, token: string}
    
          if(apiResponse.profile){
            updateAuthState({loggedIn:true, profile: apiResponse.profile, busy: false})
          }
          else{
            updateAuthState({...authState, busy:false})
          }
    
    
    }
    

    useEffect(() => {
        getProfile()
   }, [])

    return <AuthContext.Provider value={{...authState, updateAuthState}}>
        {children}
    </AuthContext.Provider>
}  