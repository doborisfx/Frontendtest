const args = process.argv;
var path = require('path'), fs=require('fs');
var ObjsearchResult = {FilesContainingOri:[],FileType:args[2],Srch:args[3]};
let startDir = ".\\"
var searchDirtxtOri = (ObjParm,startPath)=>{
	
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    var files=fs.readdirSync(startPath);
	
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
			//console.log("Sub Dir:"+filename);
            searchDirtxtOri(ObjParm,filename); //recurse
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

var searchRes = searchDirtxtOri(ObjsearchResult,startDir);
console.log(ObjsearchResult.FilesContainingOri);