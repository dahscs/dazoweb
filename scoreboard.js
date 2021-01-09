//Taken from stack overflow 
function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
//Taken from stack overflow https://stackoverflow.com/questions/247483/http-get-request-in-javascript
function httpGetAsync(url, callback)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}
function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
//Taken from stackoverflow https://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
getNextKey = function(key) {
  if (key === 'Z' || key === 'z') {
    return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
  } else {
    var lastChar = key.slice(-1);
    var sub = key.slice(0, -1);
    if (lastChar === 'Z' || lastChar === 'z') {
      // If a string of length > 1 ends in Z/z,
      // increment the string (excluding the last Z/z) recursively,
      // and append A/a (depending on casing) to it
      return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
    } else {
      // (take till last char) append with (increment last char)
      return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
    }
  }
  return key;
};
//Code I actually wrote myself
var contest_id = getQuerystring('contest_id','nil');
console.log(contest_id);
var contest_data_json;
if(contest_id!='nil'){
	httpGetAsync('https://vjudge.net/contest/rank/single/'+contest_id,(response) => {
	
		contest_data_json = JSON.parse(response);
		console.log("Response Received: %o",contest_data_json);
		
		//Grabbing Problem Set data and finishing initialization of the Table Header
		let header_row = document.getElementById("contest-rank-table-header-row");
		
		let raw_page_source = httpGet("https://vjudge.net/contest/"+contest_id);
		let doc = new DOMParser().parseFromString(raw_page_source,'text/html');
		let problem_rows = doc.getElementById("contest-problems").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
		var problem_set_size = problem_rows.length;
		
		let problem_letter = "A";
		for(let i=0;i<problem_set_size;i++){
			header_row.innerHTML += "<th rowspan=\"2\"><div>Problem "+problem_letter+"</div></th>";
			problem_letter = getNextKey(problem_letter);
		}
		
		//Extracting a map of the teams
		let meta_location = raw_page_source.indexOf("dazometastart\\n");// 15
		let meta_end_location = raw_page_source.indexOf("dazometaend\\n");// 13
		let team_names = new Set();
		var user_team_map = new Map();
		var teamed_participant_list = new Array();
		if(meta_location != -1) {
			meta_location+=15;
			while(meta_location < meta_end_location)
			{
				let end_ptr = raw_page_source.indexOf("\\n",meta_location)+2;
				let colon_ptr = raw_page_source.indexOf(":",meta_location);
				let team_name = raw_page_source.substring(meta_location,colon_ptr);
				let team_usernames = raw_page_source.substring(colon_ptr+1,end_ptr-2).trim().split(" ");
				for(let i=0;i<team_usernames.length;i++)
				{
					user_team_map[team_usernames[i].toLowerCase()] = team_name;
					console.log("%s is on team %s",team_usernames[i],team_name);
				}
				if(!team_names.has(team_name)){
					teamed_participant_list.push(team_name);
					team_names.add(team_name);
				}
				meta_location = end_ptr;
			}
		}
		else {
			console.log("No dazo metadata found");
		}
		
		//Map ids to usernames
		let user_id_map = new Map();
		for(let key in contest_data_json.participants){
			let arr = contest_data_json.participants[key];
			user_id_map[key] = arr[0];
		}
		//Initialize Array
		let team_data = new Map();
		team_names.forEach(function(key){
			team_data[key] = {solves: 0, penalty: 0, submission_penalty: new Array(problem_set_size), solved_problem: new Array(problem_set_size)};
			for(let i=0;i<problem_set_size;i++){
				team_data[key].submission_penalty[i] = 0;
				team_data[key].solved_problem[i] = 0;
			}
		});
		//Sorting Participants
		for(let i = 0; i < contest_data_json.submissions.length; i++){
			let submission = contest_data_json.submissions[i];
			let user_id = submission[0];
			let prob = submission[1];
			let verdict = submission[2];
			let time = submission[3];
			let team_key = user_team_map[user_id_map[user_id].toLowerCase()];
			if(team_key!=null&&!team_data[team_key].solved_problem[prob]){
				//console.log("Team: %s submitted",team_key);
				team_data[team_key].solves += verdict;
				if(verdict){
					let wrong_penalty = team_data[team_key].submission_penalty[prob];
					team_data[team_key].penalty += time + (wrong_penalty!=null?wrong_penalty:0);
					team_data[team_key].solved_problem[prob] = 1;
				}
				else{
					team_data[team_key].submission_penalty[prob] += 20*60;			
				}
				console.log("Team: %s solves: %d penalty: %d",team_key,team_data[team_key].solves,team_data[team_key].penalty);
			}
		}
		console.log(teamed_participant_list);
		teamed_participant_list.sort(function(a,b){
			if(team_data[a].solves == team_data[b].solves){
				if(team_data[a].penalty == team_data[b].penalty) return 0;
				return team_data[a].penalty>team_data[b].penalty?1:-1;
			}
			return team_data[a].solves<team_data[b].solves?1:-1;
		});
		console.log("(Hopefully) Sorted list: %o",teamed_participant_list);
		
		//Creating the table
		let table_body = document.getElementById("contest-rank-table-body");
		for(let i=0;i<teamed_participant_list.length;i++){
			let html_text = "<tr><td>"+(i+1)+"</td><td>"+
				teamed_participant_list[i]+"</td><td>"+
				team_data[teamed_participant_list[i]].solves+"</td><td>"+
				Math.trunc(team_data[teamed_participant_list[i]].penalty/60)+"</td>";
			for(let j=0;j<problem_set_size;j++)
				html_text+="<td>"+team_data[teamed_participant_list[i]].solved_problem[j]+"</td>";
			html_text+="</tr>";
			table_body.innerHTML+=html_text;
		}
	});
}
else{
	alert("No Contest Provided");
}
