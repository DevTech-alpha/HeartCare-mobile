import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';
import { IconButton } from 'react-native-paper';

import Post from '../../model/Post';

const data: Post[] = [
    { id: '1', username: 'JohnDoe', title: 'Cuidados com o Coração: Parte 1', content: 'Mantenha uma dieta saudável, rica em frutas, vegetais e grãos integrais.' },
    { id: '2', username: 'JaneSmith', title: 'Cuidados com o Coração: Parte 2', content: 'Pratique exercícios regularmente para fortalecer o coração e manter um peso saudável.' },
    { id: '3', username: 'AliceWonderland', title: 'Cuidados com o Coração: Parte 3', content: 'Evite o consumo excessivo de alimentos ricos em gorduras saturadas e trans.' },
    { id: '4', username: 'BobBuilder', title: 'Cuidados com o Coração: Parte 4', content: 'Monitore regularmente a pressão arterial e o colesterol.' },
    { id: '5', username: 'EveTheExplorer', title: 'Cuidados com o Coração: Parte 5', content: 'Mantenha um estilo de vida livre de tabaco e limite o consumo de álcool.' },
    { id: '6', username: 'AnotherUser', title: 'Cuidados com o Coração: Parte 6', content: 'Realize check-ups médicos regulares para garantir a saúde do coração.' },
];

export default function Feed() {
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item }: { item: Post }) => (
        <Animatable.View animation="fadeInUp" style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Image
                    source={{ uri: `https://placekitten.com/50/50` }}
                    style={styles.userPhoto}
                />
                <Text style={styles.username}>{item.username}</Text>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>

            <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionIconContainer}>
                    <FontAwesome name="heart" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconContainer}>
                    <FontAwesome name="comment" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconContainer}>
                    <FontAwesome name="send" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveIconContainer}>
                <FontAwesome name="bookmark" size={20} color="#333" />
            </TouchableOpacity>
        </Animatable.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <IconButton
                    icon="menu"
                    iconColor="#333"
                    size={24}
                    onPress={() => { }}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity style={styles.searchIconContainer}>
                    <FontAwesome name="search" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}
