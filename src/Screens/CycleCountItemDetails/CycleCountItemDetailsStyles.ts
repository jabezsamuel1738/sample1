import {StyleSheet} from 'react-native';
import { BlackColor, GreyColor, ImageWrapperColor, ModalBackgroundColor, PrimaryBorderColor, PrimaryColor, WhiteColor } from '../../Helpers/Constants/Colors';

export const Styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: WhiteColor,
    alignItems: 'stretch',
  },
  leftText: {
    color: BlackColor,
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
  rightText: {
    color: GreyColor,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ModalBackgroundColor,
  },
  modalInnerContainer: {
    width: '90%',
    backgroundColor: WhiteColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  modelHeading: {
    color: BlackColor,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  okButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 50,
    marginTop: 25,
  },
  okText: {
    color: PrimaryColor,
    fontWeight: '700',
  },
  updateButton: {
    height: 52,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
    borderRadius: 26,
  },
  cancelButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: BlackColor,
    borderBottomColor: BlackColor,
    borderBottomWidth: 1,
  },
  inputWrapper: {
    width: 100,
    height: 40,
    borderColor: PrimaryBorderColor,
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  inputText: {
    color: BlackColor,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyWrapper: {
    height: 300,
    backgroundColor: ImageWrapperColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIdText: {
    color: PrimaryColor,
    fontSize: 16,
    marginTop: 18,
    fontWeight: 'bold',
  },
  itemName: {
    color: BlackColor,
    fontSize: 14,
    marginTop: 12,
    fontWeight: 'bold',
  },
  updateText: {
    color: WhiteColor,
    fontSize: 16,
    fontWeight: '800',
  },
});
