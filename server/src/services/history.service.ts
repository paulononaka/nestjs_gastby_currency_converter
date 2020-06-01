import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {History} from '../schemas/history.schema';
import {ConvertedCurrency} from "../models/converted.currency";

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History.name) private readonly convertedCurrencyModel: Model<History>) {}

  async create(convertedCurrency: ConvertedCurrency): Promise<History> {
    const history = new this.convertedCurrencyModel(convertedCurrency);
    return history.save();
  }

  async findAll(): Promise<History[]> {
    return this.convertedCurrencyModel.find().sort({ createdAt: -1 }).limit(10).exec();
  }
}
