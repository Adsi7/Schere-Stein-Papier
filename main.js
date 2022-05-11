$(function(){
    
const game = () => {
    let spielerStand = 0;
    let computerStand = 0;
    const starteSpiel = () => {
        const spielbtn = document.querySelector(".intro button");
        spielbtn.addEventListener("click", () => {
          $(".intro").fadeOut("fast", function(){
          $(".match").addClass("aktiv")
        })
        
        })  ;  
    }

    const spielen = () => {
        starteSpiel();
        const optionen = document.querySelectorAll(".optionen button");
        const computerHand = document.querySelector(".computer-hand");
        const spielerHand = document.querySelector(".spieler-hand");
        const haende = document.querySelectorAll(".hand img");

        haende.forEach(hand=>{
            hand.addEventListener("animationend",function(){
                this.style.animation="";
            })
        })

        const computerOptionen = ["Schere", "Stein", "Papier"];
        optionen.forEach(option => {
            option.addEventListener("click", function () {
                //Computer Optionen
                const computerNummer = Math.floor(Math.random() * 3);
                const computerWahl = computerOptionen[computerNummer];
                
                setTimeout(()=>{
                    vergleich(computerWahl, this.textContent);
                    ende();
                computerHand.src=`./assets/${computerWahl}.png`;
                spielerHand.src= `./assets/${this.textContent}.png`;}, 2000)
                
                computerHand.src=`./assets/Stein.png`;
                spielerHand.src= `./assets/Stein.png`;
                    
                spielerHand.style.animation="shakePlayer 2s ease";
                computerHand.style.animation="shakeComputer 2s ease";
                
            })
        })
    }

    const spielstandAktualisieren = () => {
        document.querySelector(".player-Spielstand p").textContent=spielerStand;
        document.querySelector(".computer-Spielstand p").textContent=computerStand;
   
        
    }

    const vergleich = (computerWahl, spielerWahl) => {
        const gewinner =$(".match h2");
        //Prüfung auf Unentschieden
        if (computerWahl === spielerWahl) {
            gewinner.text( "Unentschieden");
            return;
        }
        //Prüfen ob Stein
        if (spielerWahl === "Stein") {
            if (computerWahl === "Schere") {
                gewinner.text( "Spieler gewinnt!")
                spielerStand++;
                spielstandAktualisieren();
                return;
            } else{ gewinner.text("Computer gewinnt!"); 
                computerStand++;
                spielstandAktualisieren();
                return;}
        }

        //Prüfen ob Papier
        if (spielerWahl === "Papier") {
            if (computerWahl === "Stein") {
                gewinner.text( "Spieler gewinnt!")
                spielerStand++;
                spielstandAktualisieren();
                return;
            } else {gewinner.text("Computer gewinnt!");
                computerStand++;
                spielstandAktualisieren();
                return;}
        }

        //Prüfen ob Schere
        if (spielerWahl === "Schere") {
            if (computerWahl === "Papier") {
                gewinner.text( "Spieler gewinnt!")
                spielerStand++;
                spielstandAktualisieren();
                return;
            } else {
                gewinner.text("Computer gewinnt!");
                computerStand++;
                spielstandAktualisieren();
                return;}
        }
    }

    const ende =()=>{
        if(spielerStand==3){
            $("#aktive").removeClass("aktiv")
            setTimeout(()=>{
             $(".ende").addClass("aktiv",function(){
                  $(".ende p").text("Spieler hat gewonnen")
                });
               

            },500)
          
            }
        else if(computerStand==3){
            $("#aktive").removeClass("aktiv");

            setTimeout(()=>{
            $(".ende").addClass("aktiv",function(){
                    $(".ende p").text("Computer hat gewonnen");
           })            ;
                
            },500)
           
        }
        
        $(".ende button").on("click",function(){
            spielerStand=0;
            computerStand=0;
            spielstandAktualisieren();
            document.querySelector(".match h2").textContent="Wähle eine Option!"
            $(".ende").removeClass("aktiv");
            $("#aktive").addClass("aktiv");
           ;            
        })

    };

    
    spielen();
}




game();
})

