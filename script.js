// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivo = null;
let timerInicial = timer;
var mensaje_reinicio = false;

let winAudio = new Audio('./sonidos/win.wav');
let loseAudio = new Audio('./sonidos/lose.wav');
let clickAudio = new Audio('./sonidos/click.wav');
let rightAudio = new Audio('./sonidos/right.wav');
let wrongAudio = new Audio('./sonidos/wrong.wav');

// apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funciones
function contarTiempo(){
    tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer == 0){
        clearInterval(tiempoRegresivo);
        bloquearTarjetas();
        loseAudio.play();
    }
}, 1000);
}

function bloquearTarjetas(){

    for(let i=0;i<=15;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src ="./img/${numeros[i]}.png" alt"">`;
        //tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
    mostrarTiempo.innerHTML = `Perdiste! demasiado lento :b`;
    
}

// funcion principal
function girar(Id){
    //recargar pagina
    document.addEventListener("keyup", reiniciar);

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //mostrar el primer numero
        tarjeta1 = document.getElementById(Id);
        primerResultado = numeros[Id];
        tarjeta1.innerHTML= `<img src ="./img/${primerResultado}.png" alt"">`;

        clickAudio.play();
        // deshabilitar el primer boton
        tarjeta1.disabled = true; 
    } else if(tarjetasDestapadas == 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(Id);
        segundoResultado = numeros[Id];
        tarjeta2.innerHTML= `<img src ="./img/${segundoResultado}.png" alt"">`;

        // deshabilitar segundo boton
        tarjeta2.disabled = true;

        // incremetar movimientos
         movimientos ++;
         mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            rightAudio.play();
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //aumentar aciertos
            aciertos++;
            console.log(aciertos);
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            
            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}(˃ᆺ˂)`;
                mostrarTiempo.innerHTML = `Miau! Solo demoraste ${timerInicial - timer} segundos (ㅇㅅㅇ)`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}(^=˃ᆺ˂)=`;
                winAudio.play();
            }
            
            
        }else {
            wrongAudio.play();
            // mostrar momentaneamente los valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML= ' ';
                tarjeta2.innerHTML =' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
            
        }
        
    }
}

function reiniciar(e){
    if(e.code == "Space"){
        window.location.reload();
    }

}

