const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./modules', true, /\.js$/);
let modules = {};
requireAll(req).map((md)=>{
  let key = Object.keys(md)[0];
  if(key){
    modules[key] = md[Object.keys(md)[0]]['zh'];
  }
})

export default {
  message: {
    ...modules
  }
}
