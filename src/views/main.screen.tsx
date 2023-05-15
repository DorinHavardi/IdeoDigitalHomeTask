import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {API_URL} from '../config/config';
import {formatResponse} from '../utils/formatSheetResponse.util';
import SheetTable from '../components/table.cmp';
import Pie from '../components/pieChart.cmp';
import {ExcelIcon} from '../components/icons/excel.icon';

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
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Google Sheet DB</Text>
        <ExcelIcon />
        {tableData ? (
          <View>
            <SheetTable tableData={tableData} />
            <Pie pieData={tableData} />
          </View>
        ) : (
          <ActivityIndicator color={'blue'} size={'large'} />
        )}
      </ScrollView>
    </View>
  );
};

export default Main;
