var selectTeams = function(){
	var str = 'SELECT team.id, team.name, formation.name AS formation, count(comment.team_id) AS total_comments FROM team ';
	 	str+= 'LEFT JOIN formation ON team.formations_id = formation.id ';
	 	str+= 'LEFT JOIN comment ON team.id = comment.team_id ';
	 	str+= 'GROUP BY team.id ';
	return str;
}

var selectAllTeams = function(limit){
	var str = selectTeams();
		str+= 'ORDER BY team.created_at'
	return str;
}

var selectNewTeams = function(limit){
	limit = ( limit ) ? limit :  5;
	var str = selectTeams();
	 	str+= 'ORDER BY team.created_at DESC LIMIT 0,' + limit;
	return str;
}

var selectHotTeams = function(limit){
	limit = ( limit ) ? limit :  5;
	var str = selectTeams();
	 	str+= 'ORDER BY total_comments DESC LIMIT 0,' + limit;
	return str;
}

var selectTeamById = function(index){
	var str = 'SELECT team.id, team.name, team.created_at,';
		str+= 'user.name AS creator_name, user.id AS creator_id, ';
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
		str+= 'WHERE team.id = ' + index + ' ORDER BY team_has_player.position';
	return str;
}

var selectComments = function(index){
	var str = 'SELECT comment.*, user.name FROM comment ';
		str+= 'LEFT JOIN user ON comment.user_id = user.id ';
		str+= 'WHERE team_id = ' + index + ' ORDER BY comment.created_at';
	return str;
}

var selectCommentsFromUser = function(user, limit){
	var str = 'SELECT comment.*, team.name FROM comment  ';
		str+= 'LEFT JOIN team ON comment.team_id = team.id ';
		str+= 'WHERE comment.user_id = ' + user + ' ORDER BY comment.created_at DESC LIMIT 0,' + limit;
	return str;
}

var selectCommentsForUser = function(user, limit){
	var str = 'SELECT comment.*, team.name FROM comment  ';
		str+= 'LEFT JOIN team ON comment.team_id = team.id ';
		str+= 'WHERE team.user_id = ' + user + ' AND comment.user_id != ' + user + ' ORDER BY comment.created_at DESC LIMIT 0,' + limit;
	return str;
}

var selectUser = function(username, password){
	var str = 'SELECT id, name FROM user WHERE name = "' + username + '" AND password = "' + password + '"';
	return str;
}

var selectUserTeams = function(user){
	var str = 'SELECT team.id, team.name, user.id AS user_id, user.name AS user_name, formation.name AS formation FROM team ';
		str+= 'LEFT JOIN user ON team.user_id = user.id  ';
		str+= 'LEFT JOIN formation ON team.formations_id = formation.id ';
		str+= 'WHERE user_id = "' + user  + '" ORDER BY created_at DESC';
	return str;
}

var insertComment = function(index, user, text){
	var str = 'INSERT INTO comment (team_id, user_id, text) ';
		str+= 'VALUES ("' + index + '", "' + user + '", "' + text + '")';
	return str;
}

var insertTeam = function(titel, user, formatie){
	var str = 'INSERT INTO team (name, user_id, formations_id) ';
		str+= 'VALUES ("' + titel + '",' + user + ',' + formatie + ');';
	return str;
}

var lastInsertedId = function(from){
	var str = 'SELECT MAX(id) AS id FROM ' + from;
	return str;
}

var insertPlayersInTeam = function(team, body){
	var str = 'INSERT INTO team_has_player (team_id, player_id, position) ';
		str+= 'VALUES ';
		str+= '(' + team + ',' + body.p1 + ',' + 0 + '), ';
		str+= '(' + team + ',' + body.p2 + ',' + 1 + '), ';
		str+= '(' + team + ',' + body.p3 + ',' + 2 + '), ';
		str+= '(' + team + ',' + body.p4 + ',' + 3 + '), ';
		str+= '(' + team + ',' + body.p5 + ',' + 4 + '), ';
		str+= '(' + team + ',' + body.p6 + ',' + 5 + '), ';
		str+= '(' + team + ',' + body.p7 + ',' + 6 + '), ';
		str+= '(' + team + ',' + body.p8 + ',' + 7 + '), ';
		str+= '(' + team + ',' + body.p9 + ',' + 8 + '), ';
		str+= '(' + team + ',' + body.p10 + ',' + 9 + '), ';
		str+= '(' + team + ',' + body.p11 + ',' + 10 + ');';
	return str;
}

var getQuery = {
	test: 'dfaadfs',
	selectAllTeams: function(limit){
		return selectAllTeams(limit);
	},
	selectNewTeams: function(limit){
		return selectNewTeams(limit);
	},
	selectHotTeams: function(limit){
		return selectHotTeams(limit);
	},
	selectUser: function(username, password){
		return selectUser(username, password);
	},
	selectUserTeams: function(user){
		return selectUserTeams(user);
	},
	selectTeamById: function(index){
		return selectTeamById(index);
	},
	selectComments: function(index){
		return selectComments(index);
	},
	selectCommentsForUser: function(user, limit){
		return selectCommentsForUser(user, limit);
	},
	selectCommentsFromUser: function(user, limit){
		return selectCommentsFromUser(user, limit);
	},
	insertComment: function(index, user, text){
		return insertComment(index, user, text);
	},
	insertTeam: function(titel, user, formatie){
		return insertTeam(titel, user, formatie);
	},
	lastInsertedId: function(from){
		return lastInsertedId(from);
	},
	insertPlayersInTeam: function(team, body){
		return insertPlayersInTeam(team, body);
	},
};

module.exports = getQuery;