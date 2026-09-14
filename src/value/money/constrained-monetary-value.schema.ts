// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0
import { z } from "zod";

export const MonetaryValueEUR2Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(2),
    value: z.number().int().min(-9007199254740991).max(9007199254740991),
  })
  .passthrough()
  .meta({
    id: "MonetaryValueEUR2",
    description:
      'The value has 2 decimals, and must be in the interval\n    [-90 071 992 547 409,91; 90 071 992 547 409,91]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [
      { currency: "EUR", decimals: 2, value: 0 },
      { currency: "EUR", decimals: 2, value: 0 },
      { currency: "EUR", decimals: 2, value: -9007199254740991 },
      { currency: "EUR", decimals: 2, value: 9007199254740991 },
    ],
  });
export type MonetaryValueEUR2 = z.infer<typeof MonetaryValueEUR2Schema>;

export const ZeroMonetaryValueEUR2Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(2),
    value: z.number().int().min(-9007199254740991).max(9007199254740991),
  })
  .passthrough()
  .meta({
    id: "ZeroMonetaryValueEUR2",
    description:
      'The value has 2 decimals, and must be in the interval\n    [-90 071 992 547 409,91; 90 071 992 547 409,91]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [{ currency: "EUR", decimals: 2, value: 0 }],
  });
export type ZeroMonetaryValueEUR2 = z.infer<typeof ZeroMonetaryValueEUR2Schema>;

export const NonNegativeMonetaryValueEUR2Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(2),
    value: z.number().int().min(0).max(9007199254740991),
  })
  .passthrough()
  .meta({
    id: "NonNegativeMonetaryValueEUR2",
    description:
      'The value has 2 decimals, and must be in the interval\n    [0,00; 90 071 992 547 409,91]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [{ currency: "EUR", decimals: 2, value: 3002399751580331 }],
  });
export type NonNegativeMonetaryValueEUR2 = z.infer<
  typeof NonNegativeMonetaryValueEUR2Schema
>;

export const PositiveMonetaryValueEUR2Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(2),
    value: z.number().int().min(1).max(9007199254740991),
  })
  .passthrough()
  .meta({
    id: "PositiveMonetaryValueEUR2",
    description:
      'The value has 2 decimals, and must be in the interval\n    [0,01; 90 071 992 547 409,91]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [{ currency: "EUR", decimals: 2, value: 3002399751580331 }],
  });
export type PositiveMonetaryValueEUR2 = z.infer<
  typeof PositiveMonetaryValueEUR2Schema
>;

export const PositiveMonetaryValueEUR4Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(4),
    value: z.number().int().min(1).max(9007199254740991),
  })
  .passthrough()
  .meta({
    id: "PositiveMonetaryValueEUR4",
    description:
      'The value has 4 decimals, and must be in the interval\n    [0,000 1; 900 719 925 474,099 1]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [{ currency: "EUR", decimals: 4, value: 3002399751580331 }],
  });
export type PositiveMonetaryValueEUR4 = z.infer<
  typeof PositiveMonetaryValueEUR4Schema
>;

export const NegativeMonetaryValueEUR2Schema = z
  .object({
    currency: z.literal("EUR"),
    decimals: z.literal(2),
    value: z.number().int().min(-9007199254740991).max(-1),
  })
  .passthrough()
  .meta({
    id: "NegativeMonetaryValueEUR2",
    description:
      'The value has 2 decimals, and must be in the interval\n    [-90 071 992 547 409,91; -0,01]\n\nThe currency is EUR.\n\nRepresentation of an amount of money, in the given `currency`, with the given `decimals`.\n\nE.g., `{"currency": "EUR", "decimals": 4, "value": 88584439}` represents €&nbsp;8&nbsp;858,443&nbsp;9.\n\nThe `value` is always expressed as an integer. The decimal it represents is\n<code>value.10<sup>&#8239;‑decimals</sup></code>. E.g., `{"decimals": 4, "value": 88584439}` represents\n858,443&nbsp;9.\n\nCalculation with decimals **MUST** be exact. Only addition (which implies multiplication with integers) and\nsubtraction is safe, but multiplication with non-integers (which implies division) and other operations are not. With\nany other arithmetic operation, the result must explicitly be converted to  definite number of decimals before\ncontinuing. To what number of decimals this needs to done is an explicit business decision. E.g., to divide 10,00 in 3\nparts, we must decide that we will work with a factor 2, and in some way get 3,33, 3,33, and _3,34_, or, alternatively,\nget 3,33 3 times, and decide what to do with the remaining _0,01_.\n\nDecimals **MUST** be transported and calculated with as integers, and not as floats or doubles, because some decimal\nfractions, e.g., `0.1`, _cannot be represented as binary 32- or 64-bit floating point numbers_. If we intend 0.1, and\nwe represent the value as `0.1` in JSON, it will be interpreted on reception as a number close to, but not equal to\n`0.1`. If we want to calculate 3 times decimal 0.1, and we execute `0.1 + 0.1 + 0.1` or `3 * 0.1`, we get\n`0.30000000000000004 ≠ 0.3`. When we instead represent the decimal as 10∙10<sup>-2</sup>, there is no issue:\n<code>10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> + 10∙10<sup>-2</sup> = (10 + 10 + 10)∙10<sup>-2</sup> =\n30∙10<sup>-2</sup></code>.\n\nThe largest `value` that can be represented is\n`Number.MAX_SAFE_INTEGER` = 9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991, and the smallest is\n`Number.MIN_SAFE_INTEGER` = -9&nbsp;007&nbsp;199&nbsp;254&nbsp;740&nbsp;991 (~&nbsp;±9∙10<sup>15</sup>). With 4\ndecimals, this could represent 900&nbsp;719&nbsp;925&nbsp;474,0991 ~ 900&nbsp;billion.\n\nNote that, for addition, all terms must be converted to a representation with the smallest `decimal` value of all\nterms:\n\n<pre>\n\n{"decimals": 4, "value": 88584439} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 885844} +\n\n    {"decimals": 2, "value": 89418456}\n\n= {"decimals": 2, "value": 90304300}\n\n</pre>\n\nThis means: 8&nbsp;858,443&nbsp;9 + 894&nbsp;184,56 = 903&nbsp;043,00. The remaining 0,003&nbsp;9 is lost in rounding.\n\nThe advised approach is to never add decimals that have different decimals.',
    examples: [{ currency: "EUR", decimals: 2, value: -3002399751580330 }],
  });
export type NegativeMonetaryValueEUR2 = z.infer<
  typeof NegativeMonetaryValueEUR2Schema
>;
