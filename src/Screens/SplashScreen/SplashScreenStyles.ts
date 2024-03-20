import {StyleSheet} from 'react-native';
import {BlackColor, WhiteColor} from '../../Helpers/Constants/Colors';

export const SplashScreenStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WhiteColor,
  },
  toastText: {
    color: BlackColor,
    fontWeight: '600',
  },
  toastStyle: {
    borderRadius: 10,
    height: 60,
    elevation: 2,
    width: '80%',
    backgroundColor: WhiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
