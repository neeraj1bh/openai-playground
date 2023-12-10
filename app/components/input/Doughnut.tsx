import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export const CHART_COLOR = [
  '#44B2E8',
  '#A68CE9',
  '#F2BF56',
  '#3ECF8E',
  '#ffa17b',
  '#fbd768',
  '#C4EFFE',
  '#9251AB',
];

ChartJS.register(ArcElement, Tooltip);
export const DoughnutChart = ({
  chartData,
  width,
  height,
  labels = [],
}: {
  chartData: number[];
  width?: string;
  height?: string;
  labels?: string[];
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Usage',
        data: chartData,
        backgroundColor: CHART_COLOR,
        borderWidth: 0.5,
      },
    ],
  };
  return (
    <Doughnut
      width={150}
      height={150}
      className="mx-auto "
      data={data}
      options={{
        cutout: '75%',
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      }}
    />
  );
};
