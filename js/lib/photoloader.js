var server;

let init = function(server_url){
	server = server_url;
}

let show_error = function(){
	console.log('ERREUR Loader !')
}

let load = function(uri){
	return axios.get(server + uri).catch(show_error);
}

export default {
    init : init,
	load : load
}
