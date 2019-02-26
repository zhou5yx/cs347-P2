import { IAccount } from '../interfaces/account.type';

export class AccountService {
  currentAccount: IAccount = {username: 'spagett', type: 'ta', courses: []};
}
