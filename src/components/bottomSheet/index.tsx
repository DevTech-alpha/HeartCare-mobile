import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import BottomSheetContentProps from '../../props/BottomSheetContentProps';
import theme from '../../theme';

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ createNewPost, closeBottomSheet, loading }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'flex-end'}}>
          <AntDesign
              onPress={closeBottomSheet}
              name="close"
              size={25}
              color={theme.COLORS.CAPTION_500}
            />
      </View>

      <TextInput
        placeholder="Título"
        style={styles.input}
        value={newTitle}
        onChangeText={(text) => setNewTitle(text)}
      />
      <TextInput
        placeholder="Comentário"
        style={styles.input}
        value={newContent}
        onChangeText={(text) => setNewContent(text)}
      />

      <TouchableOpacity style={styles.actionButton} onPress={() => createNewPost(newTitle, newContent)} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>CRIAR POSTAGEM</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: theme.COLORS.BUTTON,
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedActionButton: {
    backgroundColor: theme.COLORS.BUTTON,
    width: '100%',
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BottomSheetContent;
