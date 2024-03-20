import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../Helpers/Constants/AppConstants';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {
  BlackColor,
  LightBorderColor,
  PrimaryColor,
  SecondaryWhiteColor,
  WhiteColor,
} from '../../Helpers/Constants/Colors';
const getHeightEquivalent = (input: number): number => {
  const defHeight = defaultHeight;
  const curHeight = Dimensions.get('window').height;
  const temp = input / defHeight;
  return temp * curHeight;
};

const getWidthEquivalent = (input: number): number => {
  const defWidth = defaultWidth;
  const curWidth = Dimensions.get('window').width;
  const temp = input / defWidth;
  return temp * curWidth;
};

const InventoryAdjustmentScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: getWidthEquivalent(40.72),
    height: getHeightEquivalent(19),
  },
  headerLeadingContainer: {
    flexDirection: 'row',
    width: getWidthEquivalent(66),
    justifyContent: 'space-between',
  },
  leadingChildContainer: {
    width: getWidthEquivalent(24),
    height: getHeightEquivalent(24),
  },
  syncContainer: {
    width: getWidthEquivalent(30),
    height: getHeightEquivalent(30),
  },
  title: {
    fontSize: getHeightEquivalent(22),
    fontWeight: 'bold',
    color: BlackColor,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: LightBorderColor,
    backgroundColor: SecondaryWhiteColor,
    height: getHeightEquivalent(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidthEquivalent(16),
    marginTop: getHeightEquivalent(32),
  },
  textInput: {
    flex: 1,
    fontSize: getHeightEquivalent(17),
    fontWeight: '400',
    color: BlackColor,
  },
  searchContainer: {
    width: getWidthEquivalent(21),
    height: getHeightEquivalent(21),
  },
  listContainer: {
    flex: 1,
    paddingTop: getHeightEquivalent(21),
    justifyContent: 'center',
  },
});

const LoaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '90%',
    backgroundColor: WhiteColor,
    borderRadius: 6,
    height: getHeightEquivalent(84),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: BlackColor,
  },
});

const PopupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '90%',
    backgroundColor: WhiteColor,
    borderRadius: 6,
    height: getHeightEquivalent(150),
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingHorizontal: getWidthEquivalent(26),
  },
  bottomContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BlackColor,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    color: BlackColor,
  },
  count: {
    fontSize: 15,
    fontWeight: '600',
    color: BlackColor,
  },
  button: {
    fontSize: 15,
    fontWeight: '500',
    color: PrimaryColor,
  },
});

export {InventoryAdjustmentScreenStyles, LoaderStyles, PopupStyles};
