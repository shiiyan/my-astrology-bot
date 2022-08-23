import { BirthMonthFortune } from "@shiiyan/sukkirisu-function-core-domain";
import { DomElementNotExistsError } from "@shiiyan/sukkirisu-function-error";
import { JSDOM } from "jsdom";

/**
 * @export
 * @class SquirrelDomParser
 */
export class SquirrelDomParser {
  private dom: JSDOM;

  /**
   * Creates an instance of SquirrelDomParser.
   * @param {JSDOM} dom
   * @memberof SquirrelDomParser
   */
  constructor(dom: JSDOM) {
    this.dom = dom;
  }

  /**
   * @return {*} {BirthMonthFortune[]}
   * @memberof SquirrelDomParser
   */
  public parse(): BirthMonthFortune[] {
    return ["rankGroup-2", "rankGroup-7", "rankGroup-12", "rankGroup-1"]
        .map((rankGroup) => this.extractFortunesFromRankGroup(rankGroup))
        .flat();
  }

  /**
   * @private
   * @param {string} rankGroup
   * @return {*}  {BirthMonthFortune[]}
   * @memberof SquirrelDomParser
   */
  private extractFortunesFromRankGroup(rankGroup :string): BirthMonthFortune[] {
    const rankGroupDiv = this.dom.window.document.querySelector(".".concat(rankGroup))?.nextElementSibling;
    if (!rankGroupDiv) {
      throw new DomElementNotExistsError(`Div of ${rankGroup} does not exist.`);
    }

    const fortunes: BirthMonthFortune[] = [];
    const allRow1sInGroup = rankGroupDiv.querySelectorAll(".row1");
    allRow1sInGroup?.forEach((row1) => {
      const rankDiv = row1.querySelector(".rank");
      const rank = rankDiv ? Number(rankDiv.textContent?.trim().slice(0, -1)) : this.getRankFromRankGroup(rankGroup);
      const birthMonth = Number(row1.querySelector(".month > span")?.textContent);
      const row2 = row1.nextElementSibling;
      const comment = String(row2?.querySelector("p")?.textContent?.trim());
      const luckyColor = String(row2?.querySelector("div")?.textContent?.trim());

      fortunes.push({ rank, birthMonth, comment, luckyColor });
    });

    return fortunes;
  }


  /**
   * @private
   * @param {string} rankGroup ex. rankGroup-12
   * @return {*} {number}
   * @memberof SquirrelDomParser
   */
  private getRankFromRankGroup(rankGroup: string): number {
    return Number(rankGroup.split("-").at(-1));
  }
}


