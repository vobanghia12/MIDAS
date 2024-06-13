
import { Card, CardBody, CardHeader, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Table, TableColumn, TableHeader, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { ConfidenceIntervalVisualizer } from '../../confidence-visualizer';
import { Nunito } from "next/font/google";
const nunito = Nunito({weight: ['200', '200'], subsets:['latin'], style: ['normal', 'italic']})

function TooltipContent() {
  return (
    <div className='flex-wrap max-w-80'>
      The amount of missing variables affect the confidence of the MIDAS risk score calculation
      <br/><br/>
      Click on this card to see a breakdown of the importance of each variable
    </div>
  )
}

export function CardConfidenceVisualizer({
  confidence,
  confidenceThresholds,
}: {
  confidence: number;
  confidenceThresholds: number[];
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Tooltip content={TooltipContent()} placement='bottom'>
        <div onClick={onOpen}>
          <Card className={`${nunito.className} rounded-xl bg-neutral-100`} shadow='md'>
            <CardHeader className=''>
              <h3 className="text-lg font-medium text-slate-800"> MIDAS Risk Confidence </h3>
            </CardHeader>
            
            <div className='flex flex-col items-center pb-4'>

              <p className='text-md'> Missing variables </p>
              <p className='text-4xl'> {1} </p>
              <ConfidenceIntervalVisualizer confidence={confidence} thresholds={confidenceThresholds}/>
            </div>
          </Card>
          
          <Modal className={nunito.className} isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior='inside'>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Confidence Score Explaination</ModalHeader>
                  <ModalBody>
                    <div className='flex flex-wrap'>
                      The confidence of the MIDAS risk score prediction is negatively impacted by having missing values in the data.
                      <br/><br/>
                      Each variable may also be weighted differently. For example, if a sample of students is missing their MySaebrs scores, 
                      then the confidence will be more significantly affected than if their English Language Learner status is missing. 
                      
                      <br/><br/>
                      Below is a breakdown of the weights of each variable. 
                    </div>

                    <Divider/>

                    <Table className='text-lg'>
                      <TableHeader>
                        <TableColumn className='text-2xl'>Variable</TableColumn>
                        <TableColumn className='text-2xl'>Weight</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key='1'>
                          <TableCell className='text-xl'>Gender</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='2'>
                          <TableCell className='text-xl'>Ethnicity</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='3'>
                          <TableCell className='text-xl'>English Learner Status</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='4'>
                          <TableCell className='text-xl'>Office Disciplinary Referrals</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='5'>
                          <TableCell className='text-xl'>Suspensions</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='6'>
                          <TableCell className='text-xl'>Math Scores</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='7'>
                          <TableCell className='text-xl'>Reading Scores</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='8'>
                          <TableCell className='text-xl'>Saebrs</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                        <TableRow key='9'>
                          <TableCell className='text-xl'>MySaebrs</TableCell>
                          <TableCell className='text-xl'>Low</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </Tooltip>
    </div>
  );
}