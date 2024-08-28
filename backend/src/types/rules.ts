import { InstanceType } from './previas';

export type RuleObject =
  | {
      rule: RuleTypes.AND;
      prevs: RuleObject[];
    }
  | {
      rule: RuleTypes.OR;
      prevs: RuleObject[];
    }
  | {
      rule: RuleTypes.NOT;
      prevs: RuleObject;
    }
  | {
      rule: RuleTypes.SOME;
      amount: number | null;
      prevs: RuleObject[];
    }
  | {
      rule: RuleTypes.UC;
      code: string | null;
      name: string | null;
      instance: InstanceType | null;
    }
  | {
      rule: RuleTypes.GROUP_CREDITS;
      code: number | null;
      name: string | null;
      amount: number | null;
    }
  | {
      rule: RuleTypes.PLAN_CREDITS;
      amount: number | null;
    }
  | undefined;

export enum RuleTypes {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  SOME = 'SOME',
  UC = 'UC',
  GROUP_CREDITS = 'GROUP_CREDITS',
  PLAN_CREDITS = 'PLAN_CREDITS'
}
