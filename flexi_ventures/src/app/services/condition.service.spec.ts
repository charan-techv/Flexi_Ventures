import { ConditionService } from './condition.service';

describe('ConditionService', () => {
  let service: ConditionService;

  beforeEach(() => {
    service = new ConditionService();
  });

  it('should evaluate AND conditions correctly', () => {
    const field = {
      condition: 'and',
      rules: [
        { field: 'Price', operator: '>=', value: 100 },
        { field: 'Refurbished', operator: '!=', value: 'No' },
      ],
    };
    const formValue = { Price: 150, Refurbished: 'Yes' };
    expect(service.evaluateCondition(field, formValue)).toBe(true);
  });

  it('should evaluate OR conditions correctly', () => {
    const field = {
      condition: 'or',
      rules: [
        { field: 'Order No', operator: '>=', value: 100 },
        { field: 'Price', operator: '<=', value: 50 },
      ],
    };
    const formValue = { 'Order No': 50, Price: 45 }; 
    expect(service.evaluateCondition(field, formValue)).toBe(true);
  });
});
