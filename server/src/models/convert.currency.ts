import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
import {Transform} from 'class-transformer';

export class ConvertCurrency {

  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  from: string;

  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  to: string;

  @Transform(amount => parseFloat(amount))
  @IsNumber()
  amount: number;

  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
