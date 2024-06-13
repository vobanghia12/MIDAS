'use client';

import {
  FaceSmileIcon,
  AcademicCapIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import MaterialSymbolsLightPersonAlertOutline from '../../../icons/MaterialSymbolsLightPersonAlertOutline';
import { Text, Tooltip } from '@geist-ui/core';

import clsx from 'clsx';
import React from 'react';

function VerticalDivider() {
  return <div className="mx-4 w-0 border border-zinc-200">&nbsp;</div>;
}

const iconMap = {
  total: MaterialSymbolsLightPersonAlertOutline,
  emotional: FaceSmileIcon,
  social: UsersIcon,
  academic: AcademicCapIcon,
};

function RiskTitle({
  title,
  type,
}: {
  title: string;
  type: 'total' | 'emotional' | 'social' | 'academic';
}) {
  const Icon = iconMap[type];

  return (
    <div className="flex flex-row items-center justify-start">
      {Icon ? <Icon className="h-6 w-6 text-gray-700" /> : null}
      <p className="pl-2">{title}</p>
    </div>
  );
}

function RiskRow({ title, riskValue }: { title: string; riskValue: string }) {
  return (
    <div className="">
      {/* SAEBRS ROW */}
      <div className="mb-2 flex h-20 flex-row rounded-xl bg-zinc-50 px-4 shadow-sm">
        <div className="flex w-full flex-col">
          <p className="-ml-2">{title}</p>

          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl">{riskValue?.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaebrsSummary({
  saebrsTotal,
  mySaebrsTotal,
  saebrsEmotional,
  mySaebrsEmotional,
  saebrsSocial,
  mySaebrsSocial,
  saebrsAcademic,
  mySaebrsAcademic,
}: {
  saebrsTotal: string;
  mySaebrsTotal: string;
  saebrsEmotional: string;
  mySaebrsEmotional: string;
  saebrsSocial: string;
  mySaebrsSocial: string;
  saebrsAcademic: string;
  mySaebrsAcademic: string;
}) {
  // min-w-fit max-w-sm on tooltip className if break
  return (
    // MAIN ROW
    <div className="flex flex-row  rounded-xl bg-zinc-100 px-8 pb-4 pt-6 shadow-md">
      {/* TOTAL RISK COLUMN */}
      <Tooltip
        text="Total Saebrs and MySaebrs score tooltip"
        placement="bottom"
        className="flex basis-1/4 flex-col"
      >
        <RiskTitle title="Total" type="total" />
        <RiskRow title="Saebrs" riskValue={saebrsTotal} />
        <RiskRow title="MySaebrs" riskValue={mySaebrsTotal} />
      </Tooltip>

      <VerticalDivider />

      {/* EMOTIONAL RISK COLUMN */}
      <Tooltip
        text="Emotional Saebrs and MySaebrs score tooltip"
        placement="bottom"
        className="flex basis-1/4 flex-col"
      >
        <RiskTitle title="Emotional" type="emotional" />
        <RiskRow title="Saebrs" riskValue={saebrsEmotional} />
        <RiskRow title="MySaebrs" riskValue={mySaebrsEmotional} />
      </Tooltip>

      <VerticalDivider />

      {/* SOCIAL RISK COLUMN */}
      <Tooltip
        text="Social Saebrs and MySaebrs score tooltip"
        placement="bottom"
        className="flex basis-1/4 flex-col"
      >
        <RiskTitle title="Social" type="social" />
        <RiskRow title="Saebrs" riskValue={saebrsSocial} />
        <RiskRow title="MySaebrs" riskValue={mySaebrsSocial} />
      </Tooltip>

      <VerticalDivider />

      {/* ACADEMIC RISK COLUMN */}
      <Tooltip
        text="Academic Saebrs and MySaebrs score tooltip"
        placement="bottom"
        className="flex basis-1/4 flex-col"
      >
        <RiskTitle title="Academic" type="academic" />
        <RiskRow title="Saebrs" riskValue={saebrsAcademic} />
        <RiskRow title="MySaebrs" riskValue={mySaebrsAcademic} />
      </Tooltip>
    </div>
  );
}
