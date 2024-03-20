import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../Helpers/Constants/AppConstants';
import {
  BlackColor,
  GreyColor,
  ImageWrapperColor,
  PlaceHolderTextColor,
  PrimaryBorderColor,
  PrimaryColor,
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

const ItemDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getHeightEquivalent(15.5),
    paddingHorizontal: getWidthEquivalent(15),
    backgroundColor: WhiteColor,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeightEquivalent(29),
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BlackColor,
  },
  arrowContainer: {
    width: getWidthEquivalent(22),
    height: getHeightEquivalent(17),
    marginRight: getWidthEquivalent(19),
  },
  imageContainer: {
    width: '100%',
    height: getHeightEquivalent(300),
    backgroundColor: ImageWrapperColor,
    borderRadius: 8,
    marginBottom: getHeightEquivalent(16),
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: getHeightEquivalent(7),
  },
  itemDescription: {
    color: GreyColor,
    fontSize: 12,
    fontWeight: '400',
    marginBottom: getHeightEquivalent(20),
  },
  bottomContainer: {
    flexDirection: 'row',
    marginBottom: getHeightEquivalent(70),
    marginTop: getHeightEquivalent(32),
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeightEquivalent(33),
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  rowValue: {
    flex: 1,
    color: GreyColor,
    fontSize: 14,
    fontWeight: '400',
  },
  dropdownPlaceholder: {
    color: PlaceHolderTextColor,
    fontSize: 13,
  },
  inputContainer: {
    flex: 0,
    borderWidth: 1,
    width: '50%',
    paddingHorizontal: getWidthEquivalent(11),
    borderColor: PrimaryBorderColor,
    backgroundColor: WhiteColor,
    borderRadius: 3,
  },
  textInput: {
    paddingVertical: getHeightEquivalent(11),
  },
  paddingBottom: {
    marginBottom: getHeightEquivalent(16),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateContainer: {
    backgroundColor: PrimaryColor,
    paddingVertical: getHeightEquivalent(15),
    borderRadius: 24,
  },
  cancel: {
    fontSize: 15,
    fontWeight: '500',
    color: BlackColor,
  },
  cancelContainer: {
    borderBottomWidth: 1,
  },
  update: {
    color: WhiteColor,
    fontSize: 15,
    fontWeight: '600',
  },
  blackText: {
    color: BlackColor,
  },
});

export {ItemDetailScreenStyles};
