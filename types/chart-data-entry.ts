/**
 * Types and classes to store data for Nivo charts.
 * 
 * @since 2024-06-17
 */

import { BarDatum } from "@nivo/bar";

/**
 * Represent a risk level for a given predictor.
 * @param label - The name of the risk level. E.g. 'High risk' or 'One plus'.
 * @param value - The numeric value of the risk level. Either a count or a percentage.
 */
export type RiskLevel = {
  label: string,
  value: number,
}

/**
 * Represent a data entry for the various risk charts.
 * This is so any amount of categories of any name can be used in one abstracted chart component.
 * @var id - The name of the data category. E.g. 'Male'
 * @var riskLevels - A list of the present risk levels of this category. E.g. 'gender' has three different risk levels whereas 'ODR' has only two.
 */
export class RiskChartDataEntry {
  id: string;
  riskLevels: RiskLevel[];

  constructor(id: string, riskLevels: RiskLevel[]) {
    this.id = id;
    if (new Set(riskLevels).size !== riskLevels.length) {
      console.log("Warning: RiskChartDataEntry with id %s contains one or more duplicate riskLevels!", id);
    }
    this.riskLevels = riskLevels;
  }

  /**
   * Cast this RiskChartDataEntry to a Nivo BarDatum.
   * @returns A Nivo BarDatum object.
   */
  toBarDatum(): BarDatum {
    const barDatum: BarDatum = { id: this.id };

    this.riskLevels.forEach(riskLevel => {
      barDatum[riskLevel.label] = riskLevel.value;
    });

    return barDatum
  }
}