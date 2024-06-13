'use client';

import { SaebrsSummary } from '@/app/ui/dashboard/cards/population/saebrs-summary';
import { PopToRiskCharts } from '@/app/ui/dashboard/cards/population/demographics-summary';
import { CardDisciplinarySummary } from '@/app/ui/dashboard/cards/population/disciplinary-summary';
import { CardTestScoreSummary } from '@/app/ui/dashboard/cards/population/test-scores-summary';
import { CardConfidenceVisualizer } from '@/app/ui/dashboard/cards/general/card-confidence';
import { useEffect, useState } from 'react';
import { CardThreeValue } from '@/app/ui/dashboard/cards/general/card-three-value';
import { Tooltip } from '@nextui-org/react';
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
function MidasRiskTooltipContent() {
  return (
    <div>Percentages of students at the three different MIDAS risk levels.</div>
  );
}

export default async function Page() {
  const riskOptions = useRiskOptions();
  const schooLevel = useSchoolLevel();
  const schoolData = useState({});
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

  // ASK SONJA WHAT THE VALUES FOR TEST RISK ARE
  const [testRisk, setTestRisk] = useState({});

  const [saebrsRisk, setSaebrsRisk] = useState({
    saebrsTotal: ['60%', '25%', '15%'],
    mySaebrsTotal: ['54%', '33%', '13%'],
    saebrsEmotional: ['59%', '33%', '8%'],
    mySaebrsEmotional: ['50%', '37%', '13%'],
    saebrsSocial: ['40%', '41%', '19%'],
    mySaebrsSocial: ['40%', '39%', '17%'],
    saebrsAcademic: ['72%', '16%', '12%'],
    mySaebrsAcademic: ['70%', '18%', '12%'],
  });
  console.log(schooLevel);
  console.log(schooLevel.saebrsEmotion['Saebrs']);

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
            {riskOptions.isEnglishLeaner && <BarChartEnglishLearner />}
            {riskOptions.isGender && <DonutChartGender />}
            {riskOptions.isTotalScore && <BarChartTotal />}
            {schooLevel.saeberAcademic &&
            schooLevel.mySaeberAcademic &&
            riskOptions.isAcademic ? (
              <AcademicChart
                academicSaebrs={schooLevel.saeberAcademic}
                academicMySaebrs={schooLevel.mySaeberAcademic}
              />
            ) : (
              <div></div>
            )}
            {schooLevel.saebrsEmotion &&
            schooLevel.mySaebrsEmotion &&
            riskOptions.isEmotional ? (
              <EmotionalChart
                emotionSaebrs={schooLevel.saebrsEmotion}
                emotionMySaebrs={schooLevel.mySaebrsEmotion}
              />
            ) : (
              <div></div>
            )}
            {schooLevel.saeberSocial &&
            schooLevel.mySaeberSocial &&
            riskOptions.isSocial ? (
              <SocialChart
                socialSaebrs={schooLevel.saeberSocial}
                mySocialMySaebrs={schooLevel.mySaeberSocial}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
