import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { styles } from "./styles";
import Atividade from "../../model/Atividade";
import * as Animatable from "react-native-animatable";
import AtividadesItemProps from "../../props/AtividadesItemProps";
import { useLanguage } from "../../hooks/LanguageProvider";

const AtividadeItem: React.FC<AtividadesItemProps> = ({ user }) => {
  const { theme } = useTheme();

  const { language } = useLanguage();

  const [atividades, setAtividades] = useState<Atividade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "atividades"),
          where("Usuario", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const atividadesData = querySnapshot.docs.map(
          (doc) => doc.data() as Atividade
        );
        setAtividades(atividadesData);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Animatable.View
      animation="slideInLeft"
      style={styles.containerCardsAtividade}
    >
      {atividades.slice(-3).map((item, index) => (
        <CartaoAtividade
          data={item}
          key={index}
          theme={theme}
          language={language}
        />
      ))}
    </Animatable.View>
  );
};

const CartaoAtividade = ({ data, theme, language }) => {
  const calcularPorcentagem = (tempo: number) => (tempo / 120) * 100;

  const progresso = calcularPorcentagem(data.Tempo);

  return (
    <View
      style={[
        styles.containerCartao,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <View style={styles.containerProgresso}>
        <View style={[styles.circle, { borderColor: theme.COLORS.ICON }]}>
          <Text style={[styles.number, { color: theme.COLORS.ICON }]}>
            {progresso.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style={styles.containerDetalhes}>
        <Text
          style={[styles.textoDetalhes, { color: theme.COLORS.POST_TITLE }]}
        >
          {language.TEXTO.TEMPO}
          {data.Tempo} min
        </Text>
      </View>
      <Text style={[styles.nomeAtividade, { color: theme.COLORS.POST_TITLE }]}>
        {data.Modalidade}
      </Text>
    </View>
  );
};

export default AtividadeItem;
