import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleCategoryNavigation = (categoryName) => {
    // Navigate to the respective category screen with the selected category name
    navigation.navigate('business-list', { category: categoryName });
  };

  return (
    <ScrollView>
      <Header onSearch={handleCategoryNavigation} />
      <View style={{ padding: 20 }}>
        <Slider />
        <Categories />
        <BusinessList />
      </View>
    </ScrollView>
  );
}
