import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

     //Explore 

  exploreSearchInput: {
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: screenWidth * .80,
    height: 50,
    backgroundColor: '#F2F2F2',
    paddingLeft: 35,
  },
  exploreSearchIcon: {
    position: 'absolute',
    paddingLeft: '10%',
    zIndex: 1,
    bottom: 15,
    marginStart: '2%',
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    bottom: 15,
    alignSelf: 'flex-end',
    marginLeft: '76%',
  },
  ggsbButton: {
    width: screenWidth * .40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#E98B9C',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    marginHorizontal: '5%'
  },
  filterText: {
    backgroundColor: '#F2F2F2',
    width: screenWidth * .35,
    paddingVertical: '3%',
    borderRadius: 20,
    color: '#FF80A4',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '5%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: '5%',
    // justifyContent:'center'
  },

  filterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 8,
    height: 50,
    borderRadius: 14,
    marginStart: 10,

  },

  recentContainer : {
    marginStart: '5%',
    marginTop: '5%',
  },

  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },

  recentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF80A4',
    marginTop: '5%',
  },
  
  
  
  
    
});