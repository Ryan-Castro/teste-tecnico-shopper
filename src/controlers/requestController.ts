import { Response } from 'express';

export const resError = (res: Response, code:number, error_code:string, error_description: string)=>{
    res.status(code)
    res.json({
        "error_code": error_code,
        "error_description": error_description})
}