import {Controller, Get, Query} from '@nestjs/common';
import {ConvertedCurrency} from '../models/converted.currency';
import {ConvertCurrency} from '../models/convert.currency';
import {ConverterService} from '../services/converter.service';
import {HistoryService} from "../services/history.service";

@Controller('convert')
export class ConvertController {
  constructor(private readonly converterService: ConverterService,
              private readonly historyService: HistoryService) {}

  @Get()
  async convert(@Query() convertCurrency: ConvertCurrency): Promise<ConvertedCurrency> {
    const convertedCurrency = await this.converterService.convert(convertCurrency);

    await this.historyService.create(convertedCurrency);

    return convertedCurrency
  }
}
