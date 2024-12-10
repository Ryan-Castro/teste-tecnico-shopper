import { useRef } from "react";


function User(props:{handleLayer:(layer:number)=>void}) {
    const InputName = useRef<HTMLInputElement>(null)
    const spanSusses = useRef<HTMLSpanElement>(null)
    const spanError = useRef<HTMLSpanElement>(null)
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"

    async function createAacount(){
      const name = InputName.current!.value
      if(name === ""){
        spanError.current!.innerHTML = "Coloque o nome da conta";
        spanError.current!.classList.remove("hidden");
        setInterval(()=>{
          spanError.current!.classList.add("hidden");
        }, 10000)
        return
      }
      await fetch("http://localhost:8090/createaacont", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customer_code: name})
      }).then(res=>res.json()).then(json=>{
        spanSusses.current!.innerHTML = "Conta criada com sucesso";
        spanError.current!.classList.add("hidden");
        spanSusses.current!.classList.remove("hidden");
        setInterval(()=>{
          spanSusses.current!.classList.add("hidden");
        }, 10000)
      })
    }

    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <input type="text"   placeholder="Nome" className="border w-80 py-4 bg-slate-800 text-white rounded-xl pl-4" ref={InputName}/>
        <input type="button" value="Criar conta"  className={Button} onClick={()=>{createAacount()}}/>
        <input type="button" value="Voltar"    className={Button} onClick={()=>{props.handleLayer(0)}}/>
        <span ref={spanSusses} className="border hidden w-80 py-4 bg-green-600 text-white rounded-xl pl-4"></span>
        <span ref={spanError} className="border hidden w-80 py-4 bg-red-600 text-white rounded-xl pl-4"></span>
      </div>
    );
  }
  
  export default User;
  