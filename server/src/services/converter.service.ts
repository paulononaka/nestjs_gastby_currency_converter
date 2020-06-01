import {Injectable} from '@nestjs/common';
import {ConvertedCurrency} from '../models/converted.currency';
import {ConvertCurrency} from '../models/convert.currency';
import {ApiService} from './api.service';

@Injectable()
export class ConverterService {

  constructor(private readonly currencyApiService: ApiService) {}

  async convert(convertCurrency: ConvertCurrency): Promise<ConvertedCurrency> {

    const convertCurrencyApiResponse = await this.currencyApiService.convert(convertCurrency);

    return new ConvertedCurrency(
        convertCurrency.from,
        convertCurrency.to,
        convertCurrency.amount,
        convertCurrencyApiResponse.response * convertCurrency.amount
    )
  }
}
