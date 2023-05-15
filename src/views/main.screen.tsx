import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {API_URL} from '../config/config';
import {formatResponse} from '../utils/formatSheetResponse.util';
import SheetTable from '../components/table.cmp';

const Main = () => {
  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await axios.get(`${API_URL}`);
        const formattedData = formatResponse(data);
        setTableData(formattedData);
      } catch (error) {
        Alert.alert(`${error}`);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {tableData ? (
          <SheetTable tableData={tableData} />
        ) : (
          <ActivityIndicator color={'blue'} size={'large'} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
