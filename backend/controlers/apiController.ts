import { checkConfirm, checkCreateAacount, checkList, checkUpload } from '../usecase/CheckBodyCase';
import { Request, Response } from 'express';
import { consultAPI } from '../usecase/ConsultAPICase';
import { UserSchema } from '../schemas/SchemaUser';
import { randomUUID } from "crypto";
import { resError } from "./requestController";
import mongoose from 'mongoose';
import moment from 'moment';
import path from 'path';
import fs from 'fs'
import 'dotenv/config'

const imageDirectory = path.join(__dirname, '..', '..' , 'public');

const introControll = (req: Request, res: Response) => {
    res.json({ routes: [
      {
        url: "localhost:3000/upload",
        body: {
          "image": "base64",
          "customer_code": "string",
          "measure_datetime": "datetime",
          "measure_type": "'WATER' ou 'GAS'"
         }
      },
      {
        url: "localhost:3000/confirm",
        body: {
          "measure_uuid": "string",
          "confirmed_value": 'integer'
         }
      },
      {
        url: "localhost:3000/<customer code>/list",
      },
    ] })
}

const crateAacontControll = async (req: Request, res: Response) =>{
  const body = req.body
  console.log(req.body)
  const status = await checkCreateAacount(body)
  if(!status.checkes){
    resError(res, 400, "INVALID_DATA", status.err)
    return
  }
  const User = mongoose.model('User', UserSchema)
  const userfind = await User.findOne({customer_code: body.customer_code})
  if(!userfind){
    const newUser = new User({customer_code: body.customer_code, measure: []})
    await newUser.save()
    res.status(200)
    res.json({
        "customer_code": body.customer_code,
    })
  }else{
    resError(res, 400, "INVALID_DATA", "USER_EXIST")
  }
}

const uploadControll = async (req: Request, res: Response) =>{
    const body = req.body
    const status = await checkUpload(body)
    if(!status.checkes){
      resError(res, 400, "INVALID_DATA", status.err)
      return
    }
    const User = mongoose.model('User', UserSchema)
    const userfind = await User.findOne({customer_code: body.customer_code})
    let doc
    if(!userfind){
      resError(res, 400, "INVALID_DATA", "USER_NOTFONT")
    }else{
      doc = userfind
    }
    const measureExist = await User.findOne({
      customer_code: body.customer_code,
      measures: {
        $elemMatch: {
          measure_datetime: moment(body.measure_datetime).format("YYYY-MM-00T00:00:00Z") ,
          measure_type: body.measure_type
        }
      }
    });
    if(measureExist){
      resError(res, 409, "DOUBLE_REPORT", "Leitura do mês já realizada")
      return
    }

    const match = body.image.match(/^data:image\/([^;]+);/);
    const buffer = Buffer.from(body.image.split(",")[1], 'base64');
    const filename = moment().format("YYYYMMDDHHmmss")
    const uuid = randomUUID()
    fs.writeFile(`./public/${filename}.${match[1]}`, buffer, async()=>{
      const result = await consultAPI(filename, match[1])
      const measures: any = doc.measures!
      const measure = {
        "measure_uuid": uuid,
        "measure_datetime": moment(body.measure_datetime).format("YYYY-MM-00T00:00:00Z"),
        "measure_type": body.measure_type,
        "has_confirmed": false,
        "image_url": `http://localhost:3000/public/${filename}.${match[1]}`,
        "measure_value": result,
      }
      measures.push(measure)
      await User.updateOne({customer_code: body.customer_code}, {customer_code: body.customer_code, measures: measures})
      res.status(200)
      res.json({
          "image_url": `http://localhost:3000/public/${filename}.${match[1]}`,
          "measure_value": result,
          "measure_uuid": uuid
        })
    });
      

}

const confirmControll = async (req: Request, res: Response) =>{
  const body = req.body
  const status = await checkConfirm(body)
  if(!status.checkes){
    resError(res, 400, "INVALID_DATA", status.err)
    return
  }
  const User = mongoose.model('User', UserSchema)
  const measureExist: any = await User.findOne({
    measures: {
      $elemMatch: {
        measure_uuid: body.measure_uuid,
      }
    }
  });
  if(!measureExist){
    resError(res, 404, "MEASURE_NOT_FOUND", "Leitura do mês não realizada")
    return
  }
  const measure = measureExist.measures!.find((measure: any)=>measure.measure_uuid == body.measure_uuid )
  if(measure.has_confirmed){
    resError(res, 409, "CONFIRMATION_DUPLICATE", "Leitura do mês já confirmada")
    return
  }
  const index = measureExist.measures!.indexOf(measure)
  measureExist.measures![index].measure_value = body.confirmed_value
  measureExist.measures![index].has_confirmed = true
  await User.updateOne({customer_code: measureExist.customer_code}, {customer_code: measureExist.customer_code, measures: measureExist.measures!})
  res.status(200)
  res.json({success: true})
  return
}

const listControll = async (req: Request, res: Response) =>{
    const customercode = req.params.customercode;
    const measure_type: any = req.query.measure_type;
    if(measure_type) {
      const status = await checkList(measure_type);
      if(!status.checkes){
        resError(res, 400, "INVALID_DATA", status.err);
        return;
      }
    }
    const User = mongoose.model('User', UserSchema);
    const userfind = await User.findOne({customer_code: customercode})
    if(!userfind){
      resError(res, 404, "MEASURES_NOT_FOUND", "Nenhuma leitura encontrada");
      return
    }
    let measures: any = userfind.measures!
    if(measure_type){
      measures = measures.filter((measure:any)=>measure.measure_type == measure_type.toUpperCase())
    }
    if(measures.length < 1){
      resError(res, 404, "MEASURES_NOT_FOUND", "Nenhuma leitura encontrada");
      return
    }
    res.status(200)
    res.json({
        "customer_code": customercode,
        "measures": measures
      })

}

const imageControll = (req: Request, res: Response) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(imageDirectory, imageName);

  res.sendFile(imagePath);
}

export {crateAacontControll, introControll, uploadControll, confirmControll, listControll, imageControll}