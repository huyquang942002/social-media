import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

interface IAppButtonProps extends ButtonProps {
  shadow?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  filled?: boolean;
  customBtnStyle?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 50,
    marginTop: 16,
    borderRadius: 15,
  },
  button: {
    // borderRadius: 50,
    height: '100%',
    maxHeight: 100,
    backgroundColor: 'transparent',
  },
  disableButton: {
    backgroundColor: 'transparent',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  cancelTitle: {
    color: 'black',
  },
  filledContainer: {
    backgroundColor: 'transparent',
  },
  filledTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#F78239',
  },
});

const AppButton = (props: IAppButtonProps) => {
  return (
    <LinearGradient
      colors={['#F78239', '#FF005C']}
      style={[
        styles.buttonContainer,
        // props.shadow ? GlobalStyles.shadow : null,
        props.buttonStyle ? props.buttonStyle : null,
      ]}>
      <Button
        // disabledTitleStyle={{color: 'white'}}
        disabledStyle={styles.disableButton}
        disabled={props.disabled}
        titleStyle={[
          styles.title,
          props.cancel ? styles.cancelTitle : null,
          props.filled ? styles.filledTitle : null,
          props.textStyles,
        ]}
        {...props}
        buttonStyle={[
          styles.button,
          props.cancel ? styles.cancelButton : null,
          props.filled ? styles.filledContainer : null,
          props.customBtnStyle,
        ]}
      />
    </LinearGradient>
  );
};
export default AppButton;
