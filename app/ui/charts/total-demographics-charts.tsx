import {
  DonutChart,
  Card,
  Legend,
  BarChart,
  CustomTooltipProps,
} from '@tremor/react';
const genderDataPlaceholder = [
  {
    Gender: 'Male',
    Total: 530,
    'High Risk': 70,
    'Some Risk': 200,
    'Low Risk': 180,
  },
  {
    Gender: 'Female',
    Total: 550,
    'High Risk': 30,
    'Some Risk': 56,
    'Low Risk': 300,
  },
];

const ethnicityDataPlaceholder = [
  {
    Ethnicity: 'White',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    Ethnicity: 'Hispanic',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
  {
    Ethnicity: 'Other POC',
    'High Risk': 33,
    'Some Risk': 156,
    'Low Risk': 200,
  },
];

const englishLearnerDataPlaceholder = [
  {
    ELL: 'ELL',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    ELL: 'Not ELL',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
];

const totalPlaceholder = [
  {
    Saebrs: 'Saebrs',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    Saebrs: 'MySaebrs',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
];

const emotionalPlaceholder = [
  {
    Saebrs: 'Saebrs',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    Saebrs: 'MySaebrs',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
];

const socialPlaceholder = [
  {
    Saebrs: 'Saebrs',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    Saebrs: 'MySaebrs',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
];

const academicPlaceholder = [
  {
    Saebrs: 'Saebrs',
    'High Risk': 58,
    'Some Risk': 200,
    'Low Risk': 100,
  },
  {
    Saebrs: 'MySaebrs',
    'High Risk': 20,
    'Some Risk': 150,
    'Low Risk': 130,
  },
];

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + ' %';
};

const colors = ['rose-500', 'yellow-400', 'green-500'];

export function DonutChartGender() {
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={genderDataPlaceholder}
      index="Gender"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}

export function BarChartEthnicity() {
  return (
    <div className="flex items-center justify-center">
      <BarChart
        className="transition md:h-[30rem] md:w-[60rem]"
        data={ethnicityDataPlaceholder}
        index="Ethnicity"
        categories={['High Risk', 'Some Risk', 'Low Risk']}
        colors={colors}
        layout="horizontal"
        stack={true}
        barCategoryGap={70}
        valueFormatter={dataFormatter}
      />
    </div>
  );
}

export function BarChartEnglishLearner() {
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={englishLearnerDataPlaceholder}
      index="ELL"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}

export function BarChartTotal() {
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={totalPlaceholder}
      index="Saebrs"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}

export function EmotionalChart({
  emotionSaebrs,
  emotionMySaebrs,
}: {
  emotionSaebrs: any;
  emotionMySaebrs: any;
}) {
  console.log(emotionSaebrs);
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={[
        {
          Saebrs: 'Saebrs',
          'High Risk': emotionSaebrs['Saebrs']['High Risk'],
          'Some Risk': emotionSaebrs['Saebrs']['Some Risk'],
          'Low Risk': emotionSaebrs['Saebrs']['Low Risk'],
        },
        {
          Saebrs: 'MySaebrs',
          'High Risk': emotionMySaebrs['MySaebrs']['High Risk'],
          'Some Risk': emotionMySaebrs['MySaebrs']['Some Risk'],
          'Low Risk': emotionMySaebrs['MySaebrs']['Low Risk'],
        },
      ]}
      index="Saebrs"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}

export function SocialChart({
  socialSaebrs,
  mySocialMySaebrs,
}: {
  socialSaebrs: any;
  mySocialMySaebrs: any;
}) {
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={[
        {
          Saebrs: 'Saebrs',
          'High Risk': socialSaebrs['Saebrs']['High Risk'],
          'Some Risk': socialSaebrs['Saebrs']['Some Risk'],
          'Low Risk': socialSaebrs['Saebrs']['Low Risk'],
        },
        {
          Saebrs: 'MySaebrs',
          'High Risk': mySocialMySaebrs['MySaebrs']['High Risk'],
          'Some Risk': mySocialMySaebrs['MySaebrs']['Some Risk'],
          'Low Risk': mySocialMySaebrs['MySaebrs']['Low Risk'],
        },
      ]}
      index="Saebrs"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}

export function AcademicChart({
  academicSaebrs,
  academicMySaebrs,
}: {
  academicSaebrs: any;
  academicMySaebrs: any;
}) {
  return (
    <BarChart
      className="transition md:h-[30rem] md:w-[60rem]"
      data={[
        {
          Saebrs: 'Saebrs',
          'High Risk': academicSaebrs['Saebrs']['High Risk'],
          'Some Risk': academicSaebrs['Saebrs']['Some Risk'],
          'Low Risk': academicSaebrs['Saebrs']['Low Risk'],
        },
        {
          Saebrs: 'MySaebrs',
          'High Risk': academicMySaebrs['MySaebrs']['High Risk'],
          'Some Risk': academicMySaebrs['MySaebrs']['Some Risk'],
          'Low Risk': academicMySaebrs['MySaebrs']['Low Risk'],
        },
      ]}
      index="Saebrs"
      categories={['High Risk', 'Some Risk', 'Low Risk']}
      colors={colors}
      layout="horizontal"
      yAxisWidth={50}
      stack={true}
      barCategoryGap={140}
      valueFormatter={dataFormatter}
    />
  );
}
