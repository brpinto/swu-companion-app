import { TamaguiProvider } from "@tamagui/core";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@emotion/react";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import * as SQLite from "expo-sqlite";
import { theme } from "../src/theme";
import { AxiosProvider } from "../src/contexts/AxiosContext";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { SearchProvider } from "@/src/contexts/SearchContext";
import * as Navigationbar from "expo-navigation-bar";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStore, Store } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/ui-react";
import { tamaguiConfig } from "../tamagui.config";
import { Entypo } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {},
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  if (Platform.OS === "android") {
    Navigationbar.setBackgroundColorAsync("white");
    Navigationbar.setButtonStyleAsync("dark");
  }

  const store = useCreateStore(() => {
    return createStore().setTables({ cards: {} });
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useAndStartPersister(store);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <AxiosProvider>
          <ThemeProvider theme={theme}>
            <TamaguiProvider config={tamaguiConfig}>
              <SearchProvider>
                <StatusBar style="dark" />
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="set-stack"
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="search-results"
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                </Stack>
              </SearchProvider>
            </TamaguiProvider>
          </ThemeProvider>
        </AxiosProvider>
      </PersistQueryClientProvider>
    </Provider>
  );
}

const useAndStartPersister = (store: Store) => {
  useCreatePersister(
    store,
    (store) =>
      createExpoSqlitePersister(store, SQLite.openDatabaseSync("swu-local.db")),
    [],
    async (persister) => {
      await persister.load().then(persister.startAutoSave);
    },
  );
};
