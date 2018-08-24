$(function(){

    var nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=cRWFf2n057JsyqCo6BfWl538oEfnuEpoxYWvWyUq';
    var marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=cRWFf2n057JsyqCo6BfWl538oEfnuEpoxYWvWyUq'
    var image = $('#image');
    var galeryItem = $('.galery-item');
    var first = $('.first');

    function getFromSerwer(){
        $.ajax({
            url: nasaUrl
        }).done(function(response){
            insertFirst(response);
        }).fail(function(error){
            console.log(error);
        })
    }

    function getMarsPhotos(){
        $.ajax({
            url: marsUrl
        }).done(function(response){
            console.log(response);
            insertMarsPhoto(response.photos);
        }).fail(function(error){
            console.log(error);
        })
    }

    function insertFirst(picture){
        var textToInsert = picture.explanation;
        var picture = picture.hdurl;
        image.css('background-image', `url("${picture}")`);
        image.find('p').text(textToInsert);
    }

    function insertMarsPhoto(photos) {
        for (var id in photos) {
            if(id<6) {
                var image = photos[id].img_src;
                $(galeryItem[id]).css('background-image', `url("${image}")`)
            }
        }
    }

    first.on('click', () => {
        $('.explanation').toggle();
    })

    getFromSerwer();
    getMarsPhotos();

})