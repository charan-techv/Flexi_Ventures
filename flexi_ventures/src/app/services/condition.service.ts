import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConditionService {
  evaluateCondition(field: any, formValue: any): boolean {
    const rules = field.rules || [];
    const condition = field.condition || 'and';
    const results = rules.map((rule: { field: string | number; operator: any; value: number; }) => {
      const fieldValue = formValue[rule.field];
      switch (rule.operator) {
        case '!=':
          return fieldValue !== rule.value;
        case '>=':
          return fieldValue >= rule.value;
        case '<=':
          return fieldValue <= rule.value;
        default:
          return false;
      }
    });
    return condition === 'and' ? results.every(Boolean) : results.some(Boolean);
  }
}
