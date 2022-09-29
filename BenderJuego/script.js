let palabrita;
let cant_errores = 0; //cuantas veces me equivoqué
let cant_aciertos = 0; //cuantas letras acerté

const palabras = ['Canada', 'Turquia', 'Japon', 'Suecia', 'Chile', 'China', 'Camerun', 'Congo', 'Uruguay','Salvador', 'Honduras', 'Alaska', 'Canada', 'Egipto', 'Escocia', 'Ucrania','Andorra', 'Chipre'];
const btn = id('jugar');
const imagen = id( 'imagen' );
const btn_letras = document.querySelectorAll( "#letras button" );

/* click en reiniciar juego */



/* click en iniciar juego */

btn.addEventListener('click', iniciar );

function iniciar(event){
    imagen.src='img/img1.png';
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0; 

    const parrafo = id( 'palabra_a_adivinar' );
    parrafo.innerHTML = ''; 

    const cant_palabras = palabras.length;
    const valor_al_azar = obtener_random( 0, cant_palabras );

    palabrita = palabras[ valor_al_azar ];
    console.log( palabrita );
    const cant_letras = palabrita.length;

    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = false;
    }

    for( let i = 0; i < cant_letras; i++ ){
        const span = document.createElement( 'span' );
        parrafo.appendChild( span );
    }

}

/* click de adivinar letra */
for( let i = 0; i < btn_letras.length ; i++ ){
    btn_letras[ i ].addEventListener( 'click', click_letras );
}

function click_letras(event){
    const spans = document.querySelectorAll( '#palabra_a_adivinar span' );
    const button = event.target; //cuál de todas las letras, llamó a la función.
    button.disabled = true;

    const letra = button.innerHTML.toLowerCase( );
    const palabra = palabrita.toLowerCase( ); // .toUpperCase( )

    let acerto = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            //la variable i es la posición de la letra en la palabra.
            //que coincide con el span al que tenemos que mostarle esta letra...
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if( acerto == false ){
        cant_errores++;
        const source = `img/img${cant_errores}.png` ;
        imagen.src = source;
    }

    if( cant_errores == 7 ){
        id('resultado').innerHTML = Swal.fire({
            title: '<b class="white">¡¡¡Perdiste...!!! y Devil Robot ha desaparecido a BENDER!!!</b>',
            html: '<b class="white"> el país era ' + palabrita +'</b>',
            imageUrl: './img/diabloRobot.gif',
            //icon:'error',
            imageWidth: '10%',
            //width: '40%',
            background: '#dd492d',
            grow: 'column',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey:false,
            stopKeydownPropagation: false,
            footer:'<span class="white">Gracias por jugar</span>',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonText: 'Confirmar',
          })
        //id('resultado').innerHTML ="Perdiste, la palabra era " + palabrita;
        game_over( );
    }else if( cant_aciertos == palabrita.length ){
        id('resultado').innerHTML = id('resultado').innerHTML = Swal.fire({
            title: '<b>¡¡¡Ganaste...!!! y has salvado a BENDER!!!</b>',
            html: '<b>adivinaste el país</b>',
            imageUrl: './img/benderBaila.gif',
            //icon: 'success',
            imageWidth: '10%',
            background: '#bfffef',
            //width: '40%',
            grow: 'column',
            backdrop: true,
            footer:'<span>Gracias por jugar</span>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey:false,
            stopKeydownPropagation: false,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonText: 'Confirmar',
          })
        game_over( );
    }
    
}

function game_over(event){
    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = true;
    }

    btn.disabled = false;
}

game_over( );
