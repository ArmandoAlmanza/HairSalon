document.addEventListener("DOMContentLoaded",()=>{App()});const App=()=>{showServices()};async function showServices(){try{const o=await fetch("./servicios.json"),c=await o.json(),{servicios:e}=c;e.forEach(o=>{const{id:c,name:e,price:s}=o})}catch(o){console.log(o)}}
//# sourceMappingURL=index.js.map
