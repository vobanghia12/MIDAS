export const getMyRiskStatsGradeLevel = (
  data: any,
  riskFactor: string,
  category: string,
  riskObject = {
    'High Risk': 0,
    'Some Risk': 0,
    'Low Risk': 0,
  },
) => {
  const grades: any = {};
  for (const d of data) {
    if (!(d['gradelevel'] in grades)) {
      grades[d['gradelevel']][category] = riskObject;
    }
    if (d[riskFactor] === 'High Risk' || d[riskFactor] === 'At Risk') {
      grades[d['gradelevel']][category]['High Risk'] += 1;
    } else if (d[riskFactor] === 'Some Risk') {
      grades[d['gradelevel']][category]['Some Risk'] += 1;
    } else if (d[riskFactor] === 'Low Risk') {
      grades[d['gradelevel']][category]['Low Risk'] += 1;
    }
  }

  return grades;
};
