import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

interface Post {
    id: string;
    username: string;
    title: string;
    content: string;
}

const data: Post[] = [
    { id: '1', username: 'user1', title: 'Cuidados com o Coração: Parte 1', content: 'Mantenha uma dieta saudável, rica em frutas, vegetais e grãos integrais.' },
    { id: '2', username: 'user2', title: 'Cuidados com o Coração: Parte 2', content: 'Pratique exercícios regularmente para fortalecer o coração e manter um peso saudável.' },
    { id: '3', username: 'user3', title: 'Cuidados com o Coração: Parte 3', content: 'Evite o consumo excessivo de alimentos ricos em gorduras saturadas e trans.' },
    { id: '4', username: 'user4', title: 'Cuidados com o Coração: Parte 4', content: 'Monitore regularmente a pressão arterial e o colesterol.' },
    { id: '5', username: 'user5', title: 'Cuidados com o Coração: Parte 5', content: 'Mantenha um estilo de vida livre de tabaco e limite o consumo de álcool.' },
    { id: '6', username: 'user6', title: 'Cuidados com o Coração: Parte 6', content: 'Realize check-ups médicos regulares para garantir a saúde do coração.' },
];

export default function Feed() {
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item }: { item: Post }) => (
        <Animatable.View animation="fadeInUp" style={styles.postContainer}>
            <View style={styles.postHeader}>
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
