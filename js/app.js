$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // evento click para obtener la informacion de cada personaje
  $('img').on('click', function(event) {
    // console.log(event.target.alt);
    // obtenemos los nombres del atributo alt para luego utilizarlo en la condicional
    localStorage.namePeople = event.target.alt;
    // hacemos el llamado a la funcion flecha(funcion expresion getnews) para obtener los datos de la api
    getNews();
  });
  const getNews = () => {
    // creando el  nuevo object primero en undefined
    const object = new XMLHttpRequest();
    // obteniendo api en xml
    object.open('GET', 'https://swapi.co/api/people');
    // comenzando a ejecutarlo en una busqueda exitosa
    object.onload = addNews;
    // se ejecuta cuando se produzca un error
    object.onerror = handleError;
    // usando metodo send para enviar la solicitusd de los pedidos correspondientes
    object.send();
  };
  // funcion flecha(funcion expresion) que se ejecutara cuando encuentre un error
  const handleError = () => {
    console.log('Se ha presentado un error');
  };
  const addNews = () => {
    // obteniendo el objeto javascript para ello el json obtenido se debe parsear con JSON.parse()
    const data = JSON.parse(this.responseText);
    // console.log(data);
    let response = data.results[0];
    // console.log(response.films[0]);
    // console.log(data.results.length);
    // console.log(localStorage.namePeople);
    for (let i = 0; i < data.results.length; i++) {
      if (localStorage.namePeople === data.results[i].name) {
        $('#nameActor').text(data.results[i].name);
        $('.info').html(`Birth year: ${data.results[i].birth_year} <br> Eye color : ${data.results[i].eye_color} <br> Gender : ${data.results[i].gender} <br> Hair color : ${data.results[i].hair_color} <br> Height : ${data.results[i].height} <br> Mass : ${data.results[i].mass}`);
        $('#films').text(`Films: ${data.results[i].films.length}`);
        $('#species').text(`Species: ${data.results[i].species.length}`);
        $('#starships').text(`Starsips: ${data.results[i].starships.length}`);
        break;
      }
    }
  };
});
