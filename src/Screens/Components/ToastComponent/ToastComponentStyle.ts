import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../../Helpers/Constants/AppConstants';
import { BlackColor, WhiteColor } from '../../../Helpers/Constants/Colors';
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

export const ToastComponentStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WhiteColor,
    paddingHorizontal: getWidthEquivalent(20),
    paddingVertical: getHeightEquivalent(10),
    borderRadius: 10,
    height: 50,
    width: '90%',
    elevation: 5,
    shadowColor: BlackColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: getWidthEquivalent(21),
    height: getHeightEquivalent(21),
    marginRight: getWidthEquivalent(10),
  },
  message: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: getWidthEquivalent(24),
  },
  cancelContainer: {
    width: getWidthEquivalent(12),
    height: getHeightEquivalent(12),
  },
});
