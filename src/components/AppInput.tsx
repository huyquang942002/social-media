import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Header, HeaderProps, Icon, makeStyles } from 'react-native-elements';
import AppText from './AppText';

interface IInputProps extends HeaderProps {
    title?: string;
    placeHolder?: string;
    setData: (data: any) => void;
    data?: any;
    keyBoardType?: any;
    disabled?: boolean;
    needVerify?: boolean;
    isVerify?: boolean;
    verify?: () => void;
    onPress?: () => void;
}
const useStyles = makeStyles(theme => ({
    action: {
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 6,
        alignItems: 'center',
        borderRadius: 15,
        paddingLeft: 15,
        backgroundColor: '#D9D9D9',
    },
    textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#333333',
    },
    userTitle: {
        color: '#555555',
        fontSize: 14,
        marginVertical: 10,
        fontWeight: 'bold',

    },

}));
const AppInput = (props: IInputProps) => {
    const { title, placeHolder, setData, data, keyBoardType, disabled, isVerify, needVerify, verify, onPress } = props;
    const styles = useStyles();

    return (
        <View>
            <AppText style={styles.userTitle}>{title}</AppText>
            <TouchableOpacity style={styles.action} onPress={onPress}>
                <TextInput
                    placeholder={placeHolder}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={data}
                    onChangeText={txt => setData(txt)}
                    style={styles.textInput}
                    keyboardType={keyBoardType}
                    editable={!disabled}
                />
                {needVerify ?
                    <TouchableOpacity onPress={verify}>
                        <Icon name='check-circle' type='font-awesome' color={isVerify ? 'green' : 'red'} size={20} style={{ marginEnd: 15 }} />
                    </TouchableOpacity>


                    : null}

            </TouchableOpacity>
        </View>
    );
};
export default AppInput;
