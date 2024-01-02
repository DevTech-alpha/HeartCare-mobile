import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';

interface BottomSheetContentProps {
  createNewPost: (title: string, content: string) => void;
  closeBottomSheet: () => void;
  loading: boolean;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ createNewPost, closeBottomSheet, loading }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Titulo"
        style={styles.input}
        value={newTitle}
        onChangeText={(text) => setNewTitle(text)}
      />
      <TextInput
        placeholder="Comentario"
        style={styles.input}
        value={newContent}
        onChangeText={(text) => setNewContent(text)}
      />

      <TouchableOpacity style={styles.actionButton} onPress={() => createNewPost(newTitle, newContent)} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Criar Post</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={closeBottomSheet}>
        <Text style={styles.buttonText}><Feather name="log-out" size={25} color="#fff" /></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#e61919',
    width: '100%',
    borderRadius: 4,
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
