'use client';
import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useFileModal from '@/hooks/useFileModal';
import { read, utils } from 'xlsx';
import {
  getConfidenceLvel,
  getmyRiskStatsSchoolLevel,
} from '@/action/getSchoolLevelFunctions';
import { getMyRiskStatsGradeLevel } from '@/action/getGradeLevelFunctions';
import useSchoolLevel from '@/hooks/useSchoolLevel';
import { BounceLoader } from 'react-spinners';
const data_frame: string[] = [
  'odr_f',
  'susp_f',
  'gender',
  'ethnicity',
  'ell',
  'schoollevel',
  'math_f',
  'read_f',
  'mysaebrs_emo',
  'mysaebrs_soc',
  'mysaebrs_aca',
  'saebrs_emo',
  'saebrs_soc',
  'saebrs_aca',
];

const helperFunction = (d1: any, d2: any) => {
  for (const data of data_frame) {
    if (d2[data] !== d1[data]) return false;
  }
  return true;
};

export const convertCsvToJson = (data: ArrayBuffer) => {
  const workbook = read(data, { dense: true });

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const JSONdata: any[] = utils.sheet_to_json(sheet);

  return JSONdata;
};

export const setSecondMatchingRiskFactor = (
  uploadData: any,
  riskFactorData: any,
  riskFactor: string,
  confidenceFactor: string,
) => {
  // const risk = uploadData.filter((d1: any) =>
  const m: any = new Map();
  uploadData.forEach(function (x: any) {
    x[riskFactor] = null;
    x[confidenceFactor] = null;
    m.set(x.id, x);
  });
  console.log(m);

  riskFactorData.forEach(function (x: any) {
    var existing = m.get(x.id);
    if (existing) {
      existing[riskFactor] = x.risk_level;
      existing[confidenceFactor] = x.confidence;
      Object.assign(existing);
    }
  });

  var result = Array.from(m.values());
  return result;
};

// export const setFirstMatching = (uploadData: any, inputData: any) => {
//   var m = new Map();
//   uploadData.forEach(function (x: any) {
//     const arr = [];
//     for (const data of data_frame) {
//       arr.push(x[data]);
//     }
//     x.id = null;
//     m.set(arr, x);
//   });
// };

const FileModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const fileModal = useFileModal();
  const router = useRouter();
  const schooLevel = useSchoolLevel();
  //handle form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      document1: null,
      document2: null,
      document3: null,
      document4: null,
      document5: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      fileModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      let file1: File = values.document1?.[0];
      let file2: File = values.document2?.[0];
      let file3: File = values.document3?.[0];
      let file4: File = values.document4?.[0];
      let file5: File = values.document5?.[0];

      if (!file1) {
        toast.error('Missing fields');
        return;
      }

      const data1 = await file1.arrayBuffer();
      const data2 = await file2.arrayBuffer();
      const data3 = await file3.arrayBuffer();
      const data4 = await file4.arrayBuffer();
      const data5 = await file5.arrayBuffer();

      let uploadData: any = convertCsvToJson(data1);

      const inputData: any = convertCsvToJson(data2);

      const mathRiskData: any = convertCsvToJson(data3);

      const readRiskData: any = convertCsvToJson(data4);

      const suspRiskData: any = convertCsvToJson(data5);

      const m: any = new Map();
      uploadData.forEach(function (x: any) {
        x.id = null;
        m.set(
          `${x.odr_f},${x.susp_f},${x.gender},${x.ethnicity},${x.ell},${x.schoollevel},${x.math_f},${x.read_f},${x.mysaebrs_emo},${x.mysaebrs_soc},${x.mysaebrs_aca},${x.saebrs_emo},${x.saebrs_soc},${x.saebrs_aca}`,
          x,
        );
      });

      inputData.forEach(function (x: any) {
        var existing = m.get(
          `${x.odr_f},${x.susp_f},${x.gender},${x.ethnicity},${x.ell},${x.schoollevel},${x.math_f},${x.read_f},${x.mysaebrs_emo},${x.mysaebrs_soc},${x.mysaebrs_aca},${x.saebrs_emo},${x.saebrs_soc},${x.saebrs_aca}`,
        );
        if (existing) {
          const a = { id: x.id };
          Object.assign(existing, a);
        }
      });

      uploadData = structuredClone(Array.from(m.values()));

      // uploadData.filter((d1: any) =>
      //   inputData.some((d2: any) => {
      //     if (helperFunction(d1, d2)) {
      //       d1['id'] = d2['id'];
      //       return true;
      //     }
      //     return false;
      //   }),
      // );

      //deep clone the array after matching

      // //filter for math risk
      const mathRisk = setSecondMatchingRiskFactor(
        uploadData,
        mathRiskData,
        'math_risk',
        'math_confidence',
      );

      console.log(mathRisk);
      // //filter for read risk
      const readRisk = setSecondMatchingRiskFactor(
        uploadData,
        readRiskData,
        'read_risk',
        'read_confidence',
      );
      console.log(readRisk);
      // //filter for suspension risk
      const suspRisk = setSecondMatchingRiskFactor(
        uploadData,
        suspRiskData,
        'susp_risk',
        'susp_confidence',
      );
      console.log(suspRisk);

      //Saeber Emotion Risk
      schooLevel.setMySaebrsEmotion(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_emo', 'MySaebrs'),
      );

      //Mysaeber Emotion Risk
      schooLevel.setSaebrsEmotion(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_emo', 'Saebrs'),
      );

      //Saeber Academic Risk
      schooLevel.setMySaeberAcademic(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_aca', 'MySaebrs'),
      );

      //Mysaeber Academic Risk
      schooLevel.setSaeberAcademic(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_aca', 'Saebrs'),
      );

      //Saeber Social Risk
      schooLevel.setSaeberSocial(
        getmyRiskStatsSchoolLevel(uploadData, 'saebrs_soc', 'Saebrs'),
      );
      //Mysaeber Social Risk
      schooLevel.setMySaeberSocial(
        getmyRiskStatsSchoolLevel(uploadData, 'mysaebrs_soc', 'MySaebrs'),
      );

      schooLevel.setRiskMath(
        getmyRiskStatsSchoolLevel(suspRisk, 'math_risk', 'math_risk'),
      );

      schooLevel.setRiskReading(
        getmyRiskStatsSchoolLevel(suspRisk, 'read_risk', 'read_risk'),
      );

      schooLevel.setRiskSuspension(
        getmyRiskStatsSchoolLevel(suspRisk, 'susp_risk', 'susp_risk'),
      );

      schooLevel.setConfidenceLevel(getConfidenceLvel(suspRisk));

      schooLevel.setlistOfAllStudents(suspRisk);

      // console.log(
      //   getmyRiskStatsSchoolLevel(
      //     suspRisk,
      //     'read_confidence',
      //     'read_confidence',
      //   ),
      // );
      // console.log(
      //   getmyRiskStatsSchoolLevel(
      //     suspRisk,
      //     'math_confidence',
      //     'math_confidence',
      //   ),
      // );

      router.refresh();
      setIsLoading(false);
      toast.success('File uploaded');
      reset();
      fileModal.onClose();
    } catch (error) {
      toast.error('Somthing went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Uploading a Document"
        description=""
        isOpen={fileModal.isOpen}
        onChange={onChange}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div>
            <p className="pb-1 text-left">School Upload File</p>
            <Input
              type="file"
              className="mt-1"
              id="document1"
              disabled={isLoading}
              {...register('document1', { required: true })}
              accept=".csv"
            />
          </div>
          <div>
            <p className="pb-1 text-left">Web Input File</p>
            <Input
              type="file"
              className="mt-1"
              id="document2"
              disabled={isLoading}
              {...register('document2', { required: true })}
            />
          </div>
          <div>
            <p className="pb-1 text-left">Math Risk File</p>
            <Input
              type="file"
              className="mt-1"
              id="document3"
              disabled={isLoading}
              {...register('document3', { required: true })}
            />
          </div>
          <div>
            <p className="pb-1 text-left">Reading Risk File</p>
            <Input
              type="file"
              className="mt-1"
              id="document4"
              disabled={isLoading}
              {...register('document4', { required: true })}
            />
          </div>
          <div>
            <p className="pb-1 text-left">Suspension Risk File</p>
            <Input
              type="file"
              className="mt-1"
              id="document5"
              disabled={isLoading}
              {...register('document5', { required: true })}
            />
          </div>
          {isLoading ? (
            <BounceLoader className=" m-auto" color="blue" size={40} />
          ) : (
            <Button
              disabled={isLoading}
              type="submit"
              className="m-auto w-20 font-semibold"
            >
              Upload
            </Button>
          )}
        </form>
      </Modal>
    </>
  );
};

export default FileModal;
