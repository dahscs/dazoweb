function updateSolutionFiles()
{
	var dir = "/competitive_programming_problems/solution_files";
	var fileextension = ".cpp";
	$.ajax({
		//This will retrieve the contents of the folder if the folder is configured as 'browsable'
		url: dir,
		success: function (data) {
			// List all cpp file names in the page
			$(data).find("a:contains(" + fileextension + ")").each(function () {
				var filename = this.href.replace(window.location.host, "").replace("http:///", "");
				console.log(filename);
				//$("body").append($("<img src=" + dir + filename + "></img>"));
			});
		}
	});
	document.getElementById("chicken").innerHTML = "Lmao";
}
