import {StyleSheet} from 'react-native';
import {EmptyTextColor} from '../../../Helpers/Constants/Colors';

export const ListEmptyComponentStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: EmptyTextColor,
  },
});
