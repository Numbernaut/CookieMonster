/** Functions to create the individual sections of the Statistics page */

import * as GameData from '../../Data/Gamedata';
import { MaxChainCookieReward } from '../../Cache/Stats/ChainCookies';
import {
  CacheAvgCPSWithChoEgg,
  CacheCentEgg,
  CacheChainFrenzyMaxReward,
  CacheChainFrenzyRequired,
  CacheChainFrenzyRequiredNext,
  CacheChainFrenzyWrathRequired,
  CacheChainFrenzyWrathRequiredNext,
  CacheChainMaxReward,
  CacheChainRequired,
  CacheChainRequiredNext,
  CacheChainWrathMaxReward,
  CacheChainWrathRequired,
  CacheChainWrathRequiredNext,
  CacheConjure,
  CacheConjureReward,
  CacheDragonsFortuneMultAdjustment,
  CacheEdifice,
  CacheEdificeBuilding,
  CacheGoldenCookiesMult,
  CacheHCPerSecond,
  CacheLastChoEgg,
  CacheLucky,
  CacheLuckyFrenzy,
  CacheLuckyReward,
  CacheLuckyRewardFrenzy,
  CacheLuckyWrathReward,
  CacheLuckyWrathRewardFrenzy,
  CacheNoGoldSwitchCookiesPS,
  CacheRealCookiesEarned,
  CacheSeaSpec,
  CacheWrathCookiesMult,
  CacheWrinklersTotal,
} from '../../Cache/VariablesAndData';
import { CMOptions } from '../../Config/VariablesAndData';
import ResetBonus from '../../Sim/SimulationEvents/ResetAscension';
import {
  Beautify,
  FormatTime,
} from '../BeautifyAndFormatting/BeautifyFormatting';

import GetCPS from '../HelperFunctions/GetCPS';
import GetWrinkConfigBank from '../HelperFunctions/GetWrinkConfigBank';
import { ColorGreen, ColorRed, ColorTextPre } from '../VariablesAndData';
import { StatsListing, StatsHeader, StatsMissDisp } from './CreateDOMElements';

/**
 * This function creates the "Lucky" section of the stats page
 * @returns	{object}	section		The object contating the Lucky section
 */
export function LuckySection() {
  // This sets which tooltip to display for certain stats
  const goldCookTooltip = Game.auraMult("Dragon's Fortune")
    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
    : 'GoldCookTooltipPlaceholder';

  const section = document.createElement('div');
  section.className = 'CMStatsLuckySection';

  const luckyColor =
    Game.cookies + GetWrinkConfigBank() < CacheLucky ? ColorRed : ColorGreen;
  const luckyTime =
    Game.cookies + GetWrinkConfigBank() < CacheLucky
      ? FormatTime(
          (CacheLucky - (Game.cookies + GetWrinkConfigBank())) / GetCPS(),
        )
      : '';
  const luckyReqFrag = document.createDocumentFragment();
  const luckyReqSpan = document.createElement('span');
  luckyReqSpan.style.fontWeight = 'bold';
  luckyReqSpan.className = ColorTextPre + luckyColor;
  luckyReqSpan.textContent = Beautify(CacheLucky);
  luckyReqFrag.appendChild(luckyReqSpan);
  if (luckyTime !== '') {
    const luckyReqSmall = document.createElement('small');
    luckyReqSmall.textContent = ` (${luckyTime})`;
    luckyReqFrag.appendChild(luckyReqSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Lucky!" Cookies Required',
      luckyReqFrag,
      goldCookTooltip,
    ),
  );

  const luckyColorFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheLuckyFrenzy
      ? ColorRed
      : ColorGreen;
  const luckyTimeFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheLuckyFrenzy
      ? FormatTime(
          (CacheLuckyFrenzy - (Game.cookies + GetWrinkConfigBank())) / GetCPS(),
        )
      : '';
  const luckyReqFrenFrag = document.createDocumentFragment();
  const luckyReqFrenSpan = document.createElement('span');
  luckyReqFrenSpan.style.fontWeight = 'bold';
  luckyReqFrenSpan.className = ColorTextPre + luckyColorFrenzy;
  luckyReqFrenSpan.textContent = Beautify(CacheLuckyFrenzy);
  luckyReqFrenFrag.appendChild(luckyReqFrenSpan);
  if (luckyTimeFrenzy !== '') {
    const luckyReqFrenSmall = document.createElement('small');
    luckyReqFrenSmall.textContent = ` (${luckyTimeFrenzy})`;
    luckyReqFrenFrag.appendChild(luckyReqFrenSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Lucky!" Cookies Required (Frenzy)',
      luckyReqFrenFrag,
      goldCookTooltip,
    ),
  );

  const luckySplit = CacheLuckyReward !== CacheLuckyWrathReward;

  const luckyRewardMaxSpan = document.createElement('span');
  luckyRewardMaxSpan.style.fontWeight = 'bold';
  luckyRewardMaxSpan.className = ColorTextPre + CacheLuckyReward;
  luckyRewardMaxSpan.textContent =
    Beautify(CacheLuckyReward) +
    (luckySplit ? ` / ${Beautify(CacheLuckyWrathReward)}` : '');
  section.appendChild(
    StatsListing(
      'withTooltip',
      `"Lucky!" Reward (MAX)${luckySplit ? ' (Golden / Wrath)' : ''}`,
      luckyRewardMaxSpan,
      goldCookTooltip,
    ),
  );

  const luckyRewardFrenzyMaxSpan = document.createElement('span');
  luckyRewardFrenzyMaxSpan.style.fontWeight = 'bold';
  luckyRewardFrenzyMaxSpan.className = ColorTextPre + luckyRewardFrenzyMaxSpan;
  luckyRewardFrenzyMaxSpan.textContent =
    Beautify(CacheLuckyRewardFrenzy) +
    (luckySplit ? ` / ${Beautify(CacheLuckyWrathRewardFrenzy)}` : '');
  section.appendChild(
    StatsListing(
      'withTooltip',
      `"Lucky!" Reward (MAX) (Frenzy)${luckySplit ? ' (Golden / Wrath)' : ''}`,
      luckyRewardFrenzyMaxSpan,
      goldCookTooltip,
    ),
  );

  const luckyCurBase =
    Math.min(
      (Game.cookies + GetWrinkConfigBank()) * 0.15,
      CacheNoGoldSwitchCookiesPS * CacheDragonsFortuneMultAdjustment * 60 * 15,
    ) + 13;
  const luckyCurSpan = document.createElement('span');
  luckyCurSpan.style.fontWeight = 'bold';
  luckyCurSpan.className = ColorTextPre + luckyCurSpan;
  luckyCurSpan.textContent =
    Beautify(CacheGoldenCookiesMult * luckyCurBase) +
    (luckySplit ? ` / ${Beautify(CacheWrathCookiesMult * luckyCurBase)}` : '');
  section.appendChild(
    StatsListing(
      'withTooltip',
      `"Lucky!" Reward (CUR)${luckySplit ? ' (Golden / Wrath)' : ''}`,
      luckyCurSpan,
      goldCookTooltip,
    ),
  );
  return section;
}

/**
 * This function creates the "Chain" section of the stats page
 * @returns	{object}	section		The object contating the Chain section
 */
export function ChainSection() {
  // This sets which tooltip to display for certain stats
  const goldCookTooltip = Game.auraMult("Dragon's Fortune")
    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
    : 'GoldCookTooltipPlaceholder';

  const section = document.createElement('div');
  section.className = 'CMStatsChainSection';

  const chainColor =
    Game.cookies + GetWrinkConfigBank() < CacheChainRequired
      ? ColorRed
      : ColorGreen;
  const chainTime =
    Game.cookies + GetWrinkConfigBank() < CacheChainRequired
      ? FormatTime(
          (CacheChainRequired - (Game.cookies + GetWrinkConfigBank())) /
            GetCPS(),
        )
      : '';
  const chainReqFrag = document.createDocumentFragment();
  const chainReqSpan = document.createElement('span');
  chainReqSpan.style.fontWeight = 'bold';
  chainReqSpan.className = ColorTextPre + chainColor;
  chainReqSpan.textContent = Beautify(CacheChainRequired);
  chainReqFrag.appendChild(chainReqSpan);
  if (chainTime !== '') {
    const chainReqSmall = document.createElement('small');
    chainReqSmall.textContent = ` (${chainTime})`;
    chainReqFrag.appendChild(chainReqSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Cookies Required',
      chainReqFrag,
      goldCookTooltip,
    ),
  );

  const chainWrathColor =
    Game.cookies + GetWrinkConfigBank() < CacheChainWrathRequired
      ? ColorRed
      : ColorGreen;
  const chainWrathTime =
    Game.cookies + GetWrinkConfigBank() < CacheChainWrathRequired
      ? FormatTime(
          (CacheChainWrathRequired - (Game.cookies + GetWrinkConfigBank())) /
            GetCPS(),
        )
      : '';
  const chainWrathReqFrag = document.createDocumentFragment();
  const chainWrathReqSpan = document.createElement('span');
  chainWrathReqSpan.style.fontWeight = 'bold';
  chainWrathReqSpan.className = ColorTextPre + chainWrathColor;
  chainWrathReqSpan.textContent = Beautify(CacheChainWrathRequired);
  chainWrathReqFrag.appendChild(chainWrathReqSpan);
  if (chainWrathTime !== '') {
    const chainWrathReqSmall = document.createElement('small');
    chainWrathReqSmall.textContent = ` (${chainWrathTime})`;
    chainWrathReqFrag.appendChild(chainWrathReqSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Cookies Required (Wrath)',
      chainWrathReqFrag,
      goldCookTooltip,
    ),
  );

  const chainColorFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheChainFrenzyRequired
      ? ColorRed
      : ColorGreen;
  const chainTimeFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheChainFrenzyRequired
      ? FormatTime(
          (CacheChainFrenzyRequired - (Game.cookies + GetWrinkConfigBank())) /
            GetCPS(),
        )
      : '';
  const chainReqFrenFrag = document.createDocumentFragment();
  const chainReqFrenSpan = document.createElement('span');
  chainReqFrenSpan.style.fontWeight = 'bold';
  chainReqFrenSpan.className = ColorTextPre + chainColorFrenzy;
  chainReqFrenSpan.textContent = Beautify(CacheChainFrenzyRequired);
  chainReqFrenFrag.appendChild(chainReqFrenSpan);
  if (chainTimeFrenzy !== '') {
    const chainReqFrenSmall = document.createElement('small');
    chainReqFrenSmall.textContent = ` (${chainTimeFrenzy})`;
    chainReqFrenFrag.appendChild(chainReqFrenSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Cookies Required (Frenzy)',
      chainReqFrenFrag,
      goldCookTooltip,
    ),
  );

  const chainWrathColorFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheChainFrenzyWrathRequired
      ? ColorRed
      : ColorGreen;
  const chainWrathTimeFrenzy =
    Game.cookies + GetWrinkConfigBank() < CacheChainFrenzyWrathRequired
      ? FormatTime(
          (CacheChainFrenzyWrathRequired -
            (Game.cookies + GetWrinkConfigBank())) /
            GetCPS(),
        )
      : '';
  const chainWrathReqFrenFrag = document.createDocumentFragment();
  const chainWrathReqFrenSpan = document.createElement('span');
  chainWrathReqFrenSpan.style.fontWeight = 'bold';
  chainWrathReqFrenSpan.className = ColorTextPre + chainWrathColorFrenzy;
  chainWrathReqFrenSpan.textContent = Beautify(CacheChainFrenzyWrathRequired);
  chainWrathReqFrenFrag.appendChild(chainWrathReqFrenSpan);
  if (chainWrathTimeFrenzy !== '') {
    const chainWrathReqFrenSmall = document.createElement('small');
    chainWrathReqFrenSmall.textContent = ` (${chainWrathTimeFrenzy})`;
    chainWrathReqFrenFrag.appendChild(chainWrathReqFrenSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Cookies Required (Frenzy) (Wrath)',
      chainWrathReqFrenFrag,
      goldCookTooltip,
    ),
  );

  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Reward (MAX) (Golden / Wrath)',
      document.createTextNode(
        `${Beautify(CacheChainMaxReward[0])} / ${Beautify(
          CacheChainWrathMaxReward[0],
        )}`,
      ),
      goldCookTooltip,
    ),
  );

  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Reward (MAX) (Frenzy) (Golden / Wrath)',
      document.createTextNode(
        `${Beautify(CacheChainFrenzyMaxReward[0])} / ${Beautify(
          CacheChainFrenzyMaxReward[0],
        )}`,
      ),
      goldCookTooltip,
    ),
  );

  const chainCurMax = Math.min(
    Game.cookiesPs * 60 * 60 * 6 * CacheDragonsFortuneMultAdjustment,
    Game.cookies * 0.5,
  );
  const chainCur = MaxChainCookieReward(
    7,
    chainCurMax,
    CacheGoldenCookiesMult,
  )[0];
  const chainCurWrath = MaxChainCookieReward(
    6,
    chainCurMax,
    CacheWrathCookiesMult,
  )[0];
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Chain" Reward (CUR) (Golden / Wrath)',
      document.createTextNode(
        `${Beautify(chainCur)} / ${Beautify(chainCurWrath)}`,
      ),
      goldCookTooltip,
    ),
  );

  section.appendChild(
    StatsListing(
      'withTooltip',
      'CPS Needed For Next Level (G / W)',
      document.createTextNode(
        `${Beautify(CacheChainRequiredNext)} / ${Beautify(
          CacheChainWrathRequiredNext,
        )}`,
      ),
      'ChainNextLevelPlaceholder',
    ),
  );
  section.appendChild(
    StatsListing(
      'withTooltip',
      'CPS Needed For Next Level (Frenzy) (G / W)',
      document.createTextNode(
        `${Beautify(CacheChainFrenzyRequiredNext)} / ${Beautify(
          CacheChainFrenzyWrathRequiredNext,
        )}`,
      ),
      'ChainNextLevelPlaceholder',
    ),
  );
  return section;
}

/**
 * This function creates the "Spells" section of the stats page
 * @returns	{object}	section		The object contating the Spells section
 */
export function SpellsSection() {
  const section = document.createElement('div');
  section.className = 'CMStatsSpellsSection';

  const conjureColor =
    Game.cookies + GetWrinkConfigBank() < CacheConjure ? ColorRed : ColorGreen;
  const conjureTime =
    Game.cookies + GetWrinkConfigBank() < CacheConjure
      ? FormatTime(
          (CacheConjure - (Game.cookies + GetWrinkConfigBank())) / GetCPS(),
        )
      : '';

  const conjureReqFrag = document.createDocumentFragment();
  const conjureReqSpan = document.createElement('span');
  conjureReqSpan.style.fontWeight = 'bold';
  conjureReqSpan.className = ColorTextPre + conjureColor;
  conjureReqSpan.textContent = Beautify(CacheConjure);
  conjureReqFrag.appendChild(conjureReqSpan);
  if (conjureTime !== '') {
    const conjureReqSmall = document.createElement('small');
    conjureReqSmall.textContent = ` (${conjureTime})`;
    conjureReqFrag.appendChild(conjureReqSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Conjure Baked Goods" Cookies Required',
      conjureReqFrag,
      'GoldCookTooltipPlaceholder',
    ),
  );
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Conjure Baked Goods" Reward (MAX)',
      document.createTextNode(Beautify(CacheConjureReward)),
      'GoldCookTooltipPlaceholder',
    ),
  );

  const conjureFrenzyColor =
    Game.cookies + GetWrinkConfigBank() < CacheConjure * 7
      ? ColorRed
      : ColorGreen;
  const conjureFrenzyCur = Math.min(
    (Game.cookies + GetWrinkConfigBank()) * 0.15,
    CacheNoGoldSwitchCookiesPS * 60 * 30,
  );
  const conjureFrenzyTime =
    Game.cookies + GetWrinkConfigBank() < CacheConjure * 7
      ? FormatTime(
          (CacheConjure * 7 - (Game.cookies + GetWrinkConfigBank())) / GetCPS(),
        )
      : '';

  const conjureFrenzyReqFrag = document.createDocumentFragment();
  const conjureFrenzyReqSpan = document.createElement('span');
  conjureFrenzyReqSpan.style.fontWeight = 'bold';
  conjureFrenzyReqSpan.className = ColorTextPre + conjureFrenzyColor;
  conjureFrenzyReqSpan.textContent = Beautify(CacheConjure * 7);
  conjureFrenzyReqFrag.appendChild(conjureFrenzyReqSpan);
  if (conjureFrenzyTime !== '') {
    const conjureFrenzyReqSmall = document.createElement('small');
    conjureFrenzyReqSmall.textContent = ` (${conjureFrenzyTime})`;
    conjureFrenzyReqFrag.appendChild(conjureFrenzyReqSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Conjure Baked Goods" Cookies Required (Frenzy)',
      conjureFrenzyReqFrag,
      'GoldCookTooltipPlaceholder',
    ),
  );
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Conjure Baked Goods" Reward (MAX) (Frenzy)',
      document.createTextNode(Beautify(CacheConjureReward * 7)),
      'GoldCookTooltipPlaceholder',
    ),
  );
  section.appendChild(
    StatsListing(
      'withTooltip',
      '"Conjure Baked Goods" Reward (CUR)',
      document.createTextNode(Beautify(conjureFrenzyCur)),
      'GoldCookTooltipPlaceholder',
    ),
  );
  if (CacheEdifice) {
    section.appendChild(
      StatsListing(
        'withTooltip',
        '"Spontaneous Edifice" Cookies Required (most expensive building)',
        document.createTextNode(
          `${Beautify(CacheEdifice)} (${CacheEdificeBuilding})`,
        ),
        'GoldCookTooltipPlaceholder',
      ),
    );
  }
  return section;
}

/**
 * This function creates the "Garden" section of the stats page
 * @returns	{object}	section		The object contating the Spells section
 */
export function GardenSection() {
  const section = document.createElement('div');
  section.className = 'CMStatsGardenSection';

  const bakeberryColor =
    Game.cookies < Game.cookiesPs * 60 * 10 * 100 ? ColorRed : ColorGreen;
  const bakeberryFrag = document.createElement('span');
  bakeberryFrag.style.fontWeight = 'bold';
  bakeberryFrag.className = ColorTextPre + bakeberryColor;
  bakeberryFrag.textContent = Beautify(Game.cookiesPs * 60 * 10 * 100);
  section.appendChild(
    StatsListing(
      'basic',
      'Cookies required for max reward of Bakeberry: ',
      bakeberryFrag,
    ),
  );

  const chocorootColor =
    Game.cookies < Game.cookiesPs * 60 * 100 ? ColorRed : ColorGreen;
  const chocorootFrag = document.createElement('span');
  chocorootFrag.style.fontWeight = 'bold';
  chocorootFrag.className = ColorTextPre + chocorootColor;
  chocorootFrag.textContent = Beautify(Game.cookiesPs * 60 * 100);
  section.appendChild(
    StatsListing(
      'basic',
      'Cookies required for max reward of Chocoroot: ',
      chocorootFrag,
    ),
  );

  const queenbeetColor =
    Game.cookies < Game.cookiesPs * 60 * 60 * 25 ? ColorRed : ColorGreen;
  const queenbeetFrag = document.createElement('span');
  queenbeetFrag.style.fontWeight = 'bold';
  queenbeetFrag.className = ColorTextPre + queenbeetColor;
  queenbeetFrag.textContent = Beautify(Game.cookiesPs * 60 * 60 * 25);
  section.appendChild(
    StatsListing(
      'basic',
      'Cookies required for max reward of Queenbeet: ',
      queenbeetFrag,
    ),
  );

  const duketaterColor =
    Game.cookies < Game.cookiesPs * 60 * 15 * 100 ? ColorRed : ColorGreen;
  const duketaterFrag = document.createElement('span');
  duketaterFrag.style.fontWeight = 'bold';
  duketaterFrag.className = ColorTextPre + duketaterColor;
  duketaterFrag.textContent = Beautify(Game.cookiesPs * 60 * 15 * 100);
  section.appendChild(
    StatsListing(
      'basic',
      'Cookies required for max reward of Duketater: ',
      duketaterFrag,
    ),
  );
  return section;
}

/**
 * This function creates the "Prestige" section of the stats page
 * @returns	{object}	section		The object contating the Prestige section
 */
export function PrestigeSection() {
  const section = document.createElement('div');
  section.className = 'CMStatsPrestigeSection';

  const possiblePresMax = Math.floor(
    Game.HowMuchPrestige(
      CacheRealCookiesEarned +
        Game.cookiesReset +
        CacheWrinklersTotal +
        (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg')
          ? CacheLastChoEgg
          : 0),
    ),
  );
  section.appendChild(
    StatsListing(
      'withTooltip',
      'Prestige Level (CUR / MAX)',
      document.createTextNode(
        `${Beautify(Game.prestige)} / ${Beautify(possiblePresMax)}`,
      ),
      'PrestMaxTooltipPlaceholder',
    ),
  );

  const neededCook = Math.max(
    0,
    Game.HowManyCookiesReset(possiblePresMax + 1) -
      (CacheRealCookiesEarned +
        Game.cookiesReset +
        CacheWrinklersTotal +
        ((
          Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg')
            ? CacheLastChoEgg
            : 0
        )
          ? CacheLastChoEgg
          : 0)),
  );
  const cookiesNextFrag = document.createDocumentFragment();
  cookiesNextFrag.appendChild(document.createTextNode(Beautify(neededCook)));
  const cookiesNextSmall = document.createElement('small');
  cookiesNextSmall.textContent = ` (${FormatTime(
    neededCook / CacheAvgCPSWithChoEgg,
    1,
  )})`;
  cookiesNextFrag.appendChild(cookiesNextSmall);
  section.appendChild(
    StatsListing(
      'withTooltip',
      'Cookies To Next Level',
      cookiesNextFrag,
      'NextPrestTooltipPlaceholder',
    ),
  );

  section.appendChild(
    StatsListing(
      'withTooltip',
      'Heavenly Chips (CUR / MAX)',
      document.createTextNode(
        `${Beautify(Game.heavenlyChips)} / ${Beautify(
          possiblePresMax - Game.prestige + Game.heavenlyChips,
        )}`,
      ),
      'HeavenChipMaxTooltipPlaceholder',
    ),
  );

  section.appendChild(
    StatsListing(
      'basic',
      'Heavenly Chips Per Second (last 5 seconds)',
      document.createTextNode(Beautify(CacheHCPerSecond, 2)),
    ),
  );

  const HCTarget = Number(CMOptions.HeavenlyChipsTarget);
  if (!Number.isNaN(HCTarget)) {
    const CookiesTillTarget =
      HCTarget -
      Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
    if (CookiesTillTarget > 0) {
      section.appendChild(
        StatsListing(
          'basic',
          'Heavenly Chips To Target Set In Settings (CUR)',
          document.createTextNode(Beautify(CookiesTillTarget)),
        ),
      );
      section.appendChild(
        StatsListing(
          'basic',
          'Time To Target (CUR, Current 5 Second Average)',
          document.createTextNode(
            FormatTime(CookiesTillTarget / CacheHCPerSecond),
          ),
        ),
      );
    }
  }

  const resetBonus = ResetBonus(possiblePresMax);
  const resetFrag = document.createDocumentFragment();
  resetFrag.appendChild(document.createTextNode(Beautify(resetBonus)));
  const increase = Math.round((resetBonus / Game.cookiesPs) * 10000);
  if (Number.isFinite(increase) && increase !== 0) {
    const resetSmall = document.createElement('small');
    resetSmall.textContent = ` (${increase / 100}% of income)`;
    resetFrag.appendChild(resetSmall);
  }
  section.appendChild(
    StatsListing(
      'withTooltip',
      'Reset Bonus Income',
      resetFrag,
      'ResetTooltipPlaceholder',
    ),
  );

  const currentPrestige = Math.floor(Game.HowMuchPrestige(Game.cookiesReset));
  const willHave = Math.floor(
    Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned),
  );
  const willGet = willHave - currentPrestige;
  if (!Game.Has('Lucky digit')) {
    let delta7 = 7 - (willHave % 10);
    if (delta7 < 0) delta7 += 10;
    const next7Reset = willGet + delta7;
    const next7Total = willHave + delta7;
    const frag7 = document.createDocumentFragment();
    frag7.appendChild(
      document.createTextNode(
        `${next7Total.toLocaleString()} / ${next7Reset.toLocaleString()} (+${delta7})`,
      ),
    );
    section.appendChild(
      StatsListing('basic', 'Next "Lucky Digit" (total / reset)', frag7),
    );
  }

  if (!Game.Has('Lucky number')) {
    let delta777 = 777 - (willHave % 1000);
    if (delta777 < 0) delta777 += 1000;
    const next777Reset = willGet + delta777;
    const next777Total = willHave + delta777;
    const frag777 = document.createDocumentFragment();
    frag777.appendChild(
      document.createTextNode(
        `${next777Total.toLocaleString()} / ${next777Reset.toLocaleString()} (+${delta777})`,
      ),
    );
    section.appendChild(
      StatsListing('basic', 'Next "Lucky Number" (total / reset)', frag777),
    );
  }

  if (!Game.Has('Lucky payout')) {
    let delta777777 = 777777 - (willHave % 1000000);
    if (delta777777 < 0) delta777777 += 1000000;
    const next777777Reset = willGet + delta777777;
    const next777777Total = willHave + delta777777;
    const frag777777 = document.createDocumentFragment();
    frag777777.appendChild(
      document.createTextNode(
        `${next777777Total.toLocaleString()} / ${next777777Reset.toLocaleString()} (+${delta777777})`,
      ),
    );
    section.appendChild(
      StatsListing('basic', 'Next "Lucky Payout" (total / reset)', frag777777),
    );
  }

  return section;
}

/**
 * This function creates the "Season Specials" section of the stats page
 * @returns	{object}	section		The object contating the Season Specials section
 */
export function SeasonSection() {
  const section = document.createElement('div');
  section.className = 'CMStatsSeasonSection';

  let specDisp = false;
  const missingHalloweenCookies = [];
  Object.keys(GameData.HalloCookies).forEach((i) => {
    if (!Game.Has(GameData.HalloCookies[i])) {
      missingHalloweenCookies.push(GameData.HalloCookies[i]);
      specDisp = true;
    }
  });
  const missingChristmasCookies = [];
  Object.keys(GameData.ChristCookies).forEach((i) => {
    if (!Game.Has(GameData.ChristCookies[i])) {
      missingChristmasCookies.push(GameData.ChristCookies[i]);
      specDisp = true;
    }
  });
  const missingValentineCookies = [];
  Object.keys(GameData.ValCookies).forEach((i) => {
    if (!Game.Has(GameData.ValCookies[i])) {
      missingValentineCookies.push(GameData.ValCookies[i]);
      specDisp = true;
    }
  });
  const missingNormalEggs = [];
  Object.keys(Game.eggDrops).forEach((i) => {
    if (!Game.HasUnlocked(Game.eggDrops[i])) {
      missingNormalEggs.push(Game.eggDrops[i]);
      specDisp = true;
    }
  });
  const missingRareEggs = [];
  Object.keys(Game.rareEggDrops).forEach((i) => {
    if (!Game.HasUnlocked(Game.rareEggDrops[i])) {
      missingRareEggs.push(Game.rareEggDrops[i]);
      specDisp = true;
    }
  });
  const missingPlantDrops = [];
  Object.keys(GameData.PlantDrops).forEach((i) => {
    if (!Game.HasUnlocked(GameData.PlantDrops[i])) {
      missingPlantDrops.push(GameData.PlantDrops[i]);
      specDisp = true;
    }
  });
  const choEgg =
    Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg');
  const centEgg = Game.Has('Century egg');

  if (Game.season === 'christmas' || specDisp || choEgg || centEgg) {
    section.appendChild(StatsHeader('Season Specials', 'Sea'));
    if (CMOptions.Header.Sea) {
      if (missingHalloweenCookies.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Halloween cookies left to buy',
            StatsMissDisp(missingHalloweenCookies),
          ),
        );
        let failRateHalloween = 0.95;
        if (Game.HasAchiev('Spooky cookies')) failRateHalloween = 0.8;
        if (Game.Has('Starterror')) failRateHalloween *= 0.9;
        failRateHalloween *= 1 / Game.dropRateMult();
        if (Game.hasGod) {
          const godLvl = Game.hasGod('seasons');
          if (godLvl === 1) failRateHalloween *= 0.9;
          else if (godLvl === 2) failRateHalloween *= 0.95;
          else if (godLvl === 3) failRateHalloween *= 0.97;
        }
        section.appendChild(
          StatsListing(
            'basic',
            'Chance of receiving a cookie from wrinkler/shiny wrinkler',
            document.createTextNode(
              `${Beautify((1 - failRateHalloween) * 100)}% / ${Beautify(
                (1 - failRateHalloween * 0.9) * 100,
              )}%`,
            ),
          ),
        );
      }
      if (missingChristmasCookies.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Christmas cookies left to buy',
            StatsMissDisp(missingChristmasCookies),
          ),
        );
        let failRateChristmas = 0.8;
        if (Game.HasAchiev('Let it snow')) failRateChristmas = 0.6;
        failRateChristmas *= 1 / Game.dropRateMult();
        if (Game.Has('Starsnow')) failRateChristmas *= 0.95;
        if (Game.hasGod) {
          const godLvl = Game.hasGod('seasons');
          if (godLvl === 1) failRateChristmas *= 0.9;
          else if (godLvl === 2) failRateChristmas *= 0.95;
          else if (godLvl === 3) failRateChristmas *= 0.97;
        }
        section.appendChild(
          StatsListing(
            'basic',
            'Chance of receiving a cookie from reindeer',
            document.createTextNode(
              `${Beautify((1 - failRateChristmas) * 100)}%`,
            ),
          ),
        );
      }
      if (missingValentineCookies.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Valentine cookies left to buy',
            StatsMissDisp(missingValentineCookies),
          ),
        );
      }
      const dropRateEgg = function (StartingFailRate) {
        let failRateEgg = StartingFailRate * (1 / Game.dropRateMult());
        if (Game.HasAchiev('Hide & seek champion')) failRateEgg *= 0.7;
        if (Game.Has('Omelette')) failRateEgg *= 0.9;
        if (Game.Has('Starspawn')) failRateEgg *= 0.9;
        if (Game.hasGod) {
          const godLvl = Game.hasGod('seasons');
          if (godLvl === 1) failRateEgg *= 0.9;
          else if (godLvl === 2) failRateEgg *= 0.95;
          else if (godLvl === 3) failRateEgg *= 0.97;
        }
        // Calculations courtesy of @svschouw, at https://github.com/Aktanusa/CookieMonster/issues/25
        const succesRateEgg = 1 - failRateEgg;
        const obtainedEggs = Game.eggDrops.length - missingNormalEggs.length;
        const obtainedRareEggs =
          Game.rareEggDrops.length - missingRareEggs.length;
        const pNormal1 =
          succesRateEgg * 0.9 * (1 - obtainedEggs / Game.eggDrops.length);
        const pRare1 =
          succesRateEgg *
          0.1 *
          (1 - obtainedRareEggs / Game.rareEggDrops.length);
        const pRedropNormal =
          succesRateEgg * 0.9 * (obtainedEggs / Game.eggDrops.length);
        const pRedropRare =
          succesRateEgg * 0.1 * (obtainedRareEggs / Game.rareEggDrops.length);
        const pRedrop = pRedropNormal + pRedropRare;
        const pNormal2 =
          pRedrop * 0.9 * (1 - obtainedEggs / Game.eggDrops.length);
        const pRare2 =
          pRedrop * 0.1 * (1 - obtainedRareEggs / Game.rareEggDrops.length);
        return [pNormal1 + pNormal2, pRare1 + pRare2];
      };
      if (missingNormalEggs.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Normal easter eggs left to unlock',
            StatsMissDisp(missingNormalEggs),
          ),
        );
        section.appendChild(
          StatsListing(
            'basic',
            'Chance of receiving an egg from wrinkler/golden cookie',
            document.createTextNode(
              `${Beautify(dropRateEgg(0.98)[0] * 100)}% / ${Beautify(
                dropRateEgg(0.9)[0] * 100,
              )}%`,
            ),
          ),
        );
      }
      if (missingRareEggs.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Rare easter eggs left to unlock',
            StatsMissDisp(missingRareEggs),
          ),
        );
        section.appendChild(
          StatsListing(
            'basic',
            'Chance of receiving a rare egg from wrinkler/golden cookie',
            document.createTextNode(
              `${Beautify(dropRateEgg(0.98)[1] * 100)}% / ${Beautify(
                dropRateEgg(0.9)[1] * 100,
              )}%`,
            ),
          ),
        );
      }
      if (missingPlantDrops.length !== 0) {
        section.appendChild(
          StatsListing(
            'basic',
            'Rare plant drops left to unlock',
            StatsMissDisp(missingPlantDrops),
          ),
        );
      }

      if (Game.season === 'christmas')
        section.appendChild(
          StatsListing(
            'basic',
            'Reindeer reward',
            document.createTextNode(Beautify(CacheSeaSpec)),
          ),
        );
      if (choEgg) {
        section.appendChild(
          StatsListing(
            'withTooltip',
            'Chocolate egg cookies',
            document.createTextNode(Beautify(CacheLastChoEgg)),
            'ChoEggTooltipPlaceholder',
          ),
        );
      }
      if (centEgg) {
        section.appendChild(
          StatsListing(
            'basic',
            'Century egg multiplier',
            document.createTextNode(
              `${Math.round((CacheCentEgg - 1) * 10000) / 100}%`,
            ),
          ),
        );
      }
    }
  }
  return section;
}
