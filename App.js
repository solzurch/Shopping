// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./components/Welcome";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
// import the screens
import ShoppingLists from "./components/ShoppingLists";

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDZen2IksRSdiki6E9FCWjK3bUx5NNoi_8",
    authDomain: "shopping-list-demo-699ea.firebaseapp.com",
    projectId: "shopping-list-demo-699ea",
    storageBucket: "shopping-list-demo-699ea.appspot.com",
    messagingSenderId: "893964855161",
    appId: "1:893964855161:web:15829c274522adee3a71a8",
    measurementId: "G-MCSE6RVVX2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ShoppingLists">
          {(props) => (
            <ShoppingLists
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
