import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { useGetGamesQuery } from "../features/apiSlice";
import { Game } from "../types/game.interface";


type RootStackParamList = {
  GameInfo: { gameId: string };
};

type Props = {
  route: RouteProp<RootStackParamList, 'GameInfo'>;
};


export default function GameInfo({ route }: Props) {
  const { gameId } = route.params;
  const { data, error, isLoading } = useGetGamesQuery({ page: 1 });

  const game = data?.results.find((game: Game) => game.id === gameId);


  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !game) {
    return <Text>Game not found</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{game.name}</Text>
        <Image source={{ uri: game.image.medium_url }} style={styles.image} />

        <Text style={styles.title}>Description</Text>
        <Text style={styles.description}>{game.deck}</Text>

        <Text style={styles.title}>Platforms</Text>
        <Text style={styles.platforms}>
          {game.platforms ? game.platforms.join(", ") : "Platforms not found"}
        </Text>

        <Text style={styles.title}>Release Date</Text>
        <Text style={styles.releaseDate}>{game.original_release_date}</Text>
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
    backgroundColor: "#d0fff8",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  platforms: {
    fontSize: 14,
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 14,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});
