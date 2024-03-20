import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncGetLanguage = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("heartcare@Language");
  } catch (error) {
    console.error("Error getting Language from AsyncStorage:", error);
    return null;
  }
};

export const asyncSetLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("heartcare@Language", language);
  } catch (error) {
    console.error("Error setting Language to AsyncStorage:", error);
  }
};
