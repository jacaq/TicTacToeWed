/*Variables du projet*/

let joueur1 = "X";
let joueur2 = "O";
let joueur_actuel = "X";
let tour = 0;


function selectionCase(element) {
    /*Variables d'éléments HTML'*/
    let affichage_du_gagnant = document.getElementById("win");
    let Erreur_champs_vide = document.getElementById("vide");
    let affichage_joueur_actuel = document.getElementById("qui");
    let mesPhotos = document.getElementsByTagName("img");

    /*Remet le champs erreur à vide*/
    Erreur_champs_vide.className = null;

    ////Max 9 de tours permit (soit toutes les cases):
    if (tour < 9) {
        //Si l'élément en question est vide on procède sinon on indique un message d'erreur dans le Else:
        if (element.innerHTML != "X" && element.innerHTML != "O") {

            //Indique qui joue:
            element.innerHTML = joueur_actuel;

            //On valide seulement après au moins 5 coups (min pour pouvoir gagner):
            //(Appel de la fonction validation)
            if (tour >= 4) { validation(joueur_actuel); }

            if (joueur_actuel === "X") {
                //Ajout de la classe couleur approprié sur la case:
                element.classList.add("joueur1");
                //Changement du joueur actuel au prochain:
                joueur_actuel = joueur2;
                //Affichage fait avec les couleurs du prochain joueur:
                affichage_joueur_actuel.className = "joueur2";
                //Changement de l'image pour le prochain joueur:
                mesPhotos[0].setAttribute("src", "images/imgo.png");
            } else {
                //Même chose, mais pour l'autre joueur: 
                joueur_actuel = joueur1;
                element.classList.add("joueur2");
                affichage_joueur_actuel.className = "joueur1";
                mesPhotos[0].setAttribute("src", "images/imgx.png");
            }
            //Incrémente le nombre de tour joué:
            tour++;
            //Affichage du joueur actuel:
            affichage_joueur_actuel.innerHTML = "Joueur actuel: " + joueur_actuel;

            //Si on arrive à 9 tour sans que personne est gagné une ligne c'est que la partie est nulle:
            if (tour === 9) {
                affichage_du_gagnant.innerHTML = "Partie nulle !";
                affichage_du_gagnant.className = "Fin";
                mesPhotos[0].setAttribute("src", "images/imgnulle.png");
            }
        } else {
            //Message d'erreur avec sa classe respective:
            Erreur_champs_vide.innerHTML = "Cochez une case vide";
            Erreur_champs_vide.className = "erreur";
        }


        // *****Je fonctionne par validation de la partie gagné par tour===10*******
        if (tour >= 10) {
            //Suppression de l'affichichage du joueur actuel:
            affichage_joueur_actuel.className = null;
            affichage_joueur_actuel.innerHTML = null;
            //Affichage de l'image du gagnant:
            if (joueur_actuel === joueur1)
                mesPhotos[0].setAttribute("src", "images/imgo.png");
            else
                mesPhotos[0].setAttribute("src", "images/imgx.png");
        }

    }
}




function validation(le_joueur) {
    //Les variables nécessaires:
    let affichage_gagnant = document.getElementById("win");
    let les_cases = document.getElementsByClassName("mes_cases");
    //Message pour indiquer le gagant selon le_joueur (actuel)
    let qui_gagne = "Joueur ";
    if (le_joueur === "X") {
        qui_gagne += ": X gagne!";
    } else {
        qui_gagne += ": O gagne!";
    }

    /*J'ai préféré laissé en if simple puisqu'il est possible d'avoir 2 lignes gagnantes simultannéements (par le même joueur) */

    /*----------Rangées horizontales------------ */
    //case o à 2 (Horizontale(rangée 1))
    if (les_cases[0].innerHTML === le_joueur) {
        if (les_cases[1].innerHTML === le_joueur && les_cases[2].innerHTML === le_joueur) {

            //Appel de la fonction grow avec les valeurs des cases gagnantes:
            grow(0, 1, 2);
            //Tour à 10 indique que la partie est gagnée:
            tour = 10;

        }
    }
    //case 3 à 5 (Horizontale (rangée 2))
    if (les_cases[3].innerHTML === le_joueur) {
        if (les_cases[4].innerHTML === le_joueur && les_cases[5].innerHTML === le_joueur) {
            grow(3, 4, 5);
            tour = 10;
        }
    }
    //case 6 à 8 (Horizontale (rangée 3))
    if (les_cases[6].innerHTML === le_joueur) {
        if (les_cases[7].innerHTML === le_joueur && les_cases[8].innerHTML === le_joueur) {
            grow(6, 7, 8);
            tour = 10;
        }
    }

    /*------------Colonnes verticales------------ */
    //case 0,3,6 (Verticale (colonne 1))
    if (les_cases[0].innerHTML === le_joueur) {
        if (les_cases[3].innerHTML === le_joueur && les_cases[6].innerHTML === le_joueur) {
            grow(0, 3, 6);
            tour = 10;
        }
    }

    //case 1,4,7 (Verticale (colonne 2))
    if (les_cases[1].innerHTML === le_joueur) {
        if (les_cases[4].innerHTML === le_joueur && les_cases[7].innerHTML === le_joueur) {
            grow(1, 4, 7);
            tour = 10;
        }
    }
    //case 2,5,8 (Verticale (colonne 3))
    if (les_cases[2].innerHTML === le_joueur) {
        if (les_cases[5].innerHTML === le_joueur && les_cases[8].innerHTML === le_joueur) {
            grow(2, 5, 8);
            tour = 10;
        }
    }
    /*------------Diagonales------------*/
    //case 0,4,8 (diagonale 1)
    if (les_cases[0].innerHTML === le_joueur) {
        if (les_cases[4].innerHTML === le_joueur && les_cases[8].innerHTML === le_joueur) {
            grow(0, 4, 8);
            tour = 10;
        }
    }
    //case 2,4,6 (diagonale 2)
    if (les_cases[2].innerHTML === le_joueur) {
        if (les_cases[4].innerHTML === le_joueur && les_cases[6].innerHTML === le_joueur) {
            grow(2, 4, 6);
            tour = 10;
        }
    }

    //Si la partie est remporté:
    if (tour === 10) {
        //Ajout de la classe "Fin" et du message qui indique le gagnant: 
        affichage_gagnant.className = "Fin";
        affichage_gagnant.innerHTML = qui_gagne;
    }

}



//Fonction d'aggrandissement des cases gagnantes par l'ajout de la classe "grow":
//(les attibuts font références aux positions des cases dans la grid)
function grow(p1, p2, p3) {

    let grid_cases = document.getElementsByClassName("mes_cases");

    grid_cases[p1].classList.add("grow");
    grid_cases[p2].classList.add("grow");
    grid_cases[p3].classList.add("grow");



}