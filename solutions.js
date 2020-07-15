//Code found on codeproject by Matias Lopez, thanks bro
function loadXML(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/xml");
	xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT 
				// return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText);
			} 
		};
	xobj.open("GET", 
	"dazoweb/competitive_programming_problems/problems.xml", true); // Replace 'my_data' with the path to your file
	xobj.setRequestHeader("Access-Control-Allow-Origin","*");
	xobj.send(null);  
};

function StringToXMLDom(sXML) {
	var xmlDoc=null;
	
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(sXML,"text/xml");
	} else { // Internet Explorer
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(sXML);
	}
	
	return xmlDoc;
}
//Code found on codeproject by Matias Lopez, thanks bro

function updateSolutionFiles()
{
	var dir = "/competitive_programming_problems/solution_files";
	var fileextension = ".cpp";
	loadXML(function(response) {
		var tbData = "";
		var xmlData = StringToXMLDom(response);
		
		if (xmlData) {
			var tmp = xmlData.getElementsByTagName("book");
			
			for (var i = 0; i < tmp.length; i++) {
				console.log(tmp[i].textContent)
			}
		} 
	});
	document.getElementById("chicken").innerHTML = "Lmao";
}
