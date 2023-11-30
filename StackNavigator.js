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
import ThankyouScreen from "./screens/ThankyouScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ServicesScreen from "./screens/ServicesScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookingsScreen from "./screens/BookingsScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          // tabBarLabel: () => {
          //   return null;
          // },
          tabBarLabelStyle: { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          // tabBarLabel: () => {
          //   return null;
          // },
          tabBarLabelStyle: { color: "black" },
          // headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="room-service"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="room-service-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          // tabBarLabel: () => {
          //   return null;
          // },
          tabBarLabelStyle: { color: "black" },
          // headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="book" size={24} color="black" />
            ) : (
              <AntDesign name="book" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          // tabBarLabel: () => {
          //   return null;
          // },
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

function StackNavigator({ authUser }) {
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
        {!authUser ? (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ServiceProviders"
              component={ServiceProviders}
            />
            <Stack.Screen
              name="ServiceProviderDetails"
              component={ServiceProviderDetails}
              options={{ title: "Details" }}
            />
            <Stack.Screen
              name="ConfirmationScreen"
              component={ConfirmationScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ThankyouScreen"
              component={ThankyouScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              // options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ServiceProviders"
              component={ServiceProviders}
            />
            <Stack.Screen
              name="ServiceProviderDetails"
              component={ServiceProviderDetails}
              options={{ title: "Details" }}
            />
            <Stack.Screen
              name="ConfirmationScreen"
              component={ConfirmationScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ThankyouScreen"
              component={ThankyouScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default StackNavigator;
