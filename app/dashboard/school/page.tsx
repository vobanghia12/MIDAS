'use client';

import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useEffect, useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import { Card, Tooltip } from '@nextui-org/react';
import {
  AcademicChart,
  BarChartEnglishLearner,
  BarChartEthnicity,
  BarChartTotal,
  DonutChartGender,
  EmotionalChart,
  SocialChart,
} from '@/app/ui/charts/total-demographics-charts';
import Dropdown from '@/app/ui/Dropdown';
import useRiskOptions from '@/hooks/useRiskOptions';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { BarChart } from '@/app/ui/charts/BarChart';
function MidasRiskTooltipContent() {
  return (
    <div>Percentages of students at the three different MIDAS risk levels.</div>
  );
}

export default async function Page() {
  const riskOptions = useRiskOptions();
  const schooLevel = useSchoolLevel();
  const [midasRisk, setMidasRisk] = useState({
    low: '45%',
    some: '40%',
    high: '15%',
  });

  const [disciplineRisk, setDisciplineRisk] = useState({
    odrZero: '77%',
    odrSome: '23%',
    suspZero: '80%',
    suspSome: '20%',
  });

  const englishLearnerDataPlaceholder = [
    {
      id: 'ELL', // 250
      'High Risk': 0.2,
      'Some Risk': 0.35,
      'Low Risk': 0.45,
    },
    {
      id: 'Not ELL',
      'High Risk': 0.33,
      'Some Risk': 0.4,
      'Low Risk': 0.27,
    },
  ];

  const titleList = ['Acadmic, Social, Emotional'];

  const colors = ['rose-500', 'yellow-400', 'green-500'];
  return (
    <main>
      <div className="flex gap-4">
        {/* LEFT COL */}
        <div className="mb-4 flex basis-1/4 flex-col">
          <div className="flex flex-col">
            <div className="pb-4">
              <CardThreeValue
                title="MIDAS Risk Scores"
                values={[
                  midasRisk['low'],
                  midasRisk['some'],
                  midasRisk['high'],
                ]}
                subtitles={['Low', 'Some', 'High']}
                tooltip={MidasRiskTooltipContent()}
              />
            </div>

            <div className="pb-4">
              <CardConfidenceVisualizer
                confidence={schooLevel.confidenceLevel}
                confidenceThresholds={[1, 2, 3, 4, 5]}
              />
            </div>

            <div className="pb-4">
              <CardDisciplinarySummary
                title={'Disciplinary Action Summary'}
                valuesTop={[
                  disciplineRisk['odrZero'],
                  disciplineRisk['odrSome'],
                  disciplineRisk['odrSome'],
                ]}
                subtitlesTop={['Zero', 'One Plus', 'Zeo']}
                valuesBottom={[
                  schooLevel.riskMath
                    ? schooLevel.riskSuspension['susp_risk']['Low Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskSuspension['susp_risk']['Some Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskSuspension['susp_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>

            <div className="-mb-8">
              <CardTestScoreSummary
                title={'Test Score Risk Summary'}
                valuesTop={[
                  schooLevel.riskMath
                    ? schooLevel.riskMath['math_risk']['Low Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskMath['math_risk']['Some Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskMath['math_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesTop={['Low', 'Some', 'High']}
                valuesBottom={[
                  schooLevel.riskReading
                    ? schooLevel.riskReading['read_risk']['Low Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskReading['read_risk']['Some Risk'] + '%'
                    : '0%',
                  schooLevel.riskReading
                    ? schooLevel.riskReading['read_risk']['High Risk'] + '%'
                    : '0%',
                ]}
                subtitlesBottom={['Low', 'Some', 'High']}
              />
            </div>
          </div>
        </div>
        <div className=" flex h-full w-full flex-col gap-y-28">
          <div className="flex h-full w-full items-center justify-end">
            <Dropdown />
          </div>

          <div className="flex justify-center">
            {riskOptions.isEthnicity && <BarChartEthnicity />}
            {riskOptions.isEnglishLeaner && (
              <Card
                className="-mb-4 mr-2  h-96 basis-1/3 rounded-xl bg-neutral-100 pb-7"
                shadow="md"
              >
                <p className="-mb-8 pl-2 text-xl">
                  English Learner Status and Risk
                </p>
                <p className="-mb-8 mt-6 pl-2 text-sm">
                  Distribution of those at risk for each ELL and non-ELL
                  students
                </p>
                <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                  <BarChart
                    data={englishLearnerDataPlaceholder}
                    colors={colors}
                    legendVariable="ELL Status"
                  />
                </div>
              </Card>
            )}
            {riskOptions.isGender && <DonutChartGender />}
            {riskOptions.isTotalScore && <BarChartTotal />}
            {schooLevel.saeberAcademic &&
              schooLevel.mySaeberAcademic &&
              riskOptions.isAcademic && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">
                    Academic and Risk
                  </p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each academic performance
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            schooLevel.saeberAcademic['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saeberAcademic['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saeberAcademic['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schooLevel.mySaeberAcademic['MySaebrs'][
                              'Low Risk'
                            ] / 100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Academic"
                    />
                  </div>
                </Card>
              )}
            {schooLevel.saebrsEmotion &&
              schooLevel.mySaebrsEmotion &&
              riskOptions.isEmotional && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">
                    Emotional and Risk
                  </p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each emotion
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            schooLevel.saebrsEmotion['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saebrsEmotion['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saebrsEmotion['Saebrs']['Low Risk'] /
                            100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs'][
                              'High Risk'
                            ] / 100,
                          'Some Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs'][
                              'Some Risk'
                            ] / 100,
                          'Low Risk':
                            schooLevel.mySaebrsEmotion['MySaebrs']['Low Risk'] /
                            100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Emotional"
                    />
                  </div>
                </Card>
              )}
            {schooLevel.saeberSocial &&
              schooLevel.mySaeberSocial &&
              riskOptions.isSocial && (
                <Card
                  className=" -mb-4 mr-2 h-[26rem] w-8/12 rounded-xl bg-neutral-100 p-6"
                  shadow="md"
                >
                  <p className="-mb-8 p-2 text-xl font-bold">Social and Risk</p>
                  <p className="-mb-8 mt-6 pl-2 text-sm italic">
                    Distribution of those at risk for each social skill
                  </p>
                  <div className="mb-0 mt-auto flex h-full flex-col pt-10">
                    <BarChart
                      data={[
                        {
                          id: 'Saebrs',
                          'High Risk':
                            schooLevel.saeberSocial['Saebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.saeberSocial['Saebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.saeberSocial['Saebrs']['Low Risk'] / 100,
                        },
                        {
                          id: 'MySaebrs',
                          'High Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['High Risk'] /
                            100,
                          'Some Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['Some Risk'] /
                            100,
                          'Low Risk':
                            schooLevel.mySaeberSocial['MySaebrs']['Low Risk'] /
                            100,
                        },
                      ]}
                      colors={colors}
                      legendVariable="Social"
                    />
                  </div>
                </Card>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
