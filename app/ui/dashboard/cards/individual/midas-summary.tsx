import React from 'react';
import { Card, CardBody, CardHeader, Tooltip } from '@nextui-org/react';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

export function CardMidasRisk({
  midasRisk,
}: {
  midasRisk: string;
}) {

  return (
    <Tooltip content={"Midas risk tooltip"} placement='bottom'>
      <Card className={`${nunito.className} bg-neutral-100 w-full pb-4`} shadow='md'>
        <CardHeader>
          <h3 className="text-lg font-medium text-slate-800">MIDAS Risk Score</h3>
        </CardHeader>
        <CardBody className='flex items-center -mt-2 '>
          
            <p className={`${nunito.className} font-semibold text-3xl`}>{midasRisk}</p>
          
          
        </CardBody>
      </Card>
    </Tooltip>
  );
}