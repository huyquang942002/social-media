import React from 'react';
import {View} from 'react-native';
import {makeStyles, OverlayProps} from 'react-native-elements';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import AppButton from './Button';

export interface IBottomModal extends OverlayProps {
  canCancel?: boolean;
  cancelTitle?: string;
  confirmTitle?: string;
  disabledConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  canDismiss?: boolean;
}
const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
  },
  overlayStyles: {
    position: 'absolute',
    width: '95%',
    bottom: 24,
    borderRadius: 8,
  },
  cancelButton: {
    marginTop: 8,
  },
}));
export const BottomModal = (props: IBottomModal) => {
  const {
    confirmTitle ="Confirm",
    cancelTitle = "Cancel",
  } = props;
  const styles = useStyles();

  return (
    <Overlay
      onBackdropPress={() =>
        props.canDismiss && props.onCancel && props.onCancel()
      }
      overlayStyle={styles.overlayStyles}
      {...props}>
      <View>{props.children}</View>
      <View>
        {!props.disabledConfirm && (
          <AppButton
            title={confirmTitle}
            onPress={() => {
              props.onConfirm && props.onConfirm();
            }}
          />
        )}
        {props.canCancel && (
          <AppButton
            buttonStyle={styles.cancelButton}
            title={cancelTitle}
            onPress={() => props.onCancel && props.onCancel()}
            cancel
          />
        )}
      </View>
    </Overlay>
  );
};
