import React, { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import { makeStyles } from 'react-native-elements';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';

interface IPinCodeInput {
  onFinish?: (value: string) => void;
}
const useStyles = makeStyles(theme => ({
  focus: {
    borderColor: theme.colors?.primary,
    borderWidth: 1,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: '#F4EFEE',
    marginHorizontal: 6,
    height: 56,
    width: 46,
    borderRadius: 8,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  pinCodeContainer: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export const PinCodeInput = forwardRef<OtpInputsRef, IPinCodeInput>(
  (props, ref) => {
    const onChange = (code: string) => {
      if (code.length === 4 && props.onFinish) {
        props.onFinish(code);
      }
    };
    const styles = useStyles();

    return (
      <View style={styles.container}>
        <OtpInputs
          secureTextEntry
          autofillFromClipboard={false}
          clearTextOnFocus={true}
          keyboardType='phone-pad'
          handleChange={code => onChange(code)}
          numberOfInputs={4}
          autoFocus={true}
          textAlign="center"
          focusStyles={styles.focus}
          inputContainerStyles={styles.inputContainer}
          inputStyles={styles.input}
          style={styles.pinCodeContainer}
          ref={ref}
        />
      </View>
    );
  },
);
