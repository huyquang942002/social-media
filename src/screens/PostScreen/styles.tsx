import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  postTopContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    borderRadius: 20,
    height: 44,
    width: 44,
  },
  postHeaderTextContainer: {
    flexDirection: 'column',
    // paddingTop: 12,
    paddingLeft: 15,
  },
  postUserNameText: {
    fontWeight: 'bold',
    color: '#1D1A20',
  },
  postCreateTimeText: {
    // paddingTop: 6,
    color: '#A4A4B2',
    fontSize: 12,
  },
  postIconContainer: {
    position: 'absolute',
    right: 0,
  },
  postIconStyle: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelButtonContainer: {
    alignItems: 'center',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 7,
    justifyContent: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  postContentContainer: {
    // paddingHorizontal: '5%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#142F43',
    alignSelf: 'center',
    marginTop: 6,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: 0, height: 3},
    // textShadowRadius: 10
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  bottomText: {
    flex: 1,
    marginStart: 10,
  },
  bottomIcon: {
    marginStart: 15,
  },
  overlay: {
    position: 'absolute',
    width: '95%',
    bottom: 24,
    borderRadius: 8,
  },
  tagText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop: 10,
  },
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

});