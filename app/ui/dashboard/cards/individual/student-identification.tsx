import { Card, CardBody,  Divider } from '@nextui-org/react';
import React from 'react';

import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '300'], subsets:['latin'], style: ['normal', 'italic']})

function Row({
  header,
  content,
}:
{
  header: string;
  content: string;
}) {
  return (
    <div className=''>
      <p className='items-start font-normal text-xl'>{header}</p>
      <div className="flex flex-col items-center text-xl">
        {content}
      </div>
    </div>
  )
}

export function CardStudentIdentification({
  id,
  classroom,
  grade,
}: {
  id: string;
  classroom: string;
  grade: string;
}) {

  return (
    <Card className={`${nunito.className} bg-neutral-100 w-full`} shadow='md'>
      <CardBody className={`${nunito.className} flex gap-1 justify-center`}>
        <Row header="Classroom ID" content={classroom}/>
        <Divider/>
        <Row header="Grade Level" content={grade}/>
      </CardBody>
    </Card>
  );
}