import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../Helpers/Constants/AppConstants';
import { BlackColor, WhiteColor } from '../../Helpers/Constants/Colors';
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

const CountedItemsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: getHeightEquivalent(40),
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
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: getHeightEquivalent(21),
    color: BlackColor,
    paddingHorizontal: 24,
    marginTop: 0
  },
  modalContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CountedItemsScreenStyles};
