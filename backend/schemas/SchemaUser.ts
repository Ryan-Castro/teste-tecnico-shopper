import mongoose from "mongoose";


const Schema = mongoose.Schema;

interface IMensure{
  measure_uuid: string,
  measure_datetime: string,
  measure_type: string,
  has_confirmed:boolean,
  image_url: string
  measure_value: Number
}

export const UserSchema = new Schema({
  customer_code: String,
  measures: Array<IMensure>
});