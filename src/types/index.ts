import { ReactElement } from "react";

export interface IAnswer {
  id: number;
  text: string;
  isCurrect: boolean;
  votePortion: number;
}

export interface IQuestion {
  id: number;
  uid: string;
  is_publish: boolean;
  text: string;
  answers: IAnswer[];
}

export interface IOption {
  title: string;
  click?: any;
  icon?: ReactElement;
}

export interface IUserInfo {
  username: string;
  email: string;
  password: string;
}

export interface IMenuItem {
  title: string;
  link: string;
}

export interface ICreateAnswers {
  text: string;
  isCurrect: boolean;
  votePortion: number;
}
export interface ICreateQuestion {
  Question: string;
  is_publish: boolean;
  Answers: ICreateAnswers[];
}
