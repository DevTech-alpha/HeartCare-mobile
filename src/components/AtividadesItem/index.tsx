import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { useTheme } from '../../hooks/ThemeProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { styles } from './styles';
import Atividade from '../../model/Atividade';
import AtividadesItemProps from '../../props/AtividadesItemProps';

const AtividadeItem: React.FC<AtividadesItemProps> = ({ user }) => {
  const { theme } = useTheme();
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'atividades'), where('Usuario', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const atividadesData = querySnapshot.docs.map(doc => doc.data() as Atividade);
        setAtividades(atividadesData);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <View>
      <View style={styles.containerCardsAtividade}>
        {atividades.slice(-3).map((item, index) => (
          <CartaoAtividade data={item} key={index} theme={theme} />
        ))}
      </View>
    </View>
  );
};

const CartaoAtividade = ({ data, theme }) => {
  const calcularPorcentagem = (tempo: number) => (tempo / 120) * 100;

  const progresso = calcularPorcentagem(data.Tempo);

  return (
    <View style={[styles.containerCartao, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
      <View style={styles.containerProgresso}>
        <Progress.Circle
          size={60}
          progress={progresso / 100}
          showsText
          formatText={() => `${progresso.toFixed(0)}%`}
          color={theme.COLORS.ICON}
          textStyle={styles.textoProgresso}
        />
      </View>
      <View style={styles.containerDetalhes}>
        <Text style={[styles.textoDetalhes, { color: theme.COLORS.POST_TITLE }]}>Tempo {data.Tempo} min</Text>
      </View>
      <Text style={[styles.nomeAtividade, { color: theme.COLORS.POST_TITLE }]}>{data.Modalidade}</Text>
    </View>
  );
};

export default AtividadeItem;
