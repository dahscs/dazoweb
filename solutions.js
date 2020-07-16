//Code found on codeproject by Matias Lopez, thanks bro
function loadXML(file,callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/xml");
	xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT 
				// return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText);
			} 
		};
	xobj.open("GET", file, true); // Replace 'my_data' with the path to your file
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
	var dir = "competitiveprogrammingproblems/solutiondescriptions/";
	var fileextension = ".cpp";
	var el = document.getElementById(problem_id);
	var p = document.createElement("p");
	loadXML(dir+problem_id+".txt",function(text){
		p.textContent = text;
	});
	el.appendChild(p);
	dir = "competitiveprogrammingproblems/solutionfiles/";
	var iframe = document.createElement("iframe");
	var pre = document.createElement("pre");
	var em = document.createElement("code");
	pre.setAttribute("class","prettyprint");
	pre.setAttribute("style","background-color: #ffffff");
	loadXML(dir+problem_id+fileextension,function(data) {
		em.textContent = data;
	});
	pre.appendChild(em);
	el.appendChild(pre);
	for(var i=0;i<el.children.length;i++)
	{
		if(el.children[i].tagName === "A")
		{
			el.children[i].setAttribute("onclick","hideSolution('"+problem_id+"')");
			el.children[i].textContent = " hide solution";
		}
	}
}
function hideSolution(problem_id)
{
	deleteChildren(problem_id);
	var el = document.getElementById(problem_id);
	el.textContent = problem_id;
	var x = document.createElement("a");
	x.textContent = " show solution";
	x.setAttribute("onclick","showSolution('"+problem_id+"')");
	el.appendChild(x);
}
function deleteChildren(el_id)
{
	var del = document.getElementById(el_id);
	while(del.childNodes.length>0)
	{
		del.removeChild(del.childNodes[0]);
	}
}

function updateSolutionFiles()
{
	loadXML("competitiveprogrammingproblems/problems.xml",function(response) {
		var xmlData = StringToXMLDom(response);
		deleteChildren("SolutionTable");
		if (xmlData) {
			var tmp = xmlData.getElementsByTagName("Problem");
			
			for (var i = 0; i < tmp.length; i++) {
				var n = document.createElement("li");
				var x = document.createElement("a");
				n.id = tmp[i].textContent;
				n.textContent = tmp[i].textContent;
				x.textContent = " show solution";
				x.setAttribute("onclick","showSolution('"+tmp[i].textContent+"')");
				n.appendChild(x);
				document.getElementById("SolutionTable").appendChild(n);
			}
		} 
	});
}
updateSolutionFiles();