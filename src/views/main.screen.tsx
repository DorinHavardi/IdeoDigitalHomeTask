import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {API_URL} from '../config/config';
import {formatResponse} from '../utils/formatSheetResponse.util';
import SheetTable from '../components/table.cmp';
import Pie from '../components/pieChart.cmp';
import {ExcelIcon} from '../components/icons/excel.icon';
import {getFontSizeByWindowWidth} from '../utils/window.utils';
import Loader from '../components/loader.cmp';
import {Colors} from '../theme/Colors';

const Main = () => {
  const [tableData, setTableData] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getData();
    const id = setInterval(getData, 10000);
    return () => clearInterval(id);
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios.get(`${API_URL}`);
      const formattedData = formatResponse(data);
      setTableData(formattedData);
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    getData().then(() => {
      setRefresh(false);
    });
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          tintColor={Colors.sandyBrown}
          refreshing={refresh}
          onRefresh={onRefresh}
        />
      }>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Google Sheet DB</Text>
        <ExcelIcon />
      </View>
      {tableData ? (
        <>
          <SheetTable tableData={tableData} />
          <Pie pieData={tableData} />
        </>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: getFontSizeByWindowWidth(20),
  },
});
