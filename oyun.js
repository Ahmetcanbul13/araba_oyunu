/** @type {HTMLCanvasElement} */

// Canvas alanı belirleme.

var cvs = document.getElementById("canvas");
var ctx =cvs.getContext("2d");

// Eklenecek fotoğrafları tanımlama.

var araba = new Image();
var yol = new Image();
var ust_barikat=new Image();
var alt_barikat=new Image();

// Fotoğraflara adres tanımlama.

araba.src="araba.png";
yol.src="yol.jpg";
ust_barikat.src="ust_barikat.jpg";
alt_barikat.src="alt_barikat.jpg";

// Kullanılacak değerleri tanımlama.

var gap=100;
var score=0;
var constant;

var araba_x=20;
var araba_y=200;

// Kullanılacak sesleri tanımlama.

var drift = new Audio();
var puan = new Audio();

// Seslerin adreslerin tanımlama.

drift.src = "drift.mp3";
puan.src = "puan.mp3";

// Kontrolleri etkinleştirme.

document.addEventListener("keydown",driftt);

// Kontrol ataması.

function driftt(evt){
    switch(evt.keyCode){
        case 37:
            araba_y-=10;
            drift.play();
            break;
        case 39:
            araba_y+=10;
            drift.play();
            break;
    }
    
}

// Barikatları oluşturma.

var barikat=[];

barikat[0]={
    x : cvs.width,
    y : 0
};

function draw(){
  // Yol ögesini çizme.
  ctx.drawImage(yol,0,0); 
  
  for(var i=0;i<barikat.length;i++){
    constant=ust_barikat.height+gap; // Alt barikatın gelmesi gereken başlangıç koordinatı belirleme.
    ctx.drawImage(ust_barikat,barikat[i].x,barikat[i].y); // Ust barikatı çizme.
    ctx.drawImage(alt_barikat,barikat[i].x,barikat[i].y+constant); // Alt barikatı çizme.

    barikat[i].x-=2; //Seçili olan barikatları x ekseninde sola kaydırma.

    if(barikat[i].x==274){ // Yeni gelecek olan barikat için kurallar belirleme. 
        barikat.push({
            x:cvs.width,
            y:Math.floor(Math.random()*ust_barikat.height)-ust_barikat.height // Gelecek olan alt barikatın başlaması gereken y koordinatının rastgele belirlenmesi.
        });
    }
    // Oyunun devam etmesi için gereken koşullar.
    if( araba_x + araba.width >= barikat[i].x && araba_x <= barikat[i].x + ust_barikat.width && (araba_y <= barikat[i].y + ust_barikat.height || araba_y+araba.height >= barikat[i].y+constant) ){
        location.reload(); // reload the page

  }
  // Puan kazanmak için gereken kurallar.
  if(barikat[i].x==4){
    score++;
    puan.play();
  }
}
  // Skor tablosunun çizimi.
  ctx.drawImage(araba,araba_x,araba_y);
  ctx.fillStyle="#000";
  ctx.font="20px Verdana";
  ctx.fillText("Score : "+score,10,cvs.height-20);
  requestAnimationFrame(draw);
}

draw();
