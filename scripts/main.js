
/*** Feature Flags ***/
const debugLevel = 1;  // 0 - none, 1 - functions, etc....
const ffTest = false;    // Just testing feature flags
const ffReload = false;  // Adds a reload icon to the upper-right corner of the page
const ffLoadData = true;  // Loads settings and data from local storage

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


function restoreInputValue(key) {
  d(1, 'restoreInputValue();  // start');
  localforage.getItem(key).then(function(result){
    document.getElementById(key).value = result;
  }, function(err){
    console.log('ERROR ' + err + ' in restoreInputValue("' + key + '")');
  });

  d(1, 'restoreInputValue();  // end');
};  // restoreInputValue();


function loadData() {
  d(1, 'loadData();  // start');
  // ship_rate, hand_fee, tax_rate, comm_rate
  restoreInputValue('ship_rate');
  restoreInputValue('hand_fee');
  restoreInputValue('tax_rate');
  restoreInputValue('comm_rate');
  
  d(1, 'loadData();  // end');
};  // loadData()


function saveInputValue(key) {
  d(1, 'saveInputValue("' + key + '");  // start');
  
  localforage.setItem(key, get_value(key)).then(function () {
    return localforage.getItem(key);
  }).then(function (value) {
    // we got our value
  }).catch(function (err) {
    // we got an error
    d(1, 'ERROR: "' + err + '" in saveInputValue();');
  });

  d(1, 'saveInputValue();  // end');
};  // saveInputValue()


function saveData() {
  d(1, 'saveData();  // start');
  // ship_rate, hand_fee, tax_rate, comm_rate
  saveInputValue('ship_rate');
  saveInputValue('hand_fee');
  saveInputValue('tax_rate');
  saveInputValue('comm_rate');
  d(1, 'saveData();  // end');
};  // saveData()



/*** Application Functions ***/


function get_value(id){
  d(1, 'get_value();  // start');
  var e = document.getElementById(id);
  if(!e) {
    return null;
  } else {
    var v = e.value;
    if(!v) {
      return null;
    } else {
      if(v==='on') {
        e.checked ? v = 1 : v = 0;
      }
      d(1, id + ' = ' + v);
      return (v * 1.0);
    }
  };
  d(1, 'get_value();  // end');
};  // get_value()


function set(id, text) {
  d(1, 'set();  // start');
  var e = document.getElementById(id);
  e.innerText = text;
  d(1, id + ' = ' + text);
  d(1, 'set();  // end');
};  // set();


function money(number) {
  d(1, 'money();  // start');
  if (!number) number = 0;
  return '$' + number.toFixed(2);
  d(1, 'money();  // end');
};  // money();

function calculate() {
  d(1, 'calculate();  // start');
  event.stopPropagation();
  var prod = get_value('prod_subtotal');
  //d(1, "prod = " + prod);
  
  var ship_rate = get_value('ship_rate')/100.0;
  var ship_total = (prod * ship_rate);
  set('ship_total', money(ship_total));

  var hand_fee = get_value('hand_fee');
  var hand_total = hand_fee;
  set('hand_total', money(hand_total));

  var subtotal = prod + ship_total + hand_total
  set('subtotal', money(subtotal));

  var tax_shipping = get_value('tax_shipping');
  
  var tax_rate = get_value('tax_rate')/100.0;
  var tax_total = subtotal * tax_rate;
  if(tax_shipping == 0) {
    tax_total = (prod + hand_total) * tax_rate;
  }
  set('tax_total', money(tax_total));
  
  var grand_total = subtotal + tax_total;
  set('grand_total', money(grand_total));

  var comm_rate = get_value('comm_rate')/100.0;
  var comm_total = comm_rate * prod;
  set('comm_total', money(comm_total));

  //alert('calculate');
  if (ffLoadData) saveData();
  d(1, 'calculate();  // end');
};  // calculate();


function reset() {
  d(1, 'reset();  // start');
  document.getElementById('prod_subtotal').value = '0';
  calculate();
  d(1, 'reset();  // end');
};  // reset();




/******************** MAIN() ********************/
function main(){
  d(1, 'main();  // start');
  debugLevel>0 ? console.log('debugLevel ' + debugLevel) : {} ;
  ffTest ? alert('Test') : console.log('Test is false') ;
  ffReload ? makeReloadButton() : {} ;
  ffLoadData ? loadData() : {} ;

  document.getElementById('calculate').addEventListener("click", calculate);
  document.getElementById('reset').addEventListener("click", reset);
  

  d(1, 'main();  // end');
};   //  main();

main();
