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
	{
		var e = el.getElementsByTagName("SELECT")[0];
		if(e!=null)
		{
			fileextension = "."+e.options[e.selectedIndex].text;
		}
	}
	var p = document.createElement("p");
	loadXML(dir+problem_id+".txt",function(text){
		p.textContent = text;
	});
	el.appendChild(p);
	dir = "competitiveprogrammingproblems/solutionfiles/";
	var pre = document.createElement("pre");
	var code = document.createElement("code");
	//code.setAttribute("class","hlj");
	//pre.setAttribute("style","background-color: #ffffff");
	pre.appendChild(code);
	el.appendChild(pre);
	var href = el.getElementsByTagName("a")[0];
	href.setAttribute("onclick","hideSolution('"+problem_id+"')");
	href.textContent = " hide solution";
	loadXML(dir+problem_id+fileextension,function(data) {
		code.textContent = data;
		hljs.highlightBlock(code);
	});
}
function hideSolution(problem_id)
{
	var el = document.getElementById(problem_id);
	var desc = el.getElementsByTagName("p")[0];
	var code = el.getElementsByTagName("pre")[0];
	el.removeChild(desc);
	el.removeChild(code);
	var href = el.getElementsByTagName("a")[0];
	href.setAttribute("onclick","showSolution('"+problem_id+"')");
	href.textContent = " show solution";
}
function deleteChildren(el_id)
{
	var del = document.getElementById(el_id);
	while(del.childNodes.length>0)
	{
		del.removeChild(del.childNodes[0]);
	}
}

function addChildren(problem_id)
{
	var el = document.getElementById(problem_id);
	el.textContent = problem_id;
	var show_href = document.createElement("a");
	show_href.textContent = " show solution";
	show_href.setAttribute("onclick","showSolution('"+problem_id+"')");
	el.appendChild(show_href);
	var langs = el.getAttribute("lang").split(" ");
	if(langs.length>1)
	{
		var suffixes = document.createElement("select");
		for(var i = 0;i < langs.length;i++)
		{
			var suffix = document.createElement("option");
			suffix.textContent = langs[i];
			suffix.setAttribute("value",langs[i]);
			suffixes.appendChild(suffix);
		}
		suffixes.onchange = function(){
			hideSolution(problem_id);
		};
		el.appendChild(suffixes);
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
				n.id = tmp[i].textContent;
				n.setAttribute("lang",tmp[i].getAttribute("lang"));
				document.getElementById("SolutionTable").appendChild(n);
				addChildren(n.id);
			}
		} 
	});
}
updateSolutionFiles();
