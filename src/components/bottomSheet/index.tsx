import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, View, Alert } from 'react-native';
import BottomSheetContentProps from '../../props/BottomSheetContentProps';
import theme from '../../theme';

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ createNewPost, closeBottomSheet, loading }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const validateAndCreatePost = () => {
    if (newTitle.trim() === '' || newContent.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      createNewPost(newTitle, newContent);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end' }}>
        <AntDesign
          onPress={closeBottomSheet}
          name="close"
          size={30}
          color={theme.COLORS.PRIMARY}
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

      <TouchableOpacity
        style={styles.actionButton}
        onPress={validateAndCreatePost}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>CRIAR POSTAGEM</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginBottom: 12,
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 2,
    marginTop: 12,
    fontSize: 16,
    paddingLeft: 5,
    borderRadius: 10,
  },
  actionButton: {
    backgroundColor: theme.COLORS.BUTTON,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedActionButton: {
    backgroundColor: theme.COLORS.BUTTON_QUANTITY,
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
