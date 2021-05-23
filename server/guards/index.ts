import { IRequirementDoc } from './../types/requirement'

export function isRequirement(obj: any): obj is IRequirementDoc {
  return !obj.isPlaceholder
}
