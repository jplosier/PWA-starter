
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


function loadItem(key) {
  d(1, 'loadItem();  // start');
  localforage.getItem(key).then(function(result){
    document.getElementById(key).value = result;
  }, function(err){
    console.log('ERROR ' + err + ' in loadItem("' + key + '")');
  });

  d(1, 'loadItem();  // end');
};  // loadItem();


function loadData() {
  d(1, 'loadData();  // start');
  // ship_rate, hand_fee, tax_rate, comm_rate
  loadItem('ship_rate');
  loadItem('hand_fee');
  loadItem('tax_rate');
  loadItem('comm_rate');
  
  d(1, 'loadData();  // end');
};  // loadData()


function saveItem(key) {
  d(1, 'saveItem("' + key + '");  // start');
  
  localforage.setItem(key, document.getElementById(key).value).then(function () {
    return localforage.getItem(key);
  }).then(function (value) {
    // we got our value
  }).catch(function (err) {
    // we got an error
    d(1, 'ERROR: "' + err + '" in saveData();');
  });

  d(1, 'saveItem();  // end');
};  // saveItem()


function saveData() {
  d(1, 'saveData();  // start');
  // ship_rate, hand_fee, tax_rate, comm_rate
  saveItem('ship_rate');
  saveItem('hand_fee');
  saveItem('tax_rate');
  saveItem('comm_rate');
  d(1, 'saveData();  // end');
};  // saveData()



/*** Application Functions ***/
/******************** MAIN() ********************/
function main(){
  d(1, 'main();  // start');
  debugLevel>0 ? console.log('debugLevel ' + debugLevel) : {} ;
  ffTest ? alert('Test') : console.log('Test is false') ;
  ffReload ? makeReloadButton() : {} ;
  ffLoadData ? loadData() : {} ;


  d(1, 'main();  // end');
};   //  main();

main();
