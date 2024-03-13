import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import { collection, getDocs, doc, getDoc, where, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useTheme } from '../../hooks/ThemeProvider';
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';
import Notification from '../../model/Notification';
import { User, getAuth } from 'firebase/auth';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const { theme } = useTheme();

  const fetchNotifications = useCallback(async () => {
    try {
      const notificationsCollection = collection(db, 'notifications');
      const notificationsQuery = query(notificationsCollection, where('userId', '==', user?.uid));
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notificationsData = notificationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      const notificationsWithUserData = await Promise.all(
        notificationsData.map(async (notification) => {
          const userDoc = await getDoc(doc(db, 'users', notification.userId));
          const userData = userDoc.data() as { username: string; photo: string };

          return {
            ...notification,
            username: userData.username,
            userPhoto: userData.photo,
          };
        })
      );

      setNotifications(notificationsWithUserData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setRefreshing(false); // Para o refresh control quando a busca for concluída
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = () => {
    setRefreshing(true); // Inicia o refresh control
    fetchNotifications(); // Busca novamente as notificações
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={ // Adiciona o refresh control
          <RefreshControl
            refreshing={refreshing} // Define o estado de atualização
            onRefresh={onRefresh} // Define a função de atualização
          />
        }
      >
        {notifications.map(item => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            style={[styles.notificationContainer, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}
          >
            <Image
              source={item.userPhoto ? { uri: item.userPhoto } : require("../../assets/user.png")}
              style={styles.userPhoto}
            />

              <View style={[styles.notificationHeader, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
                <Text style={[styles.notificationText, { color: theme.COLORS.POST_TITLE }]}>
                {item.type === 'new_post' ? `Nova publicação: ${item.username}` : `Nova curtida: ${item.username}`}
                </Text>
              </View>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
