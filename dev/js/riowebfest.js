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

rmcPhotoUpload.change(function (event) {
  postPic(event);
});

rmcButtonSendForm.click(function () {
  if(rmcFormNome.val() != "" && rmcFormTipo.val() != "" && rmcFormGenero.val() != "" && rmcFormIntegrantes.val() != "" && rmcFormResponsavel.val() != "" && rmcFormDoc.val() != "" && rmcFormFacebook.val() != "" && rmcFormEmail.val() != "" && rmcFormTelefone.val() != "" && rmcFormEndereco.val() != "" && rmcFormCidade.val() != "" && rmcFormEstado.val() != "" && rmcFormDescricao.val() != ""){

    if(rmcButtonSendForm.hasClass("noclick") === true) {
      criarFormInputFields();
    }
    else
    {
      swal("Oops...", "Só é possível enviar uma inscrição por vez!", "error");
    }
  }
  else
  {
      swal("Oops...", "Verifique os campos que são obrigatórios pra você.", "error");
  }
});

function postPic(event){
  formPic = new FormData();
  formPic.append("uploadfile", event.target.files[0]);

  $.ajax({
    url: "//www.somostodosjao.com.br/api/upload.php",
    global: false,
    data: formPic,
    cache: false,
    processData: false,
    contentType: false,
    type: "POST",
    beforeSend: function(){
      rmcCameraIcon.removeClass("fa-camera fa-times-circle");
      rmcCameraIcon.addClass("fa-cog fa-spin");
      rmcFormPhoto.val('');
    },
    complete: function() {
      rmcCameraIcon.removeClass("fa-camera fa-spin fa-cog");
      rmcCameraIcon.addClass("fa-times-circle");
    },
    success: function(response){
      if(response === "2"){
        swal("Erro ao enviar sua foto", "Só é possível enviar arquivos do tipo JPG.\nVerifique sua foto e tente novamente...", "error")
      } else {
        rmcPhotoContainer.css('background-image', 'url(//www.somostodosjao.com.br/tekoa/content/'+response+')');
        rmcFormPhoto.val(response);
      }
    }
  });
}

function criarFormInputFields(){
  formFields = new FormData();

  formFields.append("foto", rmcFormPhoto.val().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("nome", rmcFormNome.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("tipo", rmcFormTipo.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("genero", rmcFormGenero.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("integrantes", rmcFormIntegrantes.val().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("responsavel", rmcFormResponsavel.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("documento", rmcFormDoc.val().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("facebook", rmcFormFacebook.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("email", rmcFormEmail.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("telefone", rmcFormTelefone.val().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("endereco", rmcFormEndereco.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("cidade", rmcFormCidade.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("estado", rmcFormEstado.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("descricao", rmcFormDescricao.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  formFields.append("youtube", rmcFormYoutube.val().toUpperCase().replace(/<\/?[^>]+(>|$)/g, " "));
  postInfo("inscricoes_2016");
}

function limpaInputs() {
  rmcFormPhoto.val('');
  rmcFormNome.val('');
  rmcFormTipo.val('');
  rmcFormGenero.val('');
  rmcFormIntegrantes.val('');
  rmcFormResponsavel.val('');
  rmcFormDoc.val('');
  rmcFormFacebook.val('');
  rmcFormEmail.val('');
  rmcFormTelefone.val('');
  rmcFormEndereco.val('');
  rmcFormCidade.val('');
  rmcFormEstado.val('');
  rmcFormDescricao.val('');
  rmcFormYoutube.val('');
}

function postInfo(tabela){
  $.ajax({
    url: "//www.somostodosjao.com.br/api/savedata.php?t="+tabela,
    global: false,
    data: formFields,
    cache: false,
    processData: false,
    contentType: false,
    type: "POST",
    beforeSend: function(){
      rmcButtonSendForm.html('SALVANDO...').removeClass("noclick");
    },
    success: function(response){
      if(response != "1"){
        rmcButtonSendForm.html('TENTE NOVAMENTE!').css("background", "#FFF").css("color", "#000");
      }
      else
      {
        rmcButtonSendForm.html('PRONTO!').removeClass("noclick");
        // limpaInputs();
        swal({
          title: "Quase pronto!",
          text: "Faça o download do termo de participante aqui em <a style='color:#000;' href='termo-do-participante-meu-nome-e-jao-doc.doc'><b>Word (.doc)</b></a> ou <a style='color:#000;' href='termo-do-participante-meu-nome-e-jao-odt.doc'><b>Libre Office (.odt)</b></a>, preencha, imprima e assine.<br>A apresentação deste documento é obrigatória para todos os artistas.<br><br>Para mais instruções, aguarde pois entraremos em contato em breve.",
          html: true,
          type: "success"
        });
      }
    }
  });
}
