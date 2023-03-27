'strict';

function showLet() {
  aLet = 'a-let';
  console.log('let: ', aLet);
  let aLet;
}
showLet();

function showConst() {
  console.log('const: ', aConst);
  const aConst = 'a-const';
}
showConst();

// 如果声明一个变量时，没有使用修饰符，则会被默认当做var声明的，并且被提升挂载到window上（如下图1），可全局访问。
function showUndefineVar() {
  aVar = 'a-var';
  console.log('var: ', aVar);
  debugger;
}
showUndefineVar();

function showVar() {
  aVar = 'a-var';
  debugger;
  console.log('var: ', aVar);
  var aVar;
}
showVar();

show