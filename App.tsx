import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import Navigator from "./app/navigation";
import { AuthProvider } from "./app/context/AuthContext";

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>

  );
};

export default App;
