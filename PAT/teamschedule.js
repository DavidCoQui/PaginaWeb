function getSchedule(){
    var seasons= document.getElementsByName("temporadas")[0];
  var year=seasons.options[seasons.selectedIndex].value;
  var weeks= document.getElementsByName("semanas")[0];
  var week=weeks.options[weeks.selectedIndex].value;
  var url = 'https://powerful-gorge-32436.herokuapp.com/https://api.sportradar.us/nfl/official/trial/v6/en/games/'+year+'/REG/'+week+'/schedule.json?api_key=66a5rr227gqmvbmsquhxmsy6';
  
  fetch(url, {
    method: 'GET',
    headers: {
    'X-Originating-IP': '176.85.245.192'},
    }
  )
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>setSchedule(response.week.games));}
  function setSchedule(games){
      var html='';
      games.forEach(game => {
       var fecha= game.scheduled.substring(0,game.scheduled.indexOf('T')).split('-');
          var linea= '<div class="card d-inline-block" style="width: 30%;margin-left: 1%; margin-bottom: 1%;">'+
          '<div class="card-header">'+ fecha[2]+'-'+fecha[1]+'-'+fecha[0]+" "+game.venue.name+", "+ game.venue.city+'</div><div class="card-body"><div class="local">'
          +'<p class="d-inline-block card-text"><strong>'+ game.home.name+'</strong></p>'
          +'<p class="d-inline-block float-right">'+game.scoring.home_points+'</p></div>'
          +'<div class="visitante"><p class="d-inline-block card-text"><strong>'+ game.away.name+'</strong></p>'
          +'<p class="d-inline-block float-right">'+game.scoring.away_points+'</p></div></div></div>';
          html=html+linea;
          
      });
      document.getElementById("games").innerHTML=html;

  }
  