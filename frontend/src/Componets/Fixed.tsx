import { useRef } from "react"


function Fixed(props:{handleLayer:(layer:number)=>void}) {
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"
    const InputIDRef = useRef<HTMLInputElement>(null)
    const InputConfirmRef = useRef<HTMLInputElement>(null)

    async function createAacount(){
      const measure_uuid = InputIDRef.current!.value
      const confirmed_value = InputConfirmRef.current!.value
      if(measure_uuid === "" && confirmed_value === ""){
        //error
        return
      }
      const number = Number.parseInt(confirmed_value)
      console.log({
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          measure_uuid,
          confirmed_value: number
         })})
      await fetch("http://localhost:8090/confirm", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          measure_uuid,
          confirmed_value: number
         })
      }).then(res=>res.json()).then(json=>{
        console.log(json)
      })
    }
    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <input type="text" ref={InputIDRef}  placeholder="ID da Medição"  className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" />
        <input type="Number" ref={InputConfirmRef}  placeholder="Numero correto"  className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" />
        <input type="button" value="Enviar Correção"  className={Button} onClick={createAacount}/>
        <input type="button" value="Voltar"    className={Button} onClick={()=>{props.handleLayer(0)}}/>
      </div>
    );
  }
  
  export default Fixed;
  