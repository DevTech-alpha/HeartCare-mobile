import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "../context/AuthContext";

export default function Router() {
  const { authData } = useAuth(); // Obtém os dados de autenticação do contexto

  // Retorna o componente de navegação com base no estado de autenticação
  return (
    <NavigationContainer independent={true}>
      {authData ? <TabRoutes /> : <StackRoutes />}
      {/* Decide entre as rotas da TabBar ou da Stack dependendo do estado de autenticação */}
    </NavigationContainer>
  );
}
