import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const consultAPI = async (filename:string, extension: string):Promise<Number>=>{
    return new Promise(async (resolve)=>{
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({
            // Choose a Gemini model.
            model: "gemini-1.5-flash",
        });
        const uploadResponse = await fileManager.uploadFile(`./public/${filename}.${extension}`, {
            mimeType: `image/${extension}`,
            displayName: filename,
        });
        const result = await model.generateContent([
        {
            fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri
            }
        },
        { text: "Extraia o valor numérico de um medidor de utilidade (água ou gás) a partir da imagem, considerando possíveis variações de design, iluminação e distorções. Retorne apenas o número inteiro, sem texto." },
        ]);
        const res = !isNaN(parseInt(result.response.text()))? parseInt(result.response.text()): 0
        resolve(res)
    })
}