import React from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

interface HabitEntry {
  habit_reference: number;
  name: string;
  count: number;
  lifetime_count: number;
  times_per_week: number;
}

interface LifetimeCompletionProps {
  lifetimeCompletion: HabitEntry[];
}

const LifetimeCompletionChart: React.FC<LifetimeCompletionProps> = ({
  lifetimeCompletion,
}) => {

    const data = lifetimeCompletion.map((datum) => ({
        ...datum,
        calculatedValue: datum.times_per_week * 4,
      }));
    
  return (
    <View >
    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 20 }} width={300} height={200} >
    <VictoryAxis tickFormat={() => ''} />
      <VictoryBar
        data={data}
        x="name"
        y="calculatedValue"
        barRatio={0.8}
        style={{
          data: { width: 20 },
        }}
      />
      <VictoryBar
        data={data}
        x="name"
        y="count"
        barRatio={0.8}
        style={{
          data: { fill: 'green', width: 20 },
        }}
      />
    </VictoryChart>
    <Text style={{ textAlign: 'center', fontSize: 20, marginTop: -30, marginRight: -20, color: 'darkblue' }}>Habit Completion for the Month</Text>
  </View>
  );
};

export default LifetimeCompletionChart;
