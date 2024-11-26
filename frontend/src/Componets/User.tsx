

function User(props:{handleLayer:(layer:number)=>void}) {
    //const Container = "w-8/9 h-1/2 bg-white"
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"
    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3 hidden">
        <input type="text"   value=""placeholder="Nome"className="border w-80 py-4 bg-slate-800 text-white rounded-xl pl-4" />
        <input type="button" value="Criar conta"  className={Button} />
        <input type="button" value="Voltar"    className={Button} onClick={()=>{props.handleLayer(0)}}/>
      </div>
    );
  }
  
  export default User;
  