import {Controller, Get} from '@nestjs/common';
import {HistoryService} from '../services/history.service';
import {History} from '../schemas/history.schema';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async findAll(): Promise<History[]> {
    return this.historyService.findAll();
  }
}
