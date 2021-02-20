function getStandings(){
  var seasons= document.getElementsByName("temporadas")[0];
  var year=seasons.options[seasons.selectedIndex].value;
  console.log(year);
var url = 'https://cors-anywhere.herokuapp.com/https://api.sportradar.us/nfl/official/trial/v6/en/seasons/'+year+'/standings.json?api_key=66a5rr227gqmvbmsquhxmsy6';

fetch(url, {
  method: 'GET',
  headers: {
  'X-Originating-IP': '176.85.245.192'},
  }
)
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response =>setStandings(response.conferences));}

function setStandings(conferences){
  var lineas=[];
  conferences.forEach(conference => {
    conference.divisions.forEach(divisions=>{
      divisions.teams.forEach(team=>{
        
        let linea= '<tr><th scope="row">'+team.market+' '+team.name+'</th><td>'
        +team.wins+'</td><td>'+team.losses+'</td><td>'+team.ties+'</td></tr>';
        lineas.push({wins : team.losses,code: linea});
      }
        )
    }
      )
  });
  lineas.sort(function(a,b){
   return a.wins-b.wins;
  });
  var html='';
 lineas.forEach(objeto => {
   html=html+objeto.code;
  });
  document.getElementsByTagName("tbody")[0].innerHTML=html;

}