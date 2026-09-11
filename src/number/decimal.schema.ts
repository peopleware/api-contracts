// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const DecimalSchema = z
  .object({ decimals: z.number().int(), value: z.number().int() })
  .passthrough()
  .meta({
    id: "Decimal",
    description:
      'The `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [
      { decimals: 4, value: 7475005 },
      { decimals: 2, value: -84884 },
      { decimals: 4, value: 0 },
      { decimals: 0, value: 84884 },
      { decimals: -8, value: 884 },
    ],
  });
export type Decimal = z.infer<typeof DecimalSchema>;
