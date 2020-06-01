import {ConvertController} from './convert.controller';
import {ConvertedCurrency} from '../models/converted.currency';
import {ConvertCurrency} from '../models/convert.currency';
import {ConverterService} from '../services/converter.service';
import {HistoryService} from "../services/history.service";

describe('AppController', () => {
  describe('convert', () => {
    it('should return the result of converterService', async () => {
      const historyService = new HistoryService(null)
      const converterService = new ConverterService(null)
      const appController = new ConvertController(converterService, historyService);

      jest.spyOn(historyService, 'create').mockImplementation()

      const currencyApiServiceResult = new ConvertedCurrency('BRL', 'USD', 5.334904)
      jest.spyOn(converterService, 'convert').mockResolvedValue(currencyApiServiceResult)

      const convertCurrency = new ConvertCurrency('BRL', 'USD', 5)
      expect(await appController.convert(convertCurrency)).toBe(currencyApiServiceResult);
    });
  });
});
