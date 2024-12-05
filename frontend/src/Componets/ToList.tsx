import { useRef, useState } from "react";

type listIten = {
  has_confirmed: boolean,
  image_url: string,
  measure_datetime: string,
  measure_type: string,
  measure_uuid: string,
  measure_value: number
}

function ToList(props:{handleLayer:(layer:number)=>void}) {
    const inputNameRef = useRef<HTMLInputElement>(null)
    const SelectRef = useRef<HTMLSelectElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const [listItens, setListItens] = useState<listIten[]>([])
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"

    async function toList(){
      const customer_code = inputNameRef.current?.value
      const option = SelectRef.current?.options[SelectRef.current?.selectedIndex].value
      let config = ""
      if(option !== ""){
        config = `measure_type=${option}`
      }
      await fetch(`http://localhost:8090/${customer_code}/list?${config}`).then(res=>res.json()).then(json=>{
        setListItens(json.measures)
        modalRef.current?.classList.remove("hidden")
        modalRef.current?.classList.add("flex")
      })
    }
    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <input type="text"  placeholder="Seu nome"  className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" ref={inputNameRef}/>
        <select name="" id="" className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" ref={SelectRef}>
          <option value="">Todos</option>
          <option value="WATER">Conta de Água</option>
          <option value="GAS">Conta de Gás</option>
        </select>
        <input type="button" value="Enviar Correção"  className={Button} onClick={toList}/>
        <input type="button" value="Voltar"  className={Button} onClick={()=>{props.handleLayer(0)}}/>
        <div className="w-screen h-screen fixed left-0 top-0 hidden justify-center items-center Modal" ref={modalRef}>
          <div className="w-11/12 h-5/6 bg-white flex rounded-2xl justify-center items-center flex-col gap-2">
            <div className="w-11/12 h-4/6 rounded shadow-xl">
              {listItens.map((item, i)=>
              <div className="p-2 shadow flex gap-2" key={i}>
                <img src={item.image_url} alt="" className="w-32 h-32"/>
                <div>
                  <p>Id: {item.measure_uuid}</p>
                  <p>Tipo: {item.measure_type}</p>
                  <p>Valor: {item.measure_value}</p>
                  <p>Data: {item.measure_datetime.substring(0, 7).replace("-", "/")}</p>
                  <p>Já alterada: {item.has_confirmed?"sim":"não"}</p>
                </div>
              </div>
            )}
            </div>
            <div className="w-11/12 h-1/6  flex justify-end items-end">
              <input type="button" className="border w-80 p-4 bg-green-500 text-white rounded-xl pl-4" value="Voltar" onClick={()=>{
                modalRef.current?.classList.remove("flex")
                modalRef.current?.classList.add("hidden")
                }}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
  
  export default ToList;
  