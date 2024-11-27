

function AddImg(props:{handleLayer:(layer:number)=>void}) {
    //const Container = "w-8/9 h-1/2 bg-white"
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"
    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <img src="" alt="" className="border w-80 h-80"/>
        <input type="file"    className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" />
        <input type="text"  placeholder="Seu nome"  className="border w-80 py-4 bg-slate-800 text-white rounded-xl pl-4" />
        <input type="date"    className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4" />
        <select name="" id="" className="border w-80 p-4 bg-slate-800 text-white rounded-xl pl-4">
          <option value="">Conta de Água</option>
          <option value="">Conta de Gás</option>
        </select>
        <input type="button" value="Enviar imagem"  className={Button} />
        <input type="button" value="Voltar"    className={Button} onClick={()=>{props.handleLayer(0)}}/>
      </div>
    );
  }
  
  export default AddImg;
  