var fs = require("fs");   //Importing file system module
var lineread,keys;
var line_one = 0;
var no_of_lines = 0;
var last_line = '';
var str1 = "SP.RUR.TOTL";
var str2 = "SP.URB.TOTL";
var outPut = [];
/*------------------ Reading the countries from the file ------------------ */
var Countries = fs.readFileSync("./WorldIndicators/asian.txt").toString();
Countries = Countries.split('\r\n');
//console.log(Conuntries);
/*------------------Reading the csv sheet --------------*/
var readstream = fs.createReadStream("./WorldIndicators/Indicators.csv");
var writestream = fs.createWriteStream("./WorldIndicators/output.json");
writestream.write("[\n");
readstream.on('data', function(chunk){
    var str = last_line + chunk;    // adding the last line from the previous chunk.
    line_one = line_one + 1;      //Extracting the keys from the File
    lineread = str.split('\n');
    last_line = lineread.pop();   //Removing the last line which may be incomplete and adding to chunk above
  if (line_one == 1) {
  keys = lineread[0];
  keys = keys.split(',');
  //  console.log(keys);
    }
  for (var i = 0; i < lineread.length; i++) {
no_of_lines = no_of_lines + 1;
  insertingIntoObj(lineread[i]);    //calling a function for creating objects.
    }
      //console.log(lineread[i]);
});
readstream.on('end', function(){
  //console.log(outPut);
  writestream.write("]")
  console.log(no_of_lines);
  console.log("File reading conmpleted\n");
});
writestream.on('end',function(){
  writestream.write("]\n");
  console.log("File Writing completed");
});
var prevCountryID ='';
var tempstr;
function insertingIntoObj(tempstr){
var data_Obj ={};
tempstr = tempstr.split(',');
 for (var i = 0; i < tempstr.length; i++) {
data_Obj[keys[i]] = tempstr[i];
//console.log(data_Obj);
  }
    if ((Countries.indexOf(data_Obj[keys[0]]) >= 0) &&
            ((data_Obj[keys[3]]).includes(str1)) == true || ((data_Obj[keys[3]]).includes(str2) == true)) {
  writestream.write(JSON.stringify(data_Obj)+',\n');
    }
}
