import { Text, View, Image, SectionList } from 'react-native'
import React from 'react'
import AppHeader from '../../components/AppHeader'
import { images } from '../../../assets';
import { styles } from './styles';
import AppText from '../../components/AppText';
interface Types {
  navigation: any;
}

const NotificationItem = () => {
  return (
    <View style={styles.rowStyles}>
      <Image source={images.avatarDemo} style={styles.avatarStyles} />
      <View>
        <AppText style={styles.textStyles}>David followed you</AppText>
        <AppText style={styles.subTextStyles}>Just now</AppText>
      </View>
    </View>
  )
}

const NotificationList = ({ data }: any) => {
  return (
    <SectionList
      sections={data}
      renderItem={() => <NotificationItem />}
      keyExtractor={(item) => item.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <AppText style={styles.header}>{title}</AppText>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    />
  )
}

const Notifications: React.FC<Types> = ({ navigation }) => {
  const fakedata = [
    {
      title: 'Newest',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Older',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },

  ];
  return (
    <View style={styles.newContainer}>
      <AppHeader title={"Notifications"} navigation={navigation} rightComponent={() => <Image style={styles.topIcon} source={images.catImg} resizeMode='cover' />} />
      <NotificationList data={fakedata} />

    </View>
  )
}

export default Notifications
