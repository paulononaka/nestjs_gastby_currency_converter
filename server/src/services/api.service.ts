import {HttpService, Injectable} from '@nestjs/common';
import {map} from 'rxjs/operators';
import {ConfigService} from '@nestjs/config';
import {ConvertCurrency} from '../models/convert.currency';
import {ConvertCurrencyApiResponse} from './responses/convert.currency.api.response';

@Injectable()
export class ApiService {

  constructor(private http: HttpService, private configService: ConfigService) {}

  async convert(convertCurrency: ConvertCurrency): Promise<ConvertCurrencyApiResponse> {

    const apiKey = this.configService.get<string>('API_KEY');
    const url = `https://free.currconv.com/api/v7/convert?q=${convertCurrency.from}_${convertCurrency.to}&compact=ultra&apiKey=${apiKey}`;

    return await this.http
      .get(url)
      .pipe(
        map(res => (
          { response: res.data[`${convertCurrency.from}_${convertCurrency.to}`] }
        )))
      .toPromise()
  }
}
