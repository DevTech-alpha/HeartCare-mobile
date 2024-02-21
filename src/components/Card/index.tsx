import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { useTheme } from '../../hooks/ThemeProvider';
import { User, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const cycle = require('../../assets/images/cycle.png');
const yoga = require('../../assets/images/yoga.png');
const walk = require('../../assets/images/walk.png');
const next = require('../../assets/images/next.png');

const Card = () => {
  const { theme } = useTheme();
  const auth = getAuth();
  const user = auth.currentUser;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        console.log(userData)
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={[styles.bigTitle, { color: theme.COLORS.POST_TITLE }]}>Ola {userData?.name || ''}</Text>
              <Text style={[styles.smallTitle, { color: theme.COLORS.POST_TITLE }]}> {new Date().toDateString()}</Text>
            </View>
            <View style={styles.imageContainer} />
          </View>
          <View style={styles.activityContainer}>
            <Text style={[styles.activityTitle, {color: theme.COLORS.POST_TITLE}]}>Your Activities</Text>
            <View style={styles.activityCardsContainer}>
              {data.map((item, index) => (
                <Cards data={item} index={index} key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Cards = ({ data, index }) => {
  return (
    <View style={[styles.cardContainer, { height: index === 1 ? 180 : 150, backgroundColor: data.color }]}>
      <Image source={data.image} style={styles.cardImage} />
      <View style={styles.progressContainer}>
        <Progress.Circle
          size={50}
          progress={data.status / 100}
          showsText
          unfilledColor="#ededed"
          borderColor="#ededed"
          color={data.darkColor}
          direction="counter-clockwise"
          fill="white"
          strokeCap="round"
          thickness={5}
          style={styles.progressCircle}
          textStyle={styles.progressText}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Day 1</Text>
        <Text style={styles.detailsText}>Time 20 min</Text>
      </View>
      <View style={styles.activityRow}>
        <Text style={styles.activityName}>{data.name}</Text>
        <View style={styles.nextIconContainer}>
          <Image source={next} style={styles.nextIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  title: { flex: 1, justifyContent: 'center', paddingHorizontal: 10 },
  bigTitle: { fontSize: 16 },
  smallTitle: { fontSize: 10, opacity: 0.6 },
  imageContainer: { height: 50, width: 50, borderRadius: 25 },
  screen: { margin: '3%' },
  activityContainer: { marginHorizontal: '3%' },
  activityTitle: { fontSize: 16, marginBottom: 5 },
  activityCardsContainer: { flexDirection: 'row' },
  fitnessVideoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fitnessVideoText: { fontSize: 12 },
  viewAllText: { opacity: 0.5, fontSize: 12 },
  cardContainer: { flex: 1, padding: 10, alignSelf: 'center', justifyContent: 'space-between', marginHorizontal: 8, borderRadius: 10, shadowColor: 'lightgrey', shadowOffset: { width: -5, height: 5 }, shadowOpacity: 0.5, shadowRadius: 2 },
  cardImage: { height: 25, width: 25 },
  progressContainer: { alignSelf: 'center', margin: 5 },
  progressCircle: { shadowColor: 'grey', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 1 },
  progressText: { fontSize: 16, fontWeight: 'bold' },
  detailsContainer: { marginVertical: 5 },
  detailsText: { fontSize: 10 },
  activityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activityName: { fontSize: 12 },
  nextIconContainer: { backgroundColor: 'white', padding: 2, borderRadius: 10 },
  nextIcon: { height: 12, width: 12, resizeMode: 'contain' },
});

const data = [
  { name: 'Cycling', status: 85, image: cycle, lightColor: '#f8e4d9', color: '#fcf1ea', darkColor: '#fac5a4' },
  { name: 'Walking', status: 25, image: walk, lightColor: '#d7f0f7', color: '#e8f7fc', darkColor: '#aceafc' },
  { name: 'Yoga', status: 85, image: yoga, lightColor: '#dad5fe', color: '#e7e3ff', darkColor: '#8860a2' },
];

export default Card;
