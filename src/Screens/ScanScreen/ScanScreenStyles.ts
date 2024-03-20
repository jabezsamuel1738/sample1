import {Dimensions, StyleSheet} from 'react-native';
import {
  BlackColor,
  GreyColor,
  PrimaryColor,
  WhiteColor,
} from '../../Helpers/Constants/Colors';

export const Styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: WhiteColor,
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  scannerContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WhiteColor,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: BlackColor,
    marginBottom: 5,
  },
  infoText: {
    color: GreyColor,
    fontSize: 16,
    fontWeight: '600',
  },
  cogContainer: {
    width: '80%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 150,
  },
  cogButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: PrimaryColor,
    borderRadius: 50,
    elevation: 5,
    shadowColor: BlackColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
