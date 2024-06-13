import clsx from 'clsx';
import { nunito } from '@/app/ui/fonts';
import React from 'react';
import { Text, Tooltip } from '@geist-ui/core';

function Interior({
  title,
  values,
  subtitles,
  padding,
}: {
  title: string;
  values: [string | number, string | number];
  subtitles: [string, string];
  padding: string;
}) {
  return (
    <div className={'flex h-20 flex-col rounded-xl bg-zinc-50 ' + padding}>
      {/* CONTENT ROW */}
      <p className={`${nunito.className} text-md ml-2`}> {title} </p>
      <div className="-mx-2 flex flex-row px-8">
        {/* LEFT COLUMN */}
        <div className="ml-4 mr-16 flex basis-1/2 flex-col items-center">
          {/* VALUE DIV */}
          <div className="-mb-1">
            <p
              className={clsx('text-3xl font-semibold', {
                'text-slate-600': values[0].toString().toLowerCase() === 'na',
              })}
            >
              {values[0].toString().toUpperCase()}
            </p>
          </div>

          {/* SUBTITLE DIV */}
          <div>
            <p className="text-sm font-extralight italic">{subtitles[0]}</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ml-16 mr-4 flex basis-1/2 flex-col items-center">
          {/* VALUE DIV */}
          <div className="">
            <p
              className={clsx('text-3xl font-semibold', {
                'text-slate-600': values[1].toString().toLowerCase() === 'na',
              })}
            >
              {values[1].toString().toUpperCase()}
            </p>
          </div>

          {/* SUBTITLE DIV */}
          <div className="">
            <p className="text-sm font-extralight italic">{subtitles[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardTestsAndDisciplineSummary({
  title,
  subtitlesTop,
  subtitlesBottom,
  valuesTop,
  valuesBottom,
}: {
  title: string;
  subtitlesTop: [string, string];
  subtitlesBottom: [string, string];
  valuesTop: [string, string] | [number, number];
  valuesBottom: [string, string] | [number, number];
}) {
  return (
    <div>
      {/* MAIN DIV */}
      <div className="rounded-xl bg-zinc-100 p-4 shadow-md">
        {/* MAIN TITLE */}
        <h3 className="mb-2 text-lg font-medium text-slate-800">{title}</h3>

        {/* MAIN COLUMN */}
        <div className="flex flex-col">
          {/* CARD 1 --- ODR */}
          <Tooltip
            text={'Test Scores Tooltip'}
            placement="bottom"
            enterDelay={450}
            className="min-w-full shadow-sm"
          >
            <Interior
              title="Test Risk Scores"
              values={valuesTop}
              subtitles={subtitlesTop}
              padding="mb-2"
            />
          </Tooltip>
          {/* CARD 2 --- SUSPENSIONS */}
          <Tooltip
            text={'Discipline Tooltip'}
            placement="bottom"
            enterDelay={450}
            className="min-w-full shadow-sm"
          >
            <Interior
              title="Disciplinary Risk Scores"
              values={valuesBottom}
              subtitles={subtitlesBottom}
              padding=""
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
