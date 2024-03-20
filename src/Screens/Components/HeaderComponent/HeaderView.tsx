import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {InfoIcon} from '../../../Assets/Images/InfoIcon';
import {AppIcon} from '../../../Assets/Images/SdiIcon';
import { WhiteColor } from '../../../Helpers/Constants/Colors';

interface HeaderProps {
  isSecondaryNeed?: boolean;
  secondaryicon?: string;
  secondaryNavigation?: () => void;
  isPrimaryNeed?: boolean;
  navigateToAbout?: () => void;
  aboutIcon?: string;
}

const Header: FC<HeaderProps> = props => {
  return (
    <View style={Styles.header}>
      <SvgXml height={22} xml={AppIcon} />
      <View style={{flexDirection: 'row'}}>
        {props.isSecondaryNeed && (
          <TouchableOpacity onPress={props.secondaryNavigation}>
            <SvgXml
              height={22}
              style={{marginRight: 18}}
              xml={props.secondaryicon!}
            />
          </TouchableOpacity>
        )}
        {props.isPrimaryNeed && (
          <TouchableOpacity onPress={props.navigateToAbout}>
            <SvgXml
              height={22}
              xml={props.aboutIcon ? props.aboutIcon : InfoIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
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
});

export default Header;
