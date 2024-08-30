import moment from "moment";

export const checkUpload = (body: any):Promise<{checkes:boolean, err: string}>=>{
    return new Promise((resolve)=>{
        try {
            if (!/^data:image\/(?:jpeg|png|gif|webp);base64,/.test(body.image)) {
                throw new Error('INVALID DATA: image')
            }
            if(typeof body.customer_code !== "string"){
                throw new Error('INVALID DATA: customer_code');
            }
            if(!moment(body.measure_datetime).isValid()){
                throw new Error('INVALID DATA: measure_datetime');
            }
            if(body.measure_type !== "WATER" && body.measure_type !== "GAS"){
                throw new Error('INVALID DATA: measure_type');
            }
            resolve({checkes: true, err: ""})
        } catch (error:any) {
            resolve({checkes: false, err: error.message})
        }
    })
}

export const checkConfirm = (body: any):Promise<{checkes:boolean, err: string}>=>{
    return new Promise((resolve)=>{
        try {
            if (typeof body.measure_uuid !== "string") {
                throw new Error('INVALID DATA: measure_uuid')
            }
            if(!Number.isInteger(body.confirmed_value)){
                throw new Error('INVALID DATA: confirmed_value');
            }
            resolve({checkes: true, err: ""})
        } catch (error:any) {
            resolve({checkes: false, err: error.message})
        }
    })
}

export const checkList = (measure_type: any):Promise<{checkes:boolean, err: string}>=>{
    return new Promise((resolve)=>{
        try {
            if(measure_type.toUpperCase() !== "WATER" && measure_type.toUpperCase() !== "GAS"){
                throw new Error('Tipo de medição não permitida');
            }
            resolve({checkes: true, err: ""})
        } catch (error:any) {
            resolve({checkes: false, err: error.message})
        }
    })
}