import {ApiService} from '../services/api.service';
import {ConvertedCurrency} from '../models/converted.currency';
import {ConvertCurrency} from '../models/convert.currency';
import {ConverterService} from './converter.service';
import {ConvertCurrencyApiResponse} from './responses/convert.currency.api.response';

describe('ConverterService', () => {
  let converterService: ConverterService;
  let currencyApiService: ApiService;

  beforeEach(() => {
    currencyApiService = new ApiService(null, null);
    converterService = new ConverterService(currencyApiService);
  });

  describe('convert', () => {
    it('should multiply the result of currencyApiService with the amount sent', async () => {
      const convertCurrency = new ConvertCurrency('USD', 'BRL', 2)

      const currencyApiServiceResult = new ConvertCurrencyApiResponse(5.334904)
      jest.spyOn(currencyApiService, 'convert').mockResolvedValue(currencyApiServiceResult)

      const expectedResult = new ConvertedCurrency('USD', 'BRL', 2, 10.669808)
      expect(await converterService.convert(convertCurrency)).toEqual(expectedResult);
    });
  });
});
