var server;

let init = function(server_url){
	server = server_url;
}

let show_error = function(error, uri = "unknow"){
	console.log('ERREUR Loader : ' + error + ": " + uri)
}

let load = function(uri){
	return axios.get(server + uri).catch(show_error, uri);
}

export default {
    init : init,
	load : load
}
