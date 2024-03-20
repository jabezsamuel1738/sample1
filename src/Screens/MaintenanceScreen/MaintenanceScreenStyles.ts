import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../Helpers/Constants/AppConstants';
import { BlackColor, DarkGreyColor, WhiteColor } from '../../Helpers/Constants/Colors';
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

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WhiteColor,
    },
    body: {
        flex: 1,
        alignItems: "center",
        marginTop: getHeightEquivalent(15)
    },
    imageStyle: {
        width: getWidthEquivalent(316),
        height: getHeightEquivalent(316),
        marginBottom: getHeightEquivalent(79)
    },
    textCotainer: {
        width: getWidthEquivalent(310)
    },
    mainText: {
        color: BlackColor,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: getHeightEquivalent(22)
    },
    descText: {
        color: DarkGreyColor,
        fontSize: 19,
        textAlign: "center",
        lineHeight: getHeightEquivalent(25)
    }
})