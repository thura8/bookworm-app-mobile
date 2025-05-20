import * as Font from "expo-font";

export const useLoadFonts = () => {
  const [fontsLoaded] = Font.useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  return fontsLoaded;
};
