import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import CalendarComponent from "../Calendar";
import UserProfileFormProps from "../../props/UserProfileFormProps";
import { styles } from "./styles";

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  username,
  name,
  lastName,
  email,
  dob,
  setUsername,
  setName,
  setLastName,
  setEmail,
  setDob,
  handleSaveProfile,
  loading,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <ScrollView>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Usuário</Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
          placeholder="Digite seu usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Nome</Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
          placeholder="Digite seu Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Sobrenome</Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
          placeholder="Digite seu Sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Data de Nascimento</Text>
        <CalendarComponent
         value={dob}
         onChange={setDob}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Email</Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? "gray" : "black" }]}
          placeholder="Digite seu Email"
          value={email}
          pointerEvents={email.trim() ? "none" : "auto"}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>Salvar perfil</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileForm;
