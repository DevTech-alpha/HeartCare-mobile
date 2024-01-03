import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getAuth } from 'firebase/auth';
import Medicao from '../../model/Medicao';
import { styles } from './styles';
import MedicaoFormProps from '../../props/MedicaoFormProps';

const MedicaoForm: React.FC<MedicaoFormProps> = ({ onMedicaoAdicionada, loading }) => {
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [pulso, setPulso] = useState('');
  const [isAddingMedicao, setIsAddingMedicao] = useState(false); // Novo estado para indicar se está adicionando uma medição
  const auth = getAuth();
  const user = auth.currentUser;

  const adicionarMedicao = async () => {
    if (sistolica.trim() !== '' && diastolica.trim() !== '' && pulso.trim() !== '') {
      const sistolicaValue = parseFloat(sistolica);
      const diastolicaValue = parseFloat(diastolica);

      if (!isNaN(sistolicaValue) && !isNaN(diastolicaValue)) {
        const novaMedicao: Medicao = {
          id: Date.now(),
          userId: user?.uid ?? '',
          sistolica,
          diastolica,
          pulso,
          horario: new Date().toISOString(),
          data: new Date().toISOString(),
        };

        try {
          setIsAddingMedicao(true); // Ativar o indicador de carregamento

          const medicoesRef = collection(db, 'medicoes');
          await addDoc(medicoesRef, novaMedicao);

          // Verificar se a pressão está boa
          if (sistolicaValue >= 90 && sistolicaValue <= 120 && diastolicaValue >= 60 && diastolicaValue <= 80) {
            alert('Pressão está boa!');
          } else {
            alert('Pressão fora da faixa considerada saudável. Consulte um médico.');
          }

          onMedicaoAdicionada();
        } catch (error) {
          console.error('Erro ao adicionar medição:', error);
          alert('Erro ao adicionar medição. Consulte o console para mais detalhes.');
        } finally {
          setIsAddingMedicao(false); // Desativar o indicador de carregamento, independentemente de sucesso ou falha
        }
      } else {
        alert('Valores inválidos. Certifique-se de inserir números válidos para pressão sistólica e diastólica.');
      }
    }
  };

  return (
    <>
      <Text style={styles.label}>Sistólica</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor sistólico"
        value={sistolica}
        onChangeText={(texto) => setSistolica(texto)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Diastólica</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor diastólico"
        value={diastolica}
        onChangeText={(texto) => setDiastolica(texto)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Pulso</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor do pulso"
        value={pulso}
        onChangeText={(texto) => setPulso(texto)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={adicionarMedicao}
        disabled={loading || isAddingMedicao} // Desativar o botão se estiver carregando ou adicionando uma medição
      >
        {isAddingMedicao ? ( // Exibir indicador de carregamento se estiver adicionando uma medição
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
          <Text style={styles.textoBotao}>Adicionar Medição</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

export default MedicaoForm;
