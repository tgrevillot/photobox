var server;

let init = function(server_url){
	server = server_url;
}

let show_error = function(error, uri = "unknow"){
	console.log('ERREUR Loader : ' + error + ": " + uri)
}

let load = function(uri){
	let url;
	
	if(uri != undefined){
		if(uri.substr(0,8) == "https://"){
			url = uri;
		} else {
			url = server + uri;
		}
	}
	
	axios.defaults.withCredentials = true;
	return axios.get(url).catch(show_error, uri);
}

export default {
    init : init,
	load : load
}
