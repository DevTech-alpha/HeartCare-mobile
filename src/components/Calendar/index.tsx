import React, { useState, useCallback } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";

interface CalendarComponentProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onSelectDate,
  selectedDate,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleChangeDate = useCallback(
    (event: any, date?: Date) => {
      if (date) {
        onSelectDate(date);
      }
      setOpenDatePicker(false);
    },
    [onSelectDate]
  );

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={handleChangeDate}
        locale="pt-BR"
      />
    </View>
  );
};

export default CalendarComponent;
