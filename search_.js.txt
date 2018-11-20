const args = process.argv;
var path = require('path'), fs=require('fs');
var ObjsearchResult = {startPath:"C:\\MyFolder",FilesContainingOri:[],FileType:args[2],Srch:args[3]};

var searchDirtxtOri = function (ObjParm){
	
    if (!fs.existsSync(ObjParm.startPath)){
        console.log("no dir ",ObjParm.startPath);
        return;
    }
    var files=fs.readdirSync(ObjParm.startPath);
	
    for(var i=0;i<files.length;i++){
        var filename=path.join(ObjParm.startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            searchDirtxtOri(ObjParm); //recurse
        }
        else if (path.extname(files[i]) ===  ObjParm.FileType) {
            var text = fs.readFileSync(filename).toString('utf-8');
			if (text.indexOf(ObjParm.Srch) >0){
			// add to the name to the returned array of files
			ObjParm.FilesContainingOri.push(filename);
			}
		}
    };
};

var searchRes = searchDirtxtOri(ObjsearchResult);
console.log(ObjsearchResult.FilesContainingOri);