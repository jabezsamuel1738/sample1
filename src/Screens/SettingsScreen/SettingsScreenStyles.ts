import { StyleSheet } from "react-native";
import { BlackColor, SecondaryBlackColor, SecondaryBorder, WhiteColor } from "../../Helpers/Constants/Colors";

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: WhiteColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 24,
    },
    heading: {
      fontSize: 22,
      color: BlackColor,
      fontWeight: '800',
      marginLeft: 24,
      marginBottom: 15,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      height: 70,
      borderBottomColor: SecondaryBorder,
      borderBottomWidth: 1,
    },
    optionsText: {
      color: SecondaryBlackColor,
      fontSize: 14,
      fontWeight: '500',
    },
  });