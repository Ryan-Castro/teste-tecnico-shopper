import { useRef, useState } from "react";
import Menu from "./Componets/Menu";
import User from "./Componets/User";
import AddImg from "./Componets/AddImg";
import Fixed from "./Componets/Fixed";
import ToList from "./Componets/ToList";

function App() {
  //const Container = "w-8/9 h-1/2 bg-white"
  const container = useRef<HTMLDivElement>(null)
  const [showLayers, showLayersSet] = useState(0)

  function handleLayer(layer:number){
    container.current?.children[layer].classList.add("flex")
    container.current?.children[layer].classList.remove("hidden")
    container.current?.children[showLayers].classList.remove("flex")
    container.current?.children[showLayers].classList.add("hidden")
    showLayersSet(layer)
  }
  return (
    <div className="bg-img w-screen h-screen bg-slate-500 flex justify-center items-center md:justify-end" ref={container}>
      <Menu handleLayer={handleLayer}/>
      <User handleLayer={handleLayer}/>
      <AddImg handleLayer={handleLayer}/>
      <Fixed handleLayer={handleLayer}/>
      <ToList handleLayer={handleLayer}/>
    </div>
  );
}

export default App;
