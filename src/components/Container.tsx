import React from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollViewProps,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IContainerProps extends ScrollViewProps { }
const device_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
  },
  container: {
    width: device_width,
    flex: 1,
  },
});

const Container = (props: IContainerProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        scrollEnabled={props.scrollEnabled}
        contentContainerStyle={styles.contentContainer}>
        {props.children}
      </KeyboardAwareScrollView>
    </TouchableOpacity>
  );
};

export default Container;
