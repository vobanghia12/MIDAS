'use client';

import clsx from 'clsx';
import { nunito } from '@/app/ui/fonts';
import React from 'react';
import { Tooltip } from '@geist-ui/core';
import { ConfidenceIntervalVisualizer } from '../../confidence-visualizer';


function MidasRisk({
  midasRisk
}: {
  midasRisk: string;
}) {
  return (
    <Tooltip text = {"MIDAS RISK TOOLTIP PLACEHOLDER"} placement='left' enterDelay={450} className='min-w-full'>
      <div className='flex flex-col bg-zinc-50 rounded-xl h-20 items-center shadow-sm'>
        <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">
          {'MIDAS Risk'}
        </p>
        <p className='font-semibold text-3xl text-slate-800 -mt-3 mb-auto justify-center'>
          {midasRisk.toUpperCase()}
        </p>
      </div>
    </Tooltip>
  );
  
}


function MissingVariables({
  missingVariablesCount
}: {
  missingVariablesCount: number
}) {
  return (
    <Tooltip text = {"MISSING VARIABLES COUNT TOOLTIP PLACEHOLDER"} placement='left' enterDelay={450} className='min-w-full'>
      <div className='flex flex-col bg-zinc-50 rounded-xl h-20 mt-4 items-center shadow-sm'>
        <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">
          {"Missing Variables Count"}
        </p>
        <p className='font-semibold text-3xl text-slate-800 -mt-3 mb-auto justify-center'>
          {missingVariablesCount.toString()}
        </p>
      </div>
    </Tooltip>
  );
  
}


function Confidence({
  confidence,
  confidenceThresholds,
}: {
  confidence: number;
  confidenceThresholds: number[];
}) {
  return (
    <Tooltip text = {""} placement='left' enterDelay={450} className='min-w-full'>
      <div className='flex flex-col bg-zinc-50 rounded-xl h-20 mt-4 items-center shadow-sm'>
        <p className="text-sm font-medium text-slate-800 mt-0 mb-auto ml-0 mr-auto">{"Confidence"}</p>
        
        <div className='justify-center -mt-1 mb-auto'>
          <p className="text-3xl font-medium text-slate-800">
            {confidence + '%'}
          </p>
        </div>
        
        <div className='pb-1 justify-center'>
          <ConfidenceIntervalVisualizer confidence={confidence} thresholds={confidenceThresholds}/>
        </div>
      </div>
    </Tooltip>
  )
  
}


export function CardMidasRisk({
  midasRisk,
  missingVariablesCount,
  confidence,
  confidenceThresholds,
}: {
  midasRisk: string;
  missingVariablesCount: number;
  confidence: number;
  confidenceThresholds: number[];
}) {

  return (
    <div>
      {/* MAIN DIV */}
      <div className="rounded-xl p-4 bg-zinc-100 shadow-lg">
        {/* MAIN TITLE */}
        <h3 className="text-lg font-medium text-slate-800 mb-2">MIDAS Risk Summary</h3>

        {/* MAIN COLUMN */}
        <div className='flex flex-col'>
          
          {/* CARD 1 --- MIDAS RISK */}
          <MidasRisk midasRisk={midasRisk}/>

          {/* CARD 2 --- MISSING VARIABLES */}
          <MissingVariables missingVariablesCount={missingVariablesCount}/>

          {/* CARD 3 --- CONFIDENCE */}
          <Confidence confidence={confidence} confidenceThresholds={confidenceThresholds}/>
        </div>
      </div>
    </div>
    
  );
}