var allTeams = function(){
	var str = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
	 	str+= 'LEFT JOIN formation ON formation.id = team.formations_id ORDER BY created_at DESC';
	return str;
}

var newTeams = function(){
	var str = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
		str+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
		str+= 'ORDER BY created_at DESC LIMIT 0,10';
	return str;
}

var hotTeams = function(){
	var str = 'SELECT team.id, team.name, formation.name AS formation FROM team ';
		str+= 'LEFT JOIN formation ON formation.id = team.formations_id ';
		str+= 'ORDER BY created_at DESC LIMIT 0,10';
	return str;
}

var teamById = function(index){
	var str = 'SELECT team.id, team.name, team.created_at,';
		str+= 'user.name AS user_name, user.id AS user_id, ';
		str+= 'formation.name AS formatie_name, ';
		str+= 'player.name AS player_name, ';
		str+= 'club.name AS club_name, ';
		str+= 'preffered_role.name AS preffered_role_name ';
		str+= 'FROM team ';
		str+= 'LEFT JOIN user ';
		str+= 'ON team.user_id = user.id ';
		str+= 'LEFT JOIN formation ';
		str+= 'ON team.formations_id = formation.id ';
		str+= 'LEFT JOIN team_has_player ';
		str+= 'ON team.id = team_has_player.team_id ';
		str+= 'LEFT JOIN player ';
		str+= 'ON team_has_player.player_id = player.id ';
		str+= 'LEFT JOIN club ';
		str+= 'ON player.club_id = club.id ';
		str+= 'LEFT JOIN preffered_role ';
		str+= 'ON player.preffered_role_id = preffered_role.id ';
		str+= 'WHERE team.id = ' + index;
	return str;
}

var getQuery = {
	test: 'dfaadfs',
	allTeams: allTeams(),
	newTeams: newTeams(),
	hotTeams: hotTeams(),
	teamById: function(index){
		return teamById(index);
	}
};

module.exports = getQuery;