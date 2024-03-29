import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "../context/AuthContext";

export function Router() {
  const { authData, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  return (
    <NavigationContainer independent={true}>
      {authData ? <TabRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
}
