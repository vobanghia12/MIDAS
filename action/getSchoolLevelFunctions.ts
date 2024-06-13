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
