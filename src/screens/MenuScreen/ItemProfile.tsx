import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../components/AppText';


interface ItemProfileProps {
  icon: any;
  title?: string;
  onPress?: () => void;
  enableSwitch?: boolean;
  enabled?: boolean;
  onChangeSwitch?: (value: boolean) => void;
}
const ItemProfile = (props: ItemProfileProps) => {
  const {icon, title, onPress, enableSwitch} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image resizeMode={'contain'} style={{width:20, height:20}} source={icon} />
      <View style={styles.contentRight}>
        <View style={{width:"80%"}}>
        <AppText style={styles.textTitle}>{title}</AppText>
        </View>
        {/* {enableSwitch ? (
          <Switch
            style={styles.ic}
            value={props.enabled}
            onValueChange={value =>
              props.onChangeSwitch && props.onChangeSwitch(value)
            }
          />
        ) : (
          <Icon style={styles.ic} name="chevron-right" size={28} color="gray" />
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    height: 56,
  },
  ic: {
    marginRight: 12,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: "#fff",
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 12,
    // borderBottomWidth: 1,
    height: '100%',
    // borderColor: '#EEF0F4',
  },
});

export default ItemProfile;
