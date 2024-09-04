import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Game } from "../types/game.interface";
import { RootState } from "../app/store";
import { gamesApi } from "./apiSlice";

interface GamesState {
  selectedGameId: string | null; 
}

const initialState: GamesState = {
  selectedGameId: null,
};


export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSelectedGameId: (state, action: PayloadAction<string | null>) => {
      state.selectedGameId = action.payload;
    },
  },
});

export const selectGameById = (state: RootState, gameId: string): Game | undefined => {
  const gamesData = gamesApi.endpoints.getGames.select({ page: 1 })(state).data;

  if (!gamesData) return undefined;
  
  return gamesData.results.find((game) => game.id === gameId);
};

export const { setSelectedGameId } = gamesSlice.actions;
export const gamesReducer = gamesSlice.reducer;