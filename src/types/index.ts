import { ReactElement } from "react";

export interface IAnswer {
  id: number;
  text: string;
  is_correct: boolean;
  total_vote: number;
}

export interface IQuestion {
  id: number;
  uid: string;
  userId: number;
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
  is_correct: boolean;
  total_vote: number;
}
export interface ICreateQuestion {
  Question: string;
  is_publish: boolean;
  Answers: ICreateAnswers[];
}
