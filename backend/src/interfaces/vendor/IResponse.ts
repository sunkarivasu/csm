import { Response } from "express";

interface IJson {
  msg: string;
  data?: any;
  err?: any;
};

type TResponseCodes = 200 | 201 | 400 | 401 | 403 | 404 | 422 | 500 | 503

export interface IResponse extends Response {
    json: (body: IJson) => this;
    status: (code: TResponseCodes) => this;
}