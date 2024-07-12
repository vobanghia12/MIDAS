'use client';

import React from 'react';
import {  Tooltip } from '@geist-ui/core';

import { BarChartEnglishLearner, BarChartEthnicity, DonutChartGender } from '@/app/ui/charts/total-demographics-charts';


export function CardStudentDemographics({
  title,
  subtitles,
  values,
  capitalize
}: {
  title: string;
  subtitles: [string, string, string]
  values: [string, string, string] | [string, string | number, string];
  capitalize: boolean
}) {

  return (
    <div>
      {/* MAIN DIV */}
      <div className="rounded-xl p-4 bg-zinc-100 shadow-sm">
        {/* MAIN TITLE */}
        <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>

        {/* MAIN COLUMN */}
        <div className='flex flex-col'>
          
          {/* CARD 1 --- GENDER */}
          <Tooltip text = {<DonutChartGender/>} 
            placement='left' enterDelay={450} className='min-w-full'
          >
            <div className='flex flex-col bg-zinc-50 rounded-xl h-20 items-center shadow-sm'>
              <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">{subtitles[0]}</p>
              <p className='font-semibold text-3xl text-slate-800 -mt-3 mb-auto justify-center'>
                {capitalize ? values[0].toString().toUpperCase() : values[0].toString()}
              </p>
            </div>
          </Tooltip>

          {/* CARD 2 --- ETHNICITY */}
          <Tooltip text = {<BarChartEthnicity/>} 
            placement='left' enterDelay={450} className='min-w-full'
          >
            <div className='flex flex-col bg-zinc-50 rounded-xl h-20 mt-4 items-center shadow-sm'>
            <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">{subtitles[1]}</p>
              <p className='font-semibold text-3xl text-slate-800 -mt-3 mb-auto justify-center'>
                {capitalize ? values[1].toString().toUpperCase() : values[1].toString()}
              </p>
            </div>
          </Tooltip>

          {/* CARD 3 --- ENGLISH LANGUAGE LEARNER */}
          <Tooltip text = {<BarChartEnglishLearner/>} 
            placement='left' enterDelay={450} className='min-w-full'
          >
            <div className='flex flex-col bg-zinc-50 rounded-xl h-20 mt-4 items-center shadow-sm'>
            <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">{subtitles[2]}</p>
              <p className='font-semibold text-3xl text-slate-800 -mt-3 mb-auto justify-center'>
                {capitalize ? values[2].toString().toUpperCase() : values[2].toString()}
              </p>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    
  );
}