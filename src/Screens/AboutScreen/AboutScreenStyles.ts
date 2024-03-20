import { StyleSheet } from "react-native";
import { BlackColor, GreyColor, PrimaryTextColor, SecondaryBorder, WhiteColor } from "../../Helpers/Constants/Colors";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: WhiteColor,
  },
  heading: {
    fontSize: 22,
    color: BlackColor,
    fontWeight: '800',
    marginLeft: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 24,
  },
  appIconWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    borderBottomColor: SecondaryBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  labelText: {
    color: GreyColor,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  valueText: {
    color: PrimaryTextColor,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  versionContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionText: {
    color: BlackColor,
    fontSize: 15,
    borderBottomColor: BlackColor,
    borderBottomWidth: 1,
    fontWeight: '700',
  },
});
