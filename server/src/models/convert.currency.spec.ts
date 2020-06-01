import {ConvertCurrency} from './convert.currency';
import {plainToClass} from 'class-transformer';
import assert = require('assert');

describe('ConvertCurrency', () => {

  describe('validates', () => {
    it('amount should be number', async () => {

      const convertCurrency = plainToClass(ConvertCurrency, {
        "amount": 'I am not a number'
      });

      assert.strictEqual(convertCurrency.amount, NaN);
    });
  });
});
