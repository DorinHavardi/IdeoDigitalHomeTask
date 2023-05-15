import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import PieChart from 'react-native-pie-chart';
import {Colors} from '../theme/Colors';
import IPie from '../types/pie.type';

const Pie: FC<IPie> = ({pieData}) => {
  const {charcoal, persianGreen, saffron, sandyBrown} = Colors;
  const widthAndHeight = 250;
  const sliceColor = [charcoal, persianGreen, saffron, sandyBrown];

  const [segmented, setSegmented] = useState<number[]>([1, 1, 1, 1]);
  let ages = pieData.obj.map((a: any) => +a.Age);

  const segmentedAges = (ages: []) => {
    if (ages.length) {
      let levels: number[] = [0, 0, 0, 0];
      for (let i = 0; i < ages.length; i++) {
        const currentAge = ages[i];
        if (currentAge <= 18) levels[0]++;
        else if (currentAge > 18 && currentAge <= 35) levels[1]++;
        else if (currentAge > 35 && currentAge <= 70) levels[2]++;
        else levels[3]++;
      }
      setSegmented(levels);
    }
  };

  useEffect(() => {
    segmentedAges(ages);
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Basic</Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={segmented}
          sliceColor={sliceColor}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default React.memo(Pie);
