export interface Expense {
  id: number;
  expense_type: string;
  expense_date: string;
  expense_amount: string;
  description: string;
}

export type Expenses = Expense [] | undefined
export interface IProfile {
  first_name: string;
  last_name: string;
  email: string;
}

export type userType = {
  email:string,
  password:string,
  cpassword?:string
}