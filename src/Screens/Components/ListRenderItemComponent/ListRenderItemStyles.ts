import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../../Helpers/Constants/AppConstants';
import {
  BlackColor,
  CharcoalGrey,
  ClickableTextColor,
  LightGreyColor,
  SecondaryImageWrapperColor,
  WhiteColor,
} from '../../../Helpers/Constants/Colors';
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

const ListRenderItemStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: WhiteColor,
    elevation: 5,
    shadowColor: BlackColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingHorizontal: getWidthEquivalent(16),
    paddingVertical: getHeightEquivalent(16),
    marginBottom: getHeightEquivalent(16),
    width: '97%',
    alignSelf: 'center',
    marginTop: 4,
  },
  imageContainer: {
    width: getWidthEquivalent(48),
    height: getHeightEquivalent(48),
    backgroundColor: SecondaryImageWrapperColor,
    borderRadius: 2,
    marginRight: getWidthEquivalent(17),
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  trailingContiner: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    width: getWidthEquivalent(8),
    height: getHeightEquivalent(12),
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BlackColor,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: LightGreyColor,
  },
  location: {
    fontSize: 12,
    color: CharcoalGrey,
    marginLeft: getWidthEquivalent(5),
  },
  arrowContainer: {
    width: getWidthEquivalent(4),
    height: getHeightEquivalent(8),
    marginLeft: getWidthEquivalent(5),
  },
  buttonText: {
    color: ClickableTextColor,
    fontSize: 12,
    fontWeight: '500',
  },
  hitSlop: {
    top: getHeightEquivalent(20),
    left: getWidthEquivalent(50),
    bottom: getHeightEquivalent(20),
    right: getWidthEquivalent(50),
  },
});

export {ListRenderItemStyles};
