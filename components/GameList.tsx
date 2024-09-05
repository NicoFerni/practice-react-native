import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useGetGamesQuery } from "../features/apiSlice";
import { Game } from "../types/game.interface";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font"
import { Inter_800ExtraBold, Inter_500Medium } from "@expo-google-fonts/inter"
import * as SplashScreen from 'expo-splash-screen'


SplashScreen.preventAutoHideAsync();


export default function GameList() {
  const [page, setPage] = useState(1);
  const [loaded, fail] = useFonts({
    Inter_800ExtraBold,
    Inter_500Medium
  })
  const navigation: any = useNavigation()
  const { data, error, isLoading } = useGetGamesQuery({ page });
  const itemsPerPage = 10;
  const paginatedGames = data?.results?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect((() =>{
    if(loaded || fail){
      SplashScreen.hideAsync()
    }
   }), [loaded, fail])
  
  if(!loaded && !fail){
    return null
  }

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
    <ScrollView style={styles.scrollView}>
      <Text style={styles.texTitle}>Games Info App</Text>
      <View style={styles.container}>
        {paginatedGames?.map((game: Game) => (
          <View key={game.id} style={styles.gameContainer}>
            <Text style={styles.title}>{game.name}</Text>
            <Pressable onPress={() => navigation.navigate('GameInfo', { gameId: game.id })}>
              <Image source={{ uri: game.image.medium_url }} style={styles.image} />
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity style={[styles.button]} onPress={handlePreviousPage} >
          <Text style={styles.buttonText}>Prev.</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>Page {page}</Text>
        <Pressable style={[styles.button]} onPress={handleNextPage} disabled={!paginatedGames || paginatedGames.length < itemsPerPage}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff"
  },
  texTitle: {
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "Inter_800ExtraBold"
  },
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
    marginBottom: 5,
    fontFamily: "Inter_500Medium"
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
    backgroundColor: '#0000ff', 
    padding: 10,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  pageText: {
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
  }
});
