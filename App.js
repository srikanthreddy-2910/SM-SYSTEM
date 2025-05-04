import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import SchoolRegistration from "./Screens/SchoolRegistration";
import PreRegister from "./Screens/PreRegister";
import LoginScreen from "./Screens/logInScreen";
import AdminLogin from "./Screens/AdminLogin";
import TeacherLogin from "./Screens/TeacherLogin";
import StudentLogin from "./Screens/StudentLogin";

// 👇 Linking config for web support
const linking = {
  prefixes: ["/"],
  config: {
    screens: {
      Home: "",
            Next: "next",
            Registration: "registration",
            Login: "login",
            AdminLogin: "admin",
            TeacherLogin: "teacher",
            StudentLogin: "student",
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Next" component={PreRegister} />
        <Stack.Screen name="Register" component={SchoolRegistration} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
