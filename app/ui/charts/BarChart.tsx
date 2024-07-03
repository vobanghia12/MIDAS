import { ResponsiveBar } from '@nivo/bar';

export function BarChart({
  data,
  colors,
  legendVariable,
}: {
  data: {
    id: string;
    'High Risk': number;
    'Some Risk': number;
    'Low Risk': number;
  }[];
  colors: string[];
  legendVariable: string;
}) {
  return (
    <div className='min-h-full'>

    <ResponsiveBar
      data={data}
      keys={['High Risk', 'Some Risk', 'Low Risk']}
      indexBy="id"
      margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
      padding={0.6}
      groupMode="stacked"
      colors={['#f87171', '#fde047', '#4ade80']}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      valueFormat={' >-.1%'}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: legendVariable,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-right',
          direction: 'row',
          justify: true,
          translateX: 0,
          translateY: -50,
          itemsSpacing: 50,
          itemWidth: 65,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 10,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
    />
        </div>
  );
}
