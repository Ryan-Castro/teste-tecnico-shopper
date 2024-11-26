

function Menu(props:{handleLayer:(layer:number)=>void}) {
    //const Container = "w-8/9 h-1/2 bg-white"
    const Button = "border w-80 py-4 bg-slate-800 text-white rounded-xl"
    return (
      <div className="w-11/12 h-5/6 bg-white rounded-2xl flex justify-center items-center flex-col gap-2 md:w-96 md:h-screen lg:w-1/3">
        <input type="button" value="Criar Conta"      className={Button}  onClick={()=>{props.handleLayer(1)}}/>
        <input type="button" value="Enviar imagem"    className={Button}  onClick={()=>{props.handleLayer(2)}}/>
        <input type="button" value="Confirmar Conta"  className={Button}  onClick={()=>{props.handleLayer(3)}}/>
        <input type="button" value="Mostrar Lista"    className={Button}  onClick={()=>{props.handleLayer(4)}}/>
      </div>
    );
  }
  
  export default Menu;
  