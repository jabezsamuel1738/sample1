import {StyleSheet} from 'react-native';
import { BlackColor, ModalBackgroundColor, PrimaryColor, WhiteColor } from '../../Helpers/Constants/Colors';

export const CycleCountScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WhiteColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  appIconWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanInfoIconsWrapper: {
    flexDirection: 'row',
  },
  scanInfoIcon: {
    marginRight: 18,
  },
  cycleCountHeader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-end"
  },
  cycleCountHeaderText: {
    fontSize: 22,
    color: BlackColor,
    fontWeight: '600',
  },
  refreshIcon: {
    marginLeft: 18,
  },
  cycleCountOptions: {
    marginTop: 30,
    flexDirection: 'row',
  },
  cycleCountOption: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleCountOptionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.32,
  },
  borderBottom: {
    borderBottomWidth: 3,
    width: '100%',
    marginTop: 14,
    borderRadius: 50,
  },
  pendingText: {
    color: PrimaryColor,
  },
  countedText: {
    color: PrimaryColor,
  },
  listItemContainer: {
    borderRadius: 8,
    backgroundColor: WhiteColor,
    elevation: 5,
    shadowColor: BlackColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 80,
    marginTop: 16,
    width: '98%',
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
});
