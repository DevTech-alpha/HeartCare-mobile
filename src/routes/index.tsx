import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import { StackRoutes } from "./stack.routes";
import { TabRoutes } from "./tab.routes";

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
