import { useRef } from "react";


function AddImg(props:{handleLayer:(layer:number)=>void}) {
    const InputFileRef = useRef<HTMLInputElement>(null)
    const ImgRef = useRef<HTMLImageElement>(null)
    const InputNameRef = useRef<HTMLInputElement>(null)
    const InputDateRef = useRef<HTMLInputElement>(null)
    const SelectRef = useRef<HTMLSelectElement>(null)
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"

    function handleImage(){
      const reader = new FileReader();
      if(InputFileRef.current?.files && ImgRef.current){
        const file= InputFileRef.current!.files[0]
        reader.onload = () => {
          const Base64: any = reader.result;
          ImgRef.current!.src = Base64
      };
        reader.readAsDataURL(file)
      }
    }

    async function addImg(){
      const customer_code = InputNameRef.current?.value
      const date = InputDateRef.current?.value
      const option = SelectRef.current?.options[SelectRef.current?.selectedIndex].value
      const reader = new FileReader();
      if(InputFileRef.current?.files){
        const file= InputFileRef.current!.files[0]
        reader.onload = async () => {
          const Base64: any = reader.result;
          console.log({
            image: Base64,
            customer_code,
            measure_datetime: date,
            measure_type: option
          })
          await fetch("http://localhost:8090/upload", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              image: Base64,
              customer_code,
              measure_datetime: date,
              measure_type: option
            })
          }).then(res=>res.json()).then(json=>{
            console.log(json)
          })
      };
        reader.readAsDataURL(file)
      }

    }

    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <img src="" alt="" className="border w-80 h-80" ref={ImgRef}/>
        <input type="file"    className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" ref={InputFileRef} onChange={handleImage}/>
        <input type="text"    placeholder="Seu nome"  className="border w-80 py-4 bg-slate-800 text-white rounded-xl pl-4" ref={InputNameRef}/>
        <input type="date"    className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" ref={InputDateRef}/>
        <select name="" id="" className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" ref={SelectRef}>
          <option value="WATER">Conta de Água</option>
          <option value="GAS">Conta de Gás</option>
        </select>
        <input type="button" value="Enviar imagem"  className={Button} onClick={addImg}/>
        <input type="button" value="Voltar"    className={Button} onClick={()=>{props.handleLayer(0)}}/>
      </div>
    );
  }
  
  export default AddImg;
  