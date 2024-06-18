//High Risk Low Risk Some Risk

export const getmyRiskStatsSchoolLevel = (
  data: any,
  riskFactor: string,
  category: string,
  riskObject = {
    'High Risk': 0,
    'Some Risk': 0,
    'Low Risk': 0,
  },
) => {
  for (const d of data) {
    if (d[riskFactor] === 'High Risk' || d[riskFactor] === 'At Risk') {
      riskObject['High Risk'] += 1;
    } else if (d[riskFactor] === 'Some Risk') {
      riskObject['Some Risk'] += 1;
    } else if (d[riskFactor] === 'Low Risk') {
      riskObject['Low Risk'] += 1;
    }
  }

  const total =
    riskObject['High Risk'] + riskObject['Some Risk'] + riskObject['Low Risk'];

  riskObject['High Risk'] = Math.round((riskObject['High Risk'] / total) * 100);
  riskObject['Some Risk'] = Math.round((riskObject['Some Risk'] / total) * 100);
  riskObject['Low Risk'] = Math.round((riskObject['Low Risk'] / total) * 100);
  const result: any = {};
  result[category] = riskObject;
  return result;
};

export const getConfidenceLvel = (inputData: any) => {
  let math_confidence = 0,
    read_confidence = 0,
    susp_confidence = 0,
    count_total = 0;
  for (const data of inputData) {
    math_confidence += data.math_confidence;
    read_confidence += data.read_confidence;
    susp_confidence += data.susp_confidence;
    count_total += 1;
  }

  return Math.round(
    (math_confidence / count_total +
      read_confidence / count_total +
      susp_confidence / count_total) /
      3,
  );
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

const totalObj = {};

export const getDemographic = (inputData: any, field: string) => {
  const hashMap: any = {};

  inputData.forEach(function (data: any) {
    if (hashMap[data[field]] === undefined) {
      hashMap[data[field]] = structuredClone(obj);
    }
    //math risk
    if (data['math_risk'] === 'High Risk') {
      hashMap[data[field]].math_risk['High Risk'] += 1;
    } else if (data['math_risk'] === 'Some Risk') {
      hashMap[data[field]].math_risk['Some Risk'] += 1;
    } else {
      hashMap[data[field]].math_risk['Low Risk'] += 1;
    }
    //read risk
    if (data['read_risk'] === 'High Risk') {
      hashMap[data[field]].read_risk['High Risk'] =
        parseInt(hashMap[data[field]].read_risk['High Risk']) + 1;
    } else if (data['read_risk'] === 'Some Risk') {
      hashMap[data[field]].read_risk['Some Risk'] =
        parseInt(hashMap[data[field]].read_risk['Some Risk']) + 1;
    } else {
      hashMap[data[field]].read_risk['Low Risk'] =
        parseInt(hashMap[data[field]].read_risk['Low Risk']) + 1;
    }

    //susp risk
    if (data['susp_risk'] === 'At Risk') {
      hashMap[data[field]].susp_risk['High Risk'] =
        hashMap[data[field]].susp_risk['High Risk'] + 1;
    } else if (inputData['susp_risk'] === 'Some Risk') {
      hashMap[data[field]].susp_risk['Some Risk'] =
        hashMap[data[field]].susp_risk['Some Risk'] + 1;
    } else {
      hashMap[data[field]].susp_risk['Low Risk'] =
        hashMap[data[field]].susp_risk['Low Risk'] + 1;
    }
  });

  //loop through the hashmap
  const hashMapTotal = Object.keys(hashMap).reduce((acc: any, ele: any) => {
    if (acc[ele] === undefined) {
      acc[ele] = {
        totalMathRisk: 0,
        totalReadingRisk: 0,
        totalSuspRisk: 0,
      };
    }
    acc[ele].totalMathRisk =
      hashMap[ele].math_risk['High Risk'] +
      hashMap[ele].math_risk['Low Risk'] +
      hashMap[ele].math_risk['Some Risk'];

    acc[ele].totalReadingRisk =
      hashMap[ele].read_risk['High Risk'] +
      hashMap[ele].read_risk['Low Risk'] +
      hashMap[ele].read_risk['Some Risk'];

    acc[ele].totalSuspRisk =
      hashMap[ele].susp_risk['High Risk'] +
      hashMap[ele].susp_risk['Low Risk'] +
      hashMap[ele].susp_risk['Some Risk'];
    return acc;
  }, {});

  Object.keys(hashMap).forEach((ele: any) => {
    if (ele in hashMapTotal) {
      hashMap[ele].math_risk['High Risk'] = Math.round(
        (hashMap[ele].math_risk['High Risk'] /
          hashMapTotal[ele].totalMathRisk) *
          100,
      );
      hashMap[ele].math_risk['Some Risk'] = Math.round(
        (hashMap[ele].math_risk['Some Risk'] /
          hashMapTotal[ele].totalMathRisk) *
          100,
      );
      hashMap[ele].math_risk['Low Risk'] = Math.round(
        (hashMap[ele].math_risk['Low Risk'] / hashMapTotal[ele].totalMathRisk) *
          100,
      );

      hashMap[ele].read_risk['High Risk'] = Math.round(
        (hashMap[ele].read_risk['High Risk'] /
          hashMapTotal[ele].totalReadingRisk) *
          100,
      );

      hashMap[ele].read_risk['Some Risk'] = Math.round(
        (hashMap[ele].read_risk['Some Risk'] /
          hashMapTotal[ele].totalReadingRisk) *
          100,
      );

      hashMap[ele].read_risk['Low Risk'] = Math.round(
        (hashMap[ele].read_risk['Low Risk'] /
          hashMapTotal[ele].totalReadingRisk) *
          100,
      );

      hashMap[ele].susp_risk['High Risk'] = Math.round(
        (hashMap[ele].susp_risk['High Risk'] /
          hashMapTotal[ele].totalSuspRisk) *
          100,
      );
      hashMap[ele].susp_risk['Some Risk'] = Math.round(
        (hashMap[ele].susp_risk['Some Risk'] /
          hashMapTotal[ele].totalSuspRisk) *
          100,
      );
      hashMap[ele].susp_risk['Low Risk'] = Math.round(
        (hashMap[ele].susp_risk['Low Risk'] / hashMapTotal[ele].totalSuspRisk) *
          100,
      );
    }
  });

  return hashMap;
};
