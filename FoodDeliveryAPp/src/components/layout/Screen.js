import { View, StyleSheet } from "react-native";

import { TOKENS } from "../../constants/styles";

export function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: TOKENS.screenPadding,
  },
});
