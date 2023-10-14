import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "./store/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "./screens/UserScreen";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ServiceProviders from "./screens/ServiceProviders";
import ServiceProviderDetails from "./screens/ServiceProviderDetails";
import ConfirmationScreen from "./screens/ConfirmationScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarLabelStyle: { color: "black" },
          // headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarLabelStyle: { color: "black" },
          // headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function StackNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            // headerStyle: { backgroundColor: Colors.primary500 },
            // headerTintColor: "white",
            // contentStyle: { backgroundColor: "#fffff" },
          }
        }
      >
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ServiceProviders" component={ServiceProviders} />
        <Stack.Screen
          name="ServiceProviderDetails"
          component={ServiceProviderDetails}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default StackNavigator;
