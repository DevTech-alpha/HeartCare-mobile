import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { useTheme } from "../../hooks/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

interface CalendarComponentProps {
  value: string;
  onChange: (date: string) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  value,
  onChange,
}) => {
  const initialDisplayDate = value ? new Date(value) : new Date();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(initialDisplayDate);
  const { theme } = useTheme();

  const handleOpenDatePicker = () => setOpenDatePicker(true);
  const handleCloseDatePicker = () => setOpenDatePicker(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      setDisplayedDate(selectedDate);
      onChange(selectedDate.toISOString().split('T')[0]);

      if (Platform.OS === 'android') handleCloseDatePicker();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenDatePicker}>
        <Text style={[styles.text, { color: theme.COLORS.POST_CONTENT }]}>
          {displayedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'android' && (
        <DateTimePicker
          value={displayedDate}
          mode="date"
          display="default"
          locale="pt-BR"
          onChange={handleDateChange}
        />
      )}
      {Platform.OS !== 'android' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={openDatePicker}
          onRequestClose={handleCloseDatePicker}
        >
          <View style={[styles.modalContainer, { backgroundColor: theme.COLORS.OVERLAY }]}>
            <View style={[styles.modalContent, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
            <View style={{ alignItems: 'flex-end' }}>
            <AntDesign
              onPress={handleCloseDatePicker}
              name="close"
              size={25}
              color={theme.COLORS.ICON}
            />
          </View>
              <View style={styles.containerDate}>
                <DateTimePicker
                  value={displayedDate}
                  mode="date"
                  display="default"
                  locale="pt-BR"
                  onChange={handleDateChange}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CalendarComponent;
