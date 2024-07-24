import { ResponsivePie } from '@nivo/pie';

export function DonutChart({
  data,
  colors,
  selectedSlice,
}: {
  data: { id: string; value: number }[];
  colors: string[];
  selectedSlice?: string;
}) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 0, right: 90, bottom: 0, left: 110 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={18} // This expands the active slice
      colors={({ id }) => {
        const index = data.findIndex((d) => d.id === id);
        return colors[index % colors.length];
      }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      activeId={selectedSlice}
      onClick={(node, event) => {
        console.log(node);
      }}
    />
  );
}
