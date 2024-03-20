import {Dimensions, StyleSheet} from 'react-native';
import {
  defaultHeight,
  defaultWidth,
} from '../../Helpers/Constants/AppConstants';
import {
  BlackColor,
  BorderColor,
  ClickableTextColor,
  GreyColor,
  ModalBackgroundColor,
  PrimaryColor,
  PrimaryTextColor,
  TintGreyColor,
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

export const LoginScreenStyles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  mainView: {
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
  },
  toastStyle: {
    borderRadius: 10,
    height: getHeightEquivalent(60),
    elevation: 2,
    width: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toastText: {color: BlackColor, fontWeight: '600'},
  issueStyle: {color: BlackColor, fontSize: getHeightEquivalent(14)},
  textStyle: {
    color: BlackColor,
    fontWeight: '500',
    fontSize: getHeightEquivalent(25),
    paddingTop: getHeightEquivalent(40),
  },
  helpDeskText: {
    color: ClickableTextColor,
    fontWeight: '500',
    marginLeft: getWidthEquivalent(5),
    alignItems: 'center',
    fontSize: getHeightEquivalent(14),
  },
  logoTitle: {
    justifyContent: 'space-evenly',
    marginVertical: getHeightEquivalent(80),
    alignItems: 'center',
  },
  textIputView: {
    flex: 1,
    paddingBottom: getHeightEquivalent(80),
    alignItems: 'center',
  },
  reachText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  labelText: {
    color: TintGreyColor,
    marginLeft: 3,
    fontWeight: '700',
    fontSize: getHeightEquivalent(14),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BorderColor,
    marginBottom: getHeightEquivalent(20),
    borderRadius: 5,
    marginVertical: getHeightEquivalent(10),
    width: '92%',
  },
  textinput: {
    color: BlackColor,
    paddingLeft: 10,
    marginVertical: getHeightEquivalent(10),
    borderWidth: 1,
    borderColor: BorderColor,
    borderRadius: 5,
    paddingVertical: getHeightEquivalent(15),
  },
  passTextinput: {
    color: BlackColor,
    paddingLeft: 10,
    paddingVertical: getHeightEquivalent(15),
    flex: 1,
  },
  button: {
    backgroundColor: PrimaryColor,
    marginTop: getHeightEquivalent(35),
    paddingHorizontal: getWidthEquivalent(20),
    paddingVertical: getHeightEquivalent(20),
    width: '92%',
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: getHeightEquivalent(180),
  },
  buttonText: {
    color: WhiteColor,
    fontWeight: '500',
    marginHorizontal: getWidthEquivalent(50),
    fontSize: getHeightEquivalent(15),
  },
  eyeIconContainer: {
    paddingRight: 15,
  },
  proceedButton: {
    height: getHeightEquivalent(52),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
    borderRadius: 26,
  },
  proceedText: {
    color: WhiteColor,
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: ModalBackgroundColor,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '92%',
    backgroundColor: WhiteColor,
    borderRadius: 10,
  },
  modalHeading: {
    color: BlackColor,
    fontSize: 16,
    marginLeft: 20,
    marginTop: getHeightEquivalent(20),
    fontWeight: '600',
    marginBottom: getHeightEquivalent(25),
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    paddingTop: getHeightEquivalent(20),
    paddingBottom: getHeightEquivalent(20),
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  radioTitle: {
    color: PrimaryTextColor,
    fontSize: 16,
    fontWeight: '700',
    // borderWidth: 1,
  },
  radioDescription: {
    color: GreyColor,
    fontSize: 12,
    marginTop: 10,
    marginRight: 25,
  },
  logo: {
    width: getWidthEquivalent(111),
    height: getHeightEquivalent(50),
  },
});
