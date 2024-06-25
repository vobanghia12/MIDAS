import { Key, useState } from 'react';
import { BarChart } from '@/app/ui/charts/BarChart';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Card,
} from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Nunito } from 'next/font/google';
import { DonutChart } from '@/app/ui/charts/donut-chart';
const nunito = Nunito({
  weight: ['200', '200'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

function Capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const genderDataPlaceholder = [
  {
    id: 'Male',
    value: 500,
  },
  {
    id: 'Female',
    value: 548,
  },
];

const ethnicityDataPlaceholder = [
  {
    id: 'White',
    value: 358,
  },
  {
    id: 'Hispanic',
    value: 300,
  },
  {
    id: 'Other POC',
    value: 390,
  },
];

const englishLearnerDataPlaceholder = [
  {
    id: 'ELL',
    value: 800,
  },
  {
    id: 'Not ELL',
    value: 248,
  },
];

export function RiskCharts() {
  const [genderRiskSample, setGenderRiskSample] = useState('high');
  const [ethnicityRiskSample, setEthnicityRiskSample] = useState('high');
  const [ellRiskSample, setEllRiskSample] = useState('high');

  return (
    <div className={`${nunito.className} flex basis-full flex-row gap-2`}>
      <Card
        className="flex basis-1/3 flex-col rounded-xl bg-neutral-100 pb-8"
        shadow="md"
      >
        <p className="pb-10 text-2xl">Gender</p>
        <div className="-mb-16 flex w-full justify-center">
          <p className="text-2xl">Male</p>
        </div>

        <DonutChart
          data={genderDataPlaceholder}
          colors={['#f87171', '#a5f3fc']}
          selectedSlice={'Male'}
        />
      </Card>

      <Card
        className="flex basis-1/3 flex-col rounded-xl bg-neutral-100 pb-8 "
        shadow="md"
      >
        <p className="pb-10 text-2xl">English Learner Status</p>
        <div className="-mb-16 flex w-full justify-center">
          <p className="text-2xl">English Learner</p>
        </div>

        <DonutChart
          data={englishLearnerDataPlaceholder}
          colors={['#4ade80', '#a3a3a3']}
          selectedSlice={'ELL'}
        />
      </Card>

      <Card
        className="flex basis-1/3 flex-col rounded-xl bg-neutral-100 pb-8"
        shadow="md"
      >
        <p className="pb-10 text-2xl ">Ethnicity</p>
        <div className="-mb-16 flex w-full justify-center">
          <p className="text-2xl">White</p>
        </div>

        <DonutChart
          data={ethnicityDataPlaceholder}
          colors={['#f87171', '#a5f3fc', '#4ade80']}
          selectedSlice={'White'}
        />
      </Card>
    </div>
  );
}
