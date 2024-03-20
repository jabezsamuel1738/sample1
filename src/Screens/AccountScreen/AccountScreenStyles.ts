import {Dimensions, StyleSheet} from 'react-native';
import {
  BlackColor,
  EmptyImageWrapperColor,
  GreyColor,
  ModalBackgroundColor,
  PrimaryColor,
  PrimaryTextColor,
  SecondaryBorder,
  WhiteColor,
} from '../../Helpers/Constants/Colors';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: WhiteColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 24,
  },
  imageWrapper: {
    height: 100,
    width: 100,
    backgroundColor: EmptyImageWrapperColor,
    marginTop: 30,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    color: BlackColor,
    marginTop: 34,
  },
  userIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: GreyColor,
    marginTop: 10,
  },
  marginTop4: {
    marginTop: 4,
  },
  logoutText: {
    color: BlackColor,
    fontSize: 16,
    fontWeight: '500',
    borderBottomColor: BlackColor,
    borderBottomWidth: 2,
  },
  inputWrapper: {
    borderBottomColor: SecondaryBorder,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  labelText: {
    color: GreyColor,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  valueText: {
    color: PrimaryTextColor,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  businessIdShimmer: {
    height: 14,
    marginTop: 10,
    borderRadius: 7,
  },
  nameShimmer: {
    height: 20,
    marginTop: 34,
    borderRadius: 10,
    width: '45%',
  },
  userIdShimmer: {
    height: 14,
    marginTop: 5,
    borderRadius: 7,
    width: '40%',
    marginBottom: 15,
  },
  valueShimmer: {
    height: 14,
    marginBottom: 12,
    borderRadius: 7,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 100,
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
    marginTop: 20,
    fontWeight: '600',
    marginBottom: 30,
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  radioTitle: {
    color: PrimaryTextColor,
    fontSize: 16,
    fontWeight: '700',
  },
  radioDescription: {
    color: GreyColor,
    fontSize: 12,
  },
  proceedButton: {
    height: 52,
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
  indicator :{
    height: 6,
    marginRight: 7,
    borderRadius: 25,
  }
});
