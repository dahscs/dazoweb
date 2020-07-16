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
	"competitive_programming_problems/problems.xml", true); // Replace 'my_data' with the path to your file
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

function showSolution(problem_id)
{
	var dir = "/competitive_programming_problems/solution_files";
	var fileextension = ".cpp";
	var el = document.getElementById(problem_id);
	el.textContent = "NO SOL HAHA";
}

function updateSolutionFiles()
{
	loadXML(function(response) {
		var xmlData = StringToXMLDom(response);
		var soltable = document.getElementById("SolutionTable");
		while(soltable.childNodes.length>0)
		{
			soltable.removeChild(soltable.childNodes[0]);
		}
		if (xmlData) {
			var tmp = xmlData.getElementsByTagName("Problem");
			
			for (var i = 0; i < tmp.length; i++) {
				var n = document.createElement("li");
				var x = document.createElement("a");
				n.id = tmp[i].textContent;
				n.textContent = tmp[i].textContent;
				x.textContent = "solution";
				x.setAttribute("onclick","showSolution("+tmp[i].textContent+")");
				n.appendChild(x);
				document.getElementById("SolutionTable").appendChild(n);
			}
		} 
	});
}