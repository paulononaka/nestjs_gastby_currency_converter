import {ConvertedCurrency} from '../models/converted.currency';
import {HistoryService} from "./history.service";
import {Test} from "@nestjs/testing";
import {getModelToken} from "@nestjs/mongoose";
import assert = require("assert");

describe('HistoryService', () => {

    describe('create', () => {
        it('should save the received model', async () => {
            let hasSavedModel = false;

            function mockHistoryModel(dto: any) {
                this.data = dto;
                this.save = () => {
                    hasSavedModel = true
                    return this.data;
                };
            }

            const mockMongooseTokens = [
                {
                    provide: getModelToken('History'),
                    useValue: mockHistoryModel
                },
            ]

            const module = await Test.createTestingModule({
                providers: [
                    HistoryService,
                    ...mockMongooseTokens
                ]
            }).compile();

            const historyService = module.get<HistoryService>(HistoryService);

            const mock = new ConvertedCurrency('USD', 'BRL', 10.669808)

            await historyService.create(mock)

            assert(hasSavedModel, 'HistoryService should save the received model')
        });
    });

    describe('findAll', () => {
        it('should return the execution of the find', async () => {

            const mockHistoryModel = {
                find: () => { return { sort: () => { return { limit: () => { return { exec: () => { return [1, 2] }}}}}}}
            }

            const mockMongooseTokens = [
                {
                    provide: getModelToken('History'),
                    useValue: mockHistoryModel
                },
            ]

            const module = await Test.createTestingModule({
                providers: [
                    HistoryService,
                    ...mockMongooseTokens
                ]
            }).compile();

            const historyService = module.get<HistoryService>(HistoryService);

            const histories = await historyService.findAll();

            expect(histories).toHaveLength(2)
        });
    });
});
