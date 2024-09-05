import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GameInfo from "@/components/GameInfo";
import { Provider } from "react-redux";
import { store } from "./store";
import GameList from "@/components/GameList";

type RootStackParamList = {
  GameList: undefined;
  GameInfo: { gameId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const linking = {
    prefixes: ['https://myapp.com', 'myapp://'],
    config: {
      screens: {
        GameList: 'gamelist',
      GameInfo: 'gameinfo/:gameId',
        },
      },
    }


  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} independent={true}>
        <Stack.Navigator initialRouteName="GameList">
          <Stack.Screen name="GameList" component={GameList} />
          <Stack.Screen name="GameInfo" component={GameInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}
