import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../hooks/ThemeProvider';
import { estilo } from './styles';
import { Header } from '../../components/Header';
import { User, getAuth } from 'firebase/auth';
import { DocumentData, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function Home() {
  const { theme } = useTheme();
  const auth = getAuth()
  const user: User | null = auth.currentUser
  const [sintomasUsuario, setSintomasUsuario] = useState("");
  const [idade, setIdade] = useState(30);
  const [dob, setDob] = useState("")
  const [respostaOpenAI, setRespostaOpenAI] = useState("");
  const [carregando, setCarregando] = useState(false);

  const API_OPENAI = "https://api.openai.com/v1/chat/completions";
  const MODELO_GPT = "gpt-3.5-turbo";
  const CHAVE_GPT = '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';

  const calcularIdade = (dataNascimento: any) => {
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);

    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const mesNasc = dataNasc.getMonth() + 1;

    if (mesNasc > mesAtual || (mesNasc === mesAtual && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }

    return idade;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const uid = user.uid;
          const userRef = doc(collection(db, "users"), uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as DocumentData;
            setDob(userData.dob || "");
            const idadeCalculada = calcularIdade(userData.dob || "");
            setIdade(idadeCalculada);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, setDob]);

  const gerarResposta = async () => {
    if (sintomasUsuario === "") {
      Alert.alert("Atenção", "Explique o que está sentindo para receber uma resposta.");
      return;
    }

    setRespostaOpenAI("");
    setCarregando(true);
    Keyboard.dismiss();

    const prompt = `Paciente relata os seguintes sintomas: "${sintomasUsuario}". Paciente tem ${idade} anos. Médico, forneça uma resposta breve, objetiva e uma possível solução para os sintomas apresentados.`;

    try {
      const resposta = await fetch(API_OPENAI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHAVE_GPT}`,
        },
        body: JSON.stringify({
          model: MODELO_GPT,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.20,
          max_tokens: 500,
          top_p: 1,
        }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro HTTP! Status: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log(dados.choices[0].message.content);
      setRespostaOpenAI(dados.choices[0].message.content);
    } catch (erro) {
      Alert.alert("Erro", "Ocorreu um erro ao obter a resposta. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={[estilo.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title='𝓒𝓱𝓪𝓽𝓓𝓸𝓬𝓽𝓸𝓻' />
      <View style={[estilo.form, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
        <Text style={[estilo.label, { color: theme.COLORS.POST_TITLE }]}>Explique o que está sentindo</Text>
        <TextInput
          placeholder="Descreva seus sintomas"
          placeholderTextColor={theme.COLORS.POST_CONTENT}
          style={[estilo.input, { color: theme.COLORS.POST_CONTENT }]}
          value={sintomasUsuario}
          onChangeText={(texto) => setSintomasUsuario(texto)}
          multiline
          numberOfLines={3}
        />
        <Text style={[estilo.label, { color: theme.COLORS.POST_TITLE }]}>Idade: {idade.toFixed(0)}</Text>
        <Slider
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={theme.COLORS.PRIMARY}
          maximumTrackTintColor={theme.COLORS.ICON}
          value={idade}
          onValueChange={(valor) => setIdade(valor)}
        />
      </View>
      <TouchableOpacity style={[estilo.button, { backgroundColor: theme.COLORS.BUTTON }]} onPress={gerarResposta}>
        <Text style={[estilo.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>Obter Resposta</Text>
        <MaterialIcons name="favorite" size={24} color={theme.COLORS.BUTTON_TEXT} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }} style={estilo.containerScroll} showsVerticalScrollIndicator={false}>
        {carregando && (
          <View style={[estilo.content, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
            <Text style={[estilo.title, { color: theme.COLORS.POST_TITLE }]}>Carregando resposta...</Text>
            <ActivityIndicator color={theme.COLORS.ICON} size="small" />
          </View>
        )}
        {respostaOpenAI && (
          <View style={[estilo.content, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
            <Text style={[estilo.title, { color: theme.COLORS.POST_TITLE }]}>Resposta do DoctorHeart</Text>
            <Text style={{ lineHeight: 24, color: theme.COLORS.POST_CONTENT }}>{respostaOpenAI}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
