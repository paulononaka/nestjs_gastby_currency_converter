import {ApiService} from './api.service';
import {HttpService} from '@nestjs/common';
import {of} from 'rxjs';
import {AxiosResponse} from 'axios';
import {ConfigService} from '@nestjs/config';
import {ConvertCurrency} from '../models/convert.currency';
import {ConvertCurrencyApiResponse} from './responses/convert.currency.api.response';

describe('CurrencyApiService', () => {
  let httpService: HttpService;
  let currencyApiService: ApiService;

  beforeEach(() => {
    httpService = new HttpService()
    currencyApiService = new ApiService(httpService, new ConfigService());
  });

  describe('convert', () => {
    it('should return the result of currencyApiService', async () => {
      const convertCurrency = new ConvertCurrency('BRL', 'USD', 5)

      const result: AxiosResponse = {
        data: { "BRL_USD": 5.334904 },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

      const expectedResult = new ConvertCurrencyApiResponse(5.334904)
      expect(await currencyApiService.convert(convertCurrency)).toEqual(expectedResult);
    });
  });
});
