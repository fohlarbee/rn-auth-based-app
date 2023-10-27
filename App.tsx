import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import Navigator from "./app/navigation";

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
