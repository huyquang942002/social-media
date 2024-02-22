import React from 'react';
import { View } from 'react-native';
import { makeStyles, OverlayProps } from 'react-native-elements';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import AppButton from './Button';
import AppText from './AppText';

interface IBottomModal extends OverlayProps {
  canCancel?: boolean;
  cancelTitle?: string;
  confirmTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabledConfirm?: boolean;
  disableButton?: boolean;
  title?: string;
}
const useStyles = makeStyles(theme => ({
  buttonContainer: {
    // width: 50,
    // height: 40
  },
  overlayStyles: {
    position: 'absolute',
    width: '70%',
    // bottom: Mixin.moderateSize(24),
    borderRadius: 8,
  },
  cancelButton: {
    // marginTop: Mixin.moderateSize(8),
    // color: 'white'
    height: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonStyle: {
    fontSize: 15
  }

}));
export const AppModal = (props: IBottomModal) => {
  const {
    confirmTitle = "Confirm",
    cancelTitle = "Cancel",
  } = props;
  const styles = useStyles();

  return (
    <Overlay
      {...props}
      overlayStyle={[styles.overlayStyles, props.overlayStyle]}>
      <AppText style={styles.title}>{props.title}</AppText>
      <View>{props.children}</View>
      {props?.disableButton ? null : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '47%' }}>
            {props.canCancel && (
              <AppButton
                buttonStyle={styles.cancelButton}
                title={cancelTitle}
                onPress={() => props.onCancel && props.onCancel()}
                textStyles={styles.buttonStyle}
              />
            )}
          </View>
          <View style={{ width: '47%' }}>
            <AppButton
              buttonStyle={styles.cancelButton}
              disabled={props.disabledConfirm}
              title={confirmTitle}
              onPress={() => {
                props.onConfirm && props.onConfirm();
              }}
              textStyles={styles.buttonStyle}
            />
          </View>
        </View>
      )}
    </Overlay>
  );
};
