
/*** Feature Flags ***/
const debugLevel = 1;  // 0 - none, 1 - functions, etc....
const ffTest = false;
const ffReload = true;

/*** utility functions ***/

// d() - debug. console log message if debugLevel greater than value specified
function d(level, message){
  if(debugLevel==0) return;

  if(debugLevel >= level) console.log(message); 
};   //  d();


// makeReloadButton() - creates a reload button to force a reload of the page bypassing the cache.
function makeReloadButton(){
  d(1, 'makeReloadButton();  // start');
  var oReload = document.createElement('a');
  oReload.style.position = 'absolute';
  oReload.style.top = '0em';
  oReload.style.right = '0.5em';
  oReload.className = "material-icons";
  oReload.text = 'refresh';
  oReload.href = location.href + '?' + Math.random();

  document.body.appendChild(oReload);
  d(1, 'makeReloadButton();  // end');
};   //  makeReloadButton();


/*** Application Functions ***/
function v(id){
  d(1, 'v();  // start');
  var e = document.getElementById(id);
  if(!e) {
    return null;
  } else {
    var v = e.value;
    if(!v) {
      return null;
    } else {
      d(1, id + ' = ' + (v*1.0));
      return (v * 1.0);
    }
  };
  d(1, 'v();  // end');
};  // v()

function set(id, text) {
  d(1, 'set();  // start');
  var e = document.getElementById(id);
  e.innerText = text;
  d(1, id + ' = ' + text);
  d(1, 'set();  // end');
};  // set();

function money(number) {
  d(1, 'money();  // start');
  return '$' + number.toFixed(2);
  d(1, 'money();  // end');
};  // money();

function calculate() {
  d(1, 'calculate();  // start');
  event.stopPropagation();
  var prod = v('prod_subtotal');
  //d(1, "prod = " + prod);
  
  var ship_rate = v('ship_rate')/100.0;
  var ship_total = (prod * ship_rate);
  set('ship_total', money(ship_total));

  var hand_fee = v('hand_fee');
  var hand_total = hand_fee;
  set('hand_total', money(hand_total));

  var subtotal = prod + ship_total + hand_total
  set('subtotal', money(subtotal));
  
  var tax_rate = v('tax_rate')/100.0;
  var tax_total = subtotal * tax_rate;
  set('tax_total', money(tax_total));
  
  var grand_total = subtotal + tax_total;
  set('grand_total', money(grand_total));

  var comm_rate = v('comm_rate')/100.0;
  var comm_total = comm_rate * prod;
  set('comm_total', money(comm_total));

  //alert('calculate');
  d(1, 'calculate();  // end');
};  // calculate();


function reset() {
  d(1, 'reset();  // start');

  d(1, 'reset();  // end');
};  // reset();




/******************** MAIN() ********************/
function main(){
  d(1, 'main();  // start');
  debugLevel>0 ? console.log('debugLevel ' + debugLevel) : {} ;
  ffTest ? alert('Test') : console.log('Test is false') ;
  ffReload ? makeReloadButton() : {} ;

  document.getElementById('calculate').addEventListener("click", calculate);
  document.getElementById('reset').addEventListener("click", reset);
  

  d(1, 'main();  // end');
};   //  main();

main();
