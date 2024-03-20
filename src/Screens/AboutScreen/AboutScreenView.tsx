import React, {FC} from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {AppIcon} from '../../Assets/Images/SdiIcon';
import useAboutScreenVM from './AboutScreenVM';
import {AboutScreenProps} from './AboutScreenProps';
import {Styles} from './AboutScreenStyles';
import Header from '../Components/HeaderComponent/HeaderView';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ClickableTextColor} from '../../Helpers/Constants/Colors';

const AboutScreenView: FC<AboutScreenProps> = props => {
  const {currentVersion} = useAboutScreenVM(props);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container}>
        <Header />
        <Text style={Styles.heading}>About Us</Text>
        <View style={Styles.appIconWrapper}>
          <SvgXml height={46} width={100} xml={AppIcon} />
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Address</Text>
            <Text style={[Styles.valueText, {marginBottom: 0}]}>
              1414 Radcliffe Street, Suite 300
            </Text>
            <Text style={Styles.valueText}>Bristol, PA 19007</Text>
          </View>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Phone</Text>
            <Text
              onPress={() => {
                Linking.openURL(`tel:${'+12156331900'}`);
              }}
              style={[Styles.valueText, {color: ClickableTextColor}]}>
              215-633-1900
            </Text>
          </View>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Toll Free</Text>
            <Text
              onPress={() => {
                Linking.openURL(`tel:${'+18442359653'}`);
              }}
              style={[Styles.valueText, {color: ClickableTextColor}]}>
              844-235-9653
            </Text>
          </View>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Fax</Text>
            <Text
              onPress={() => {
                Linking.openURL(`tel:${'+12156334426'}`);
              }}
              style={[Styles.valueText, {color: ClickableTextColor}]}>
              215-633-4426
            </Text>
          </View>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Site</Text>
            <Text
              onPress={() => {
                Linking.openURL('https://sdizeus.com/');
              }}
              style={[Styles.valueText, {color: ClickableTextColor}]}>
              www.sdiexchange.com
            </Text>
          </View>
          <View style={Styles.inputWrapper}>
            <Text style={Styles.labelText}>Device ID</Text>
            <Text style={Styles.valueText}>546387483EA9802020</Text>
          </View>
          <View style={Styles.versionContainer}>
            <Text style={Styles.versionText}>
              {'Version ' + currentVersion}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AboutScreenView;
