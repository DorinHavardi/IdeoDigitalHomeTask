import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';

const App = () => {
  const [tableData, setTableData] = useState<any>();
  const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${Config.SHEET_ID}/values/${Config.SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${Config.API_KEY}`;

  const getSheet = async () => {
    try {
      const data = await axios
        .get(API_URL)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
      setTableData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSheet();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>My App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
