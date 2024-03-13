import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import { Text } from 'react-native-elements';

interface IAppTextProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  subtitle1?: boolean;
  subtitle2?: boolean;
  subtitle3?: boolean;
  body1?: boolean;
  body2?: boolean;
  body3?: boolean;
  button?: boolean;
  caption?: boolean;
  overline?: boolean;
  white?: boolean;
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 8),
    color: 'black',
  },
  white: {
    color: 'white',
  },
  h1: {
    fontWeight: '300',
    fontSize: 40,
  },
  h2: {
    fontWeight: '300',
    fontSize: 36,
  },
  h3: {
    fontWeight: '400',
    fontSize: 32,
  },
  h4: {
    fontWeight: '400',
    fontSize: 28,
  },
  h5: {
    fontWeight: '400',
    fontSize: 24,
  },
  h6: {
    fontWeight: '700',
    fontSize: 16,
  },
  subtitle1: {
    fontWeight: '400',
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle3: {
    fontWeight: '600',
    fontSize: 14,
  },
  body1: {
    fontWeight: '400',
    fontSize: 16,
  },
  body2: {
    fontWeight: '400',
    fontSize: 14,
  },
  body3: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(84, 84, 86, 1)',
  },
  button: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  caption: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(84, 84, 86, 1)',
  },
  overline: {
    fontWeight: '400',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
const AppText = (props: IAppTextProps) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    body3,
    subtitle1,
    subtitle2,
    subtitle3,
    caption,
    button,
    overline,
  } = props;
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        styles.container,
        h1 ? styles.h1 : null,
        h2 ? styles.h2 : null,
        h3 ? styles.h3 : null,
        h4 ? styles.h4 : null,
        h5 ? styles.h5 : null,
        h6 ? styles.h6 : null,
        subtitle1 ? styles.subtitle1 : null,
        subtitle2 ? styles.subtitle2 : null,
        subtitle3 ? styles.subtitle3 : null,
        body1 ? styles.body1 : null,
        body2 ? styles.body2 : null,
        body3 ? styles.body3 : null,
        button ? styles.button : null,
        caption ? styles.caption : null,
        overline ? styles.overline : null,
        props.white ? styles.white : null,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export default AppText;
