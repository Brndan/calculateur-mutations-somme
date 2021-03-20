function calculMutation() {
    const pts_situation_familiale = 5;
    const pts_handicap_maladie = 25;

    /* Récupération des valeurs */

    // Nombre d'enfants
    let enfants = +document.getElementById("nb_enfants").value;

    // Situation familiale
    let situation_familiale = document.getElementById("situation_familiale").value;

    switch (situation_familiale) {
        case "RAS":
            situation_familiale = 0;
            break;
        default:
            situation_familiale = pts_situation_familiale;
    }


    if (situation_familiale > 0) situation_familiale += enfants;

    // Handicap - maladie

    let handicap_maladie = 0;

    if (document.getElementById("pacd-cld").checked == true) handicap_maladie += pts_handicap_maladie;
    if (document.getElementById("rqth-cdaph").checked == true) handicap_maladie += pts_handicap_maladie;
    //if (document.getElementById("recrutement").checked == true) handicap_maladie += pts_handicap_maladie;

    // Ancienneté dans le 1er degré

    let anciennete = parseInt(document.getElementById("anciennete").value) * 2;
    anciennete += parseInt(document.getElementById("anciennete-mois").value) / 6;
    anciennete += parseInt(document.getElementById("anciennete-jours").value) / 180;
    anciennete = Math.round(anciennete * 100) / 100;

    // Parcours pro

    const anciennete_poste = 3;
    const anciennete_direction = 3;
    const faisant_fonction = 10;
    const formation = 3;
    const ash = 3;
    const rep = 3;

    let parcours_pro = 0;

    if (document.getElementById("anciennete-poste").checked == true) parcours_pro += anciennete_poste;
    if (document.getElementById("direction").checked == true) parcours_pro += anciennete_direction;
    if (document.getElementById("formation").checked == true) parcours_pro += formation;
    if (document.getElementById("ash").checked == true) parcours_pro += ash;
    if (document.getElementById("rep").checked == true) parcours_pro += rep;

    let voeu_repete = +document.getElementById("voeu-repete").value

    // à part : ASH (pour sortir), vœu répété précis, direction pour faisant-fonction

    let total_points = situation_familiale + handicap_maladie + anciennete + parcours_pro;






    if (document.getElementById("faisant-fonction-direction").checked == true) {
        let total_points_direction = total_points += faisant_fonction;
        contenu = "Pour votre vœu sur le poste de direction pour lequel vous êtes faisant-fonction, votre barème est de " + total_points_direction + " points.";
        addResult("aAfficher", contenu)

    }

    if (voeu_repete > 0) {
        let total_points_voeu1 = total_points + voeu_repete;
        contenu = "Pour votre vœu précis de rang 1, votre barème est de " + total_points_voeu1 + " points.";
        addResult("aAfficher", contenu)
    }

    contenu = "Votre barème est de " + total_points + " points.";
    addResult("aAfficher", contenu);

    if (document.getElementById("carte-scolaire").checked == true) {
        contenu = "Vous bénéficiez en plus d'une bonification en raison de la suppression de votre poste de 500 à 900 points";
        addResult("aAfficher", contenu)
    }

    console.log("total_points " + total_points);

}


// Cette fonction sert à afficher les éléments de réponse.
function addResult(id, content) {
    let newP = document.createElement("p");
    let node = document.createTextNode(content);
    newP.appendChild(node);
    let element = document.getElementById(id);
    element.appendChild(newP)
}