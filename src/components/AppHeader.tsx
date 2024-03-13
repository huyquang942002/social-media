import React from 'react';
import {Header, HeaderProps, Icon, makeStyles} from 'react-native-elements';

interface IHeaderProps extends HeaderProps {
  title?: string;
  filled?: boolean;
  hideBack?: boolean;
  rightText?: boolean;
  onPressLeft?: () => void;
  onRightButton?: () => void;
  rightComponent?: any;
  transparent?: boolean;
  navigation?: any;
  onGoback?: () => void
}
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    zIndex: 9999,
    paddingVertical: 20,
  },
  containerFilled: {
    backgroundColor: theme.colors?.primary,
  },
  containerTransparent: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#142F43',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 10
  },
  titleFilled: {
    color: 'white',
    fontWeight: '700',
  },
}));
const AppHeader = (props: IHeaderProps) => {
  const {filled, title, hideBack, transparent, navigation, onGoback} = props;
  const styles = useStyles();

  return (
    <Header
      {...props}
      containerStyle={[
        styles.container,
        filled ? styles.containerFilled : null,
        transparent ? styles.containerTransparent : null,
      ]}
      leftComponent={
        !hideBack ? (
          <Icon
            onPress={() => onGoback == null ? navigation.goBack() : onGoback()}
            color={filled || transparent ? 'white' : 'black'}
            name="chevron-left"
            type="material-community"
            size={30}
          />
        ) : undefined
      }
      centerComponent={{
        text: title,
        style: {
          ...styles.title,
          ...(filled || transparent ? styles.titleFilled : {}),
        },
      }}
      rightComponent={props.rightComponent != null ? props.rightComponent : undefined}
    />
  );
};
export default AppHeader;
