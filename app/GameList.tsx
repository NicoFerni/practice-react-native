import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable } from "react-native";
import { useGetGamesQuery } from "../features/apiSlice";
import { Game } from "../types/game.interface";
import { useNavigation } from "@react-navigation/native";

export default function GameList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigation: any = useNavigation();
  const { data, error, isLoading } = useGetGamesQuery({ page });

  const paginatedGames = data?.results?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNextPage = () => {
    if (paginatedGames && paginatedGames.length === itemsPerPage && data?.results && data.results.length > page * itemsPerPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error loading games</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.paginationContainer}>
          <Pressable style={[styles.button, page === 1 && styles.disabledButton]} onPress={handlePreviousPage} disabled={page === 1}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Text style={styles.pageText}>Page {page}</Text>
          <Pressable style={[styles.button, (!paginatedGames || paginatedGames.length < itemsPerPage) && styles.disabledButton]} onPress={handleNextPage} disabled={!paginatedGames || paginatedGames.length < itemsPerPage}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
        {paginatedGames?.map((game: Game) => (
          <View key={game.id} style={styles.gameContainer}>
            <Text style={styles.title}>{game.name}</Text>
            <Pressable onPress={() => navigation.navigate('GameInfo', { gameId: game.id })}>
              <Image source={{ uri: game.image.medium_url }} style={styles.image} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  gameContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0000ff', // Blue color
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  pageText: {
    textAlign: 'center',
    alignContent: 'center'
  }
});
