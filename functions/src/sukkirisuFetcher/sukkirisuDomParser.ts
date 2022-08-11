import { BirthMonthFortune } from "@shiiyan/sukkirisu-function-core-domain";
import { JSDOM } from "jsdom";

/**
 *
 *
 * @export
 * @class SukkirisuDomParser
 */
export class SukkirisuDomParser {
  /**
   *
   *
   * @static
   * @param {JSDOM} dom
   * @return {*}  {BirthMonthFortune[]}
   * @memberof SukkirisuDomParser
   */
  public static parse(dom: JSDOM): BirthMonthFortune[] {
    throw new Error("to be implemented");
  }
}
