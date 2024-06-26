import { hash } from 'bcrypt';
import { fileURLToPath } from 'url';

export const getMyRiskStatsGradeLevel = (
  inputData: any,
  field: string,
  riskField: string,
  obj = {
    [riskField]: { 'High Risk': 0, 'Some Risk': 0, 'Low Risk': 0 },
  },
  obj2 = { [riskField]: { total: 0 } },
) => {
  // const obj = {
  //   [riskField]: { 'High Risk': 0, 'Some Risk': 0, 'Low Risk': 0 },
  // };
  const susbetGrade: any = {};
  inputData.forEach((data: any) => {
    if (susbetGrade[data[field]] === undefined) {
      susbetGrade[data[field]] = structuredClone(obj);
    }
    if (data[riskField] === 'High Risk' || data[riskField] === 'At Risk') {
      if (susbetGrade[data[field]][riskField]['High Risk'] === undefined) {
        susbetGrade[data[field]][riskField]['High Risk'] = 0;
      }
      susbetGrade[data[field]][riskField]['High Risk'] += 1;
    } else if (data[riskField] === 'Some Risk') {
      if (susbetGrade[data[field]][riskField]['Some Risk'] === undefined)
        susbetGrade[data[field]][riskField]['Some Risk'] = 0;
      susbetGrade[data[field]][riskField]['Some Risk'] += 1;
    } else {
      if (susbetGrade[data[field]][riskField]['Low Risk'] === undefined)
        susbetGrade[data[field]][riskField]['Low Risk'] = 0;
      susbetGrade[data[field]][riskField]['Low Risk'] += 1;
    }
  });

  const totalHashMap = Object.keys(susbetGrade).reduce((acc: any, ele: any) => {
    if (acc[ele] === undefined) {
      acc[ele] = structuredClone(obj2);
    }
    acc[ele][riskField]['total'] +=
      susbetGrade[ele][riskField]['High Risk'] +
      susbetGrade[ele][riskField]['Some Risk'] +
      susbetGrade[ele][riskField]['Low Risk'];
    return acc;
  }, {});

  Object.keys(susbetGrade).forEach((data) => {
    susbetGrade[data][riskField]['High Risk'] = Math.round(
      (susbetGrade[data][riskField]['High Risk'] /
        totalHashMap[data][riskField]['total']) *
        100,
    );
    susbetGrade[data][riskField]['Some Risk'] = Math.round(
      (susbetGrade[data][riskField]['Some Risk'] /
        totalHashMap[data][riskField]['total']) *
        100,
    );
    susbetGrade[data][riskField]['Low Risk'] = Math.round(
      (susbetGrade[data][riskField]['Low Risk'] /
        totalHashMap[data][riskField]['total']) *
        100,
    );
  });

  return susbetGrade;
};

const obj = {
  math_risk: {
    'High Risk': 0,
    'Some Risk': 0,
    'Low Risk': 0,
  },
  read_risk: {
    'High Risk': 0,
    'Some Risk': 0,
    'Low Risk': 0,
  },
  susp_risk: {
    'High Risk': 0,
    'Some Risk': 0,
    'Low Risk': 0,
  },
};

export const getDemographicGradeLevel = (
  inputData: any,
  field: string,
  riskField: string,
) => {
  const hashMap: any = {};

  inputData.forEach(function (data: any) {
    if (hashMap[data[field]] === undefined) {
      hashMap[data[field]] = {};
    }
    if (hashMap[data[field]][data[riskField]] === undefined) {
      hashMap[data[field]][data[riskField]] = structuredClone(obj);
    }
    //math risk

    if (data['math_risk'] === 'High Risk') {
      hashMap[data[field]][data[riskField]].math_risk['High Risk'] += 1;
    } else if (data['math_risk'] === 'Some Risk') {
      hashMap[data[field]][data[riskField]].math_risk['Some Risk'] += 1;
    } else {
      hashMap[data[field]][data[riskField]].math_risk['Low Risk'] += 1;
    }

    //read risk
    if (data['read_risk'] === 'High Risk') {
      hashMap[data[field]][data[riskField]].read_risk['High Risk'] =
        parseInt(hashMap[data[field]][data[riskField]].read_risk['High Risk']) +
        1;
    } else if (data['read_risk'] === 'Some Risk') {
      hashMap[data[field]][data[riskField]].read_risk['Some Risk'] =
        parseInt(hashMap[data[field]][data[riskField]].read_risk['Some Risk']) +
        1;
    } else {
      hashMap[data[field]][data[riskField]].read_risk['Low Risk'] =
        parseInt(hashMap[data[field]][data[riskField]].read_risk['Low Risk']) +
        1;
    }

    //susp risk
    if (data['susp_risk'] === 'At Risk' || data['susp_risk'] === 'High Risk') {
      hashMap[data[field]][data[riskField]].susp_risk['High Risk'] =
        hashMap[data[field]][data[riskField]].susp_risk['High Risk'] + 1;
    } else if (inputData['susp_risk'] === 'Some Risk') {
      hashMap[data[field]][data[riskField]].susp_risk['Some Risk'] =
        hashMap[data[field]][data[riskField]].susp_risk['Some Risk'] + 1;
    } else {
      hashMap[data[field]][data[riskField]].susp_risk['Low Risk'] =
        hashMap[data[field]][data[riskField]].susp_risk['Low Risk'] + 1;
    }
  });

  console.log(hashMap);

  //loop through the hashmap
  const hashMapTotal = Object.keys(hashMap).reduce((acc: any, ele: any) => {
    //grade
    if (acc[ele] === undefined) {
      acc[ele] = {};
    }
    Object.keys(hashMap[ele]).forEach((key) => {
      //gender
      if (acc[ele][key] == undefined) {
        acc[ele][key] = structuredClone({
          totalMathRisk: 0,
          totalReadingRisk: 0,
          totalSuspRisk: 0,
        });
      }

      acc[ele][key].totalMathRisk =
        hashMap[ele][key].math_risk['High Risk'] +
        hashMap[ele][key].math_risk['Low Risk'] +
        hashMap[ele][key].math_risk['Some Risk'];

      acc[ele][key].totalReadingRisk =
        hashMap[ele][key].read_risk['High Risk'] +
        hashMap[ele][key].read_risk['Low Risk'] +
        hashMap[ele][key].read_risk['Some Risk'];

      acc[ele][key].totalSuspRisk =
        hashMap[ele][key].susp_risk['High Risk'] +
        hashMap[ele][key].susp_risk['Low Risk'] +
        hashMap[ele][key].susp_risk['Some Risk'];
    });

    return acc;
  }, {});

  Object.keys(hashMap).forEach((ele: any) => {
    Object.keys(hashMap[ele]).forEach((key) => {
      hashMap[ele][key].math_risk['High Risk'] = Math.round(
        (hashMap[ele][key].math_risk['High Risk'] /
          hashMapTotal[ele][key].totalMathRisk) *
          100,
      );
      hashMap[ele][key].math_risk['Some Risk'] = Math.round(
        (hashMap[ele][key].math_risk['Some Risk'] /
          hashMapTotal[ele][key].totalMathRisk) *
          100,
      );
      hashMap[ele][key].math_risk['Low Risk'] = Math.round(
        (hashMap[ele][key].math_risk['Low Risk'] /
          hashMapTotal[ele][key].totalMathRisk) *
          100,
      );

      hashMap[ele][key].read_risk['High Risk'] = Math.round(
        (hashMap[ele][key].read_risk['High Risk'] /
          hashMapTotal[ele][key].totalReadingRisk) *
          100,
      );

      hashMap[ele][key].read_risk['Some Risk'] = Math.round(
        (hashMap[ele][key].read_risk['Some Risk'] /
          hashMapTotal[ele][key].totalReadingRisk) *
          100,
      );

      hashMap[ele][key].read_risk['Low Risk'] = Math.round(
        (hashMap[ele][key].read_risk['Low Risk'] /
          hashMapTotal[ele][key].totalReadingRisk) *
          100,
      );

      hashMap[ele][key].susp_risk['High Risk'] = Math.round(
        (hashMap[ele][key].susp_risk['High Risk'] /
          hashMapTotal[ele][key].totalSuspRisk) *
          100,
      );
      hashMap[ele][key].susp_risk['Some Risk'] = Math.round(
        (hashMap[ele][key].susp_risk['Some Risk'] /
          hashMapTotal[ele][key].totalSuspRisk) *
          100,
      );
      hashMap[ele][key].susp_risk['Low Risk'] = Math.round(
        (hashMap[ele][key].susp_risk['Low Risk'] /
          hashMapTotal[ele][key].totalSuspRisk) *
          100,
      );
    });
  });

  return hashMap;
};

export const getConfidenceLevelForGradeLevel = (
  inputData: any,
  field: string,
  confidenceFrame = {
    math_confidence: 0,
    read_confidence: 0,
    susp_confidence: 0,
  },
) => {
  const gradeMapConfidence: any = {};
  const countTotalforEachGradeMap: any = {};

  inputData.forEach((data: any) => {
    if (gradeMapConfidence[data[field]] === undefined) {
      gradeMapConfidence[data[field]] = structuredClone(confidenceFrame);
    }

    if (countTotalforEachGradeMap[data[field]] === undefined) {
      countTotalforEachGradeMap[data[field]] = 0;
    }

    gradeMapConfidence[data[field]]['math_confidence'] +=
      data['math_confidence'];
    gradeMapConfidence[data[field]]['read_confidence'] +=
      data['read_confidence'];
    gradeMapConfidence[data[field]]['susp_confidence'] +=
      data['susp_confidence'];
    countTotalforEachGradeMap[data[field]] += 1;
  });

  //calculating the
  const resultObj: any = Object.keys(gradeMapConfidence).reduce(
    (acc: any, key: any) => {
      acc[key] = Math.round(
        (gradeMapConfidence[key]['math_confidence'] /
          countTotalforEachGradeMap[key] +
          gradeMapConfidence[key]['read_confidence'] /
            countTotalforEachGradeMap[key] +
          gradeMapConfidence[key]['susp_confidence'] /
            countTotalforEachGradeMap[key]) /
          3,
      );
      return acc;
    },
    {},
  );

  return resultObj;
};
