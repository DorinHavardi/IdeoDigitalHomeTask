import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {DataTable} from 'react-native-paper';
import ITable from '../types/table.type';

const SheetTable: FC<ITable> = ({tableData}) => {
  const titles = tableData.keys;
  const values = tableData.obj;

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          {titles.map((title: string, i: number) => {
            return <DataTable.Title key={i}>{title}</DataTable.Title>;
          })}
        </DataTable.Header>
        {values.map((item: any, i: number) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{item.Name}</DataTable.Cell>
            <DataTable.Cell>{item.Age}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
});

export default React.memo(SheetTable);
