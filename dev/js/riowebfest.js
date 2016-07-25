//GLOBAL ELEMENTS
var rmcNavMenu = $("nav"),
iconNav = $('#nav-icon'),
sectionPage = $('section'),
rmcCarousel = $('.cut-carousel'),
rmcImgCarousel = rmcCarousel.find('.cut-img'),
srjNavLogo = document.querySelector('.nav-logo'),
rmcMoveCarouselRight = $("#move-carousel-right"),
rmcMoveCarouselLeft = $("#move-carousel-left"),
rmcPhotoUpload = $("#uploadfile"),
rmcCameraIcon = $('#camera-icon').find('i'),
rmcPhotoContainer = $('#photo-container'),
rmcButtonSendForm = $('#send-form'),
rmcFormPhoto = $("#rmc-photo"),
rmcFormNome = $("#rmc-nome"),
rmcFormTipo = $("#rmc-tipo"),
rmcFormGenero = $("#rmc-genero"),
rmcFormIntegrantes = $("#rmc-integrantes"),
rmcFormResponsavel = $("#rmc-responsavel"),
rmcFormDoc = $("#rmc-doc"),
rmcFormFacebook = $("#rmc-facebook"),
rmcFormEmail = $("#rmc-email"),
rmcFormTelefone = $("#rmc-telefone"),
rmcFormEndereco = $("#rmc-endereco"),
rmcFormCidade = $("#rmc-cidade"),
rmcFormEstado = $("#rmc-estado"),
rmcFormDescricao = $("#rmc-descricao"),
rmcFormYoutube = $("#rmc-youtube");

//GLOBAL VARS
var tabIndexOrder = 1,
infoMessage = 1,
idCarousel = 1,
formPic,
formFields;

//ONREADY
setTimeout(function () {moveCarousel(3);}, 5000);
showNavIcon();

//FUNCTION TO MOVE SECTIONS SMOOTH
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 500);
            verifyNav();
            return false;
        }
    }
});

//FUNCTION TO REPLACE STRINGS
String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        var pos = replaceString.indexOf(find[i]);
        while (pos > -1) {
            replaceString = replaceString.replace(find[i], replace[i]);
            pos = replaceString.indexOf(find[i]);
        }
    }
    return replaceString;
};

if(rmcCarousel.length > 0) {
    $(document).on('keyup', function(event) {
        event.preventDefault();
        switch (event.which) {
            case 39:
            moveCarousel(1);
            break;

            case 37:
            moveCarousel(2);
            break;
        }
    });
}

$(window).scroll(function (event) {
    showNavIcon();
});

$(rmcMoveCarouselRight).on('click', function(event) {
    event.preventDefault();
    moveCarousel(1);
});

$(rmcMoveCarouselLeft).on('click', function(event) {
    event.preventDefault();
    moveCarousel(2);
});

if (rmcNavMenu.length > 0) {
    $(iconNav).on('click', function(event) {
        event.preventDefault();
        toggleNav();
    });
}

$(sectionPage).on('click', function(event) {
    // event.preventDefault();
    verifyNav();
});

function verifyNav() {
    if(rmcNavMenu.hasClass('nav--open')){
        toggleNav();
    }
}

function toggleNav() {
    $(rmcNavMenu).toggleClass('nav--close nav--open');
}

function showNavIcon() {
    if ($(window).width() >= 641) {
        if ($(window).scrollTop() >= $("section").height() && rmcNavMenu.hasClass('nav--close')) {
            srjNavLogo.style.cursor = 'pointer';
            srjNavLogo.style.opacity = '1';
        }
        else {
            srjNavLogo.style.cursor = 'auto';
            srjNavLogo.style.opacity = '0';

        }
    }
}

function moveCarousel(op){
    leftCarousel = $(rmcCarousel).css('left');
    imgCarousel = $(rmcImgCarousel).css("width");
    var find = ["px"];
    var replace = [""];
    leftCarousel = leftCarousel.replaceArray(find, replace);
    imgCarousel = parseInt(imgCarousel.replaceArray(find, replace));

    if(op == 1){
        var limitCarousel = (imgCarousel * 8) * -1;

        if(leftCarousel >= limitCarousel){
            $(rmcCarousel).css("left", ((imgCarousel * idCarousel) * -1));
            idCarousel++;
        }
    }
    else if(op == 2){
        var limitCarousel = (imgCarousel * -1);

        if(leftCarousel <= limitCarousel){
            idCarousel = idCarousel - 1;
            $(rmcCarousel).css("left", imgCarousel * (idCarousel - 1) * -1);
        }
    }
    else if(op == 3){
        if(idCarousel <= 9){
            moveCarousel(1);
        }
        else if(idCarousel = 10){
            idCarousel = 2;
            moveCarousel(2);
        }

        setTimeout(function(){moveCarousel(3)}, 5000);
    }
}


var icon = new H.map.Icon('design/marker-map-01.png'),
coords = {lat: -22.908011, lng: -43.195984};

var platform = new H.service.Platform({
    app_id: 'b7JSC5ZyD0bHxspZC4vR',
    app_code: '38SINqnVFyzG4iWf7obngQ',
    useCIT: true,
    useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('mapa-layer'),
defaultLayers.satellite.map,{
    center: {lat: coords.lat, lng: coords.lng},
    zoom: 15
});

var ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR');
enableTrafficInfo(map);

function enableTrafficInfo (map) {
    map.setBaseLayer(defaultLayers.satellite.traffic);
}
var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');
var panorama = ui.getControl('panorama');

// mapSettings.setAlignment('top-right');
scalebar.setVisibility(0);

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)).disable();
var marker = new H.map.Marker(coords, { icon: icon });
map.addObject(marker);
map.setCenter(coords);
