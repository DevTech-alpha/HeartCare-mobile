import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import UserProfileFormProps from "../../props/UserProfileFormProps";
import { styles } from "./styles";
import { useTheme } from "../../context/ThemeContext";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const medicalConditions = ["Diabetes", "Hipertensão", "Asma", "Alergias"];
const generoOptions = ["Masculino", "Feminino", "Prefiro não dizer"];

export default function UserProfileForm(props: UserProfileFormProps) {
  const { theme } = useTheme();
  const {
    username,
    name,
    lastName,
    email,
    bloodType,
    dob,
    number,
    hasMedicalCondition,
    genero,
    setUsername,
    setName,
    setLastName,
    setEmail,
    setBloodType,
    setDob,
    setNumber,
    setHasMedicalCondition,
    setGenero,
    handleSaveProfile,
    loading,
  } = props;

  const formatBirthdateInput = (inputValue: string): string => {
    const formattedValue = inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
    return formattedValue;
  };

  const formatNumberInput = (inputValue: string): string => {
    const cleaned: string = inputValue.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return `(${match[1] || ""})${match[2] || ""}-${match[3] || ""}`;
    }
    return inputValue;
  };

  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <ScrollView>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Usuário:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.POST_CONTENT,
            },
          ]}
          placeholder="Digite seu usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Nome:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.POST_CONTENT,
            },
          ]}
          placeholder="Digite seu nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Sobrenome:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.POST_CONTENT,
            },
          ]}
          placeholder="Digite seu sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Data de Nascimento:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.POST_CONTENT,
            },
          ]}
          placeholder="Digite sua data de nascimento"
          onChangeText={(text) => setDob(formatBirthdateInput(text))}
          value={dob}
          keyboardType="numeric"
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Celular:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.POST_CONTENT,
            },
          ]}
          placeholder="Digite seu número de celular"
          onChangeText={(text) => setNumber(formatNumberInput(text))}
          value={number}
          keyboardType="phone-pad"
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Tipo Sanguíneo:
        </Text>
        <View style={styles.checkboxContainer}>
          {bloodTypes.map((type) => (
            <View key={type}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {type}
              </Text>
              <Checkbox
                value={bloodType === type}
                onValueChange={(checked) =>
                  checked ? setBloodType(type) : setBloodType("")
                }
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Doença ou Incapacidade:
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {medicalConditions.map((condition) => (
            <View key={condition}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {condition}
              </Text>
              <Checkbox
                value={hasMedicalCondition.includes(condition)}
                onValueChange={(checked) => {
                  if (checked) {
                    setHasMedicalCondition(
                      hasMedicalCondition
                        ? hasMedicalCondition + ", " + condition
                        : condition
                    );
                  } else {
                    setHasMedicalCondition(
                      hasMedicalCondition
                        .split(", ")
                        .filter((item) => item !== condition)
                        .join(", ")
                    );
                  }
                }}
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Gênero:
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {generoOptions.map((genderOption) => (
            <View 
             key={genderOption}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {genderOption}
              </Text>
              <Checkbox
                value={genero === genderOption}
                onValueChange={() => setGenero(genderOption)}
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Email:
        </Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? "gray" : "black" }]}
          placeholder="Digite seu email"
          value={email}
          pointerEvents={email.trim() ? "none" : "auto"}
          onChangeText={(text) => setEmail(text)}
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
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Salvar Perfil
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
