var fs = require("fs");
var UglifyJS = require("uglify-js");

console.log("开始处理文件...");

minify("../recorder.mp3.min.js",["recorder-core.js","engine/mp3.js","engine/mp3-engine.js"]);
minify("../recorder.wav.min.js",["recorder-core.js","engine/wav.js"]);

minify("../dist/recorder-core.js",["recorder-core.js","engine/wav.js"]);
minify("../dist/engine/mp3.js",["engine/mp3.js","engine/mp3-engine.js"]);
minify("../dist/engine/wav.js",["engine/wav.js"]);

minify("../dist/engine/bate-ogg.js",["engine/bate-ogg.js","engine/bate-ogg-engine.js"]);
minify("../dist/engine/bate-webm.js",["engine/bate-webm.js"]);

console.log("处理完成");


function minify(output,srcs){
	console.log("正在生成"+output);
	var codes=[];
	for(var i=0;i<srcs.length;i++){
		codes.push(fs.readFileSync(srcs[i],"utf-8"));
	};
	var code=codes.join("\n");
	
	var res=UglifyJS.minify(code);
	if(res.error){
		throw new Error(res.error);
	};
	
	code=
`/*
录音
https://github.com/xiangyuecn/Recorder
src: ${srcs.join(",")}
*/
`;
	code+=res.code;
	fs.writeFileSync(output,code);
};