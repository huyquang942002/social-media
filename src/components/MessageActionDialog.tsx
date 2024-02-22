import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import AppText from "./AppText"
import { Overlay } from "react-native-elements";
import AppButton from "./Button";

export const MessageActionDialog = ({ deleteMessage, replyMessage, copyMessage, isVisible, setIsVisible }: any) => (
    <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        overlayStyle={styles.overlay}>
        <View>
            <TouchableOpacity onPress={copyMessage}>
                <AppText style={styles.actionText}>Copy message</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={replyMessage}>
                <AppText style={styles.actionText}>Reply message</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteMessage}>
                <AppText style={styles.actionText}>Delete message</AppText>
            </TouchableOpacity>
        </View>
    </Overlay>
)


const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        // borderRadius: 8,
    },
    actionText: {
        fontSize: 16,
        marginVertical: 14,
        marginStart: 12,
    }
})