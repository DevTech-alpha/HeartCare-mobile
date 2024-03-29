import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import UserProfileFormProps from "../../props/UserProfileFormProps";
import { styles } from "./styles";
import { Checkbox } from "expo-checkbox";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const medicalConditionsPortugues = [
  "Diabetes",
  "Hipertensão",
  "Asma",
  "Alergias",
];
const medicalConditionsIngles = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Allergies",
];

const generoPortugues = ["Masculino", "Feminino", "Prefiro não dizer"];
const generoIngles = ["Male", "Female", "Prefer not to say"];

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  username,
  name,
  lastName,
  email,
  dob,
  bloodType,
  hasMedicalCondition,
  genero,
  setUsername,
  setName,
  setLastName,
  setEmail,
  setDob,
  setBloodType,
  setHasMedicalCondition,
  setGenero,
  handleSaveProfile,
  loading,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const formatBirthdateInput = (inputValue: any) => {
    const formattedValue = inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
    return formattedValue;
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
          {language.TEXTO.USUARIO}:
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder={language.TEXTO.DIGITE_SEU_USUARIO}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          {language.TEXTO.NOME}:
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder={language.TEXTO.DIGITE_SEU_NOME}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          {language.TEXTO.SOBRENOME}:
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder={language.TEXTO.DIGITE_SEU_SOBRENOME}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          {language.TEXTO.DATA_DE_NASCIMENTO}:
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder={language.TEXTO.DIGITE_SUA_DATA_DE_NASCIMENTO}
          onChangeText={(text) => setDob(formatBirthdateInput(text))}
          value={dob}
          keyboardType="numeric"
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          {language.TEXTO.TIPO_SANGUINEO}:
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
          {language.TEXTO.DOENCA_OU_INCAPACIDADE}:
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {language.TEXTO.PERGUNTAS === "PORTUGUES"
            ? medicalConditionsPortugues.map((condition) => (
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
              ))
            : medicalConditionsIngles.map((condition) => (
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
          {language.TEXTO.GENERO}:
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {language.TEXTO.PERGUNTAS === "PORTUGUES"
            ? generoPortugues.map((genderOption) => (
                <View key={genderOption}>
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
              ))
            : generoIngles.map((genderOption) => (
                <View key={genderOption}>
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
          {language.TEXTO.EMAIL}:
        </Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? "gray" : "black" }]}
          placeholder={language.TEXTO.DIGITE_SEU_EMAIL}
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
            {language.TEXTO.SALVAR_PERFIL}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileForm;
