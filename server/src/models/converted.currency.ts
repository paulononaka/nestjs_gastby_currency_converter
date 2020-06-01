export class ConvertedCurrency {

  from: string;
  to: string;
  amount: number;
  response: number;

  constructor(from: string, to: string, amount: number, response: number) {
    this.from = from
    this.to = to
    this.amount = Number(amount)
    this.response = Number(response)
  }
}
