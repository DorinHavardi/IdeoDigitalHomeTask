import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import PieChart from 'react-native-pie-chart';
import {Colors} from '../theme/Colors';
import IPie from '../types/pie.type';
import {getFontSizeByWindowWidth} from '../utils/window.utils';

const Pie: FC<IPie> = ({pieData}) => {
  const {charcoal, persianGreen, saffron, sandyBrown} = Colors;
  const widthAndHeight = 250;
  const sliceColors = [charcoal, persianGreen, saffron, sandyBrown];
  const indexLabels = ['0-18', '19-35', '36-70', '70+'];

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
      <Text style={styles.title}>Segmentation</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={segmented}
        sliceColor={sliceColors}
      />
      <Text style={styles.title}>Index</Text>
      <View style={styles.indexContainer}>
        {sliceColors.map((color: string, i: number) => (
          <View style={styles.cubeLabel} key={i}>
            <View style={[styles.cube, {backgroundColor: color}]} />
            <Text>{indexLabels[i]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    paddingTop: 0,
  },
  title: {
    fontSize: getFontSizeByWindowWidth(16),
    margin: 10,
  },
  indexContainer: {
    flexDirection: 'row',
  },
  cubeLabel: {
    flexDirection: 'row',
    marginEnd: 5,
    alignItems: 'center',
  },
  cube: {
    height: 20,
    width: 20,
    margin: 2.5,
  },
});

export default React.memo(Pie);
