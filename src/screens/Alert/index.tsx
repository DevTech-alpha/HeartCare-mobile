import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/ThemeProvider';
import { estilo } from './styles';
import { Header } from '../../components/Header';
import { AntDesign } from '@expo/vector-icons';

import FAQ from '../../components/FAQ';
import Chat from '../../components/Chat';

export default function Alert() {
  const { theme } = useTheme();
  const [mostrar, setmostrar] = useState(true);

  const toggleChatVisibility = () => {
    setmostrar(!mostrar);
  };

  return (
    <View style={[estilo.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title={mostrar ? 'Pesquisa' : 'FAQ'} />
      {mostrar ? (

        <TouchableOpacity style={[estilo.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]} onPress={toggleChatVisibility}>
          <AntDesign
            name="arrowright"
            size={30}
            color={theme.COLORS.ICON}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[estilo.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]} onPress={toggleChatVisibility}>
          <AntDesign
            name="arrowleft"
            size={30}
            color={theme.COLORS.ICON}
          />
        </TouchableOpacity>
      )}
      {mostrar && <Chat />}
      {!mostrar && <FAQ />}
    </View>
  );
}
