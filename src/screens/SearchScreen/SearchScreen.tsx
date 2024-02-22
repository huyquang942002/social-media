import React, { useEffect } from 'react';
import { TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader';
import { styles } from './styles';
import AppText from '../../components/AppText';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const fakeData = ["Chó bị thất lạc", "Chó bị bệnh", "Mèo nâu đen"];
interface Types {
  navigation: any;
}
const SearchScreen: React.FC<Types> = ({ navigation }) => {
  const [recentSearch, setRecentSearch] = React.useState<string[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');

  useEffect(() => {
    // fetch recent search from AsyncStorage
    setRecentSearch(fakeData);
  });

  return (
    <View style={styles.container}>
      <AppHeader title={'Search'} navigation={navigation} />

      <View style={styles.rowContainer}>
        <Ionicons name="ios-search-outline" color={'#AEAEAE'} size={20} style={styles.exploreSearchIcon} />
        <TextInput 
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => navigation.navigate('SearchDetail', {searchText: searchText})} style={styles.exploreSearchInput} placeholder={'What are you looking for?'} placeholderTextColor={'#AEAEAE'} />
        <Ionicons name="close" color={'#AEAEAE'} size={16} style={styles.closeIcon} />

        <View>
          <Icon name="tune" color={'#7E8389'} size={20} style={styles.filterIconContainer} />
        </View>
      </View>


      <View style={styles.filterRow}>
        <AppText style={styles.filterText}>PET LOST</AppText>
        <AppText style={styles.filterText}>PET DISEASES</AppText>
      </View>
      <View style={{ alignItems: 'center' }}>
        <AppText style={styles.filterText}>PET EVENT</AppText>
      </View>

      <FlatList
        style={styles.recentContainer}
        ListHeaderComponent={() => <AppText style={styles.recentTitle}>Recent Search</AppText>}
        data={recentSearch}
        renderItem={({ item }) => <AppText style={styles.recentText}>{item}</AppText>}
        keyExtractor={item => item}
      />

    </View>
  );
};

export default SearchScreen;

