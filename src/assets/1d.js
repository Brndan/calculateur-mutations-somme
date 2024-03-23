function calculMutation() {
    console.log("calcul mutation")
    // Familial
    const PTS_SITUATION_FAMILIALE = 5;
    const PTS_RETOUR_CONGE_PARENTAL = 5;
    const PTS_PARENT_ISOLE = 2;
    const PTS_ENFANTS = 1;

    // Médical et handicap
    const PTS_HANDICAP_MALADIE = 25;
    const PTS_PACD_CLD = 50;
    const PTS_MEDECINE_TRAVAIL = 100;

    // Parcours professionnel
    const PTS_DIRECTION_VACANTE = 20;
    const ANCIENNETE_DIRECTION = 3;
    const FAISANT_FONCTION = 10;
    const ASH = 3;
    const RECRUTEMENT_DEFICITAIRE = 3;

    /* Récupération des valeurs */

    // Nombre d'enfants
    let nb_enfants = +document.getElementById("nb_enfants").value;
    let enfants = nb_enfants * PTS_ENFANTS;

    // Situation familiale
    let situation_familiale = 0;

    let situation = document.getElementById("situation_familiale").value;

    switch (situation) {
        case "RAS":
            situation_familiale = 0;
            break;
        case "parent_isole":
            situation_familiale += PTS_PARENT_ISOLE;
            break;
        case "rapprochement_conjoint":
            situation_familiale += PTS_SITUATION_FAMILIALE;
            break;
        case "autorité_conjointe":
            situation_familiale += PTS_SITUATION_FAMILIALE;
            break;
    }

    if (document.getElementById("situation_familiale").value == "rapprochement_conjoint" || document.getElementById("situation_familiale").value == "autorité_conjointe") {
        situation_familiale += enfants;
    }

    if (document.getElementById("retour_conge_parental").checked) situation_familiale += PTS_RETOUR_CONGE_PARENTAL;


    // Handicap - maladie
    let handicap_maladie = 0;

    if (document.getElementById("pacd-cld").checked) handicap_maladie += PTS_PACD_CLD;
    if (document.getElementById("rqth-cdaph").checked) handicap_maladie += PTS_HANDICAP_MALADIE;
    if (document.getElementById("rqth_medecin").checked) handicap_maladie += PTS_MEDECINE_TRAVAIL;

    // Ancienneté dans le 1er degré
    let anciennete = 0
    anciennete += (+document.getElementById("anciennete").value) * 2;
    anciennete += (+document.getElementById("anciennete_mois").value / 12) *2;
    anciennete += (+document.getElementById("anciennete_jours").value / 360) *2;
    //anciennete = Math.round(anciennete * 100) / 100;

    
    

   

    // Stabilité dans le poste
    let anciennete_poste = +document.getElementById("anciennete_poste").value;
    let pts_stabilite = 0;

    switch (anciennete_poste) {
        case "3":
            pts_stabilite = 3;
            break;
        case "4":
            pts_stabilite = 4;
            break;
        case "5":
            pts_stabilite = 5;
            break;
        case "6":
            pts_stabilite = 6;
            break;
        case "7":
            pts_stabilite = 7;
            break;
    }

    // Ancienneté en éducation prioritaire
    let anciennete_rep = +document.getElementById("anciennete_poste").value;
    let pts_rep = 0;

    switch (anciennete_rep) {
        case "3":
            pts_rep = 3;
            break;
        case "4":
            pts_rep = 4;
            break;
        case "5":
            pts_rep = 5;
            break;
        case "6":
            pts_rep = 6;
            break;
        case "7":
            pts_rep = 7;
            break;
    }

    // Direction
    let pts_direction = 0;

    if (document.getElementById("direction").checked) pts_direction += ANCIENNETE_DIRECTION;
    if (document.getElementById("faisant-fonction-direction").checked) pts_direction += FAISANT_FONCTION;
    if (document.getElementById("direction_vacante").checked) pts_direction += PTS_DIRECTION_VACANTE;

    // Autres
    let parcours_pro = 0;
    
    if (document.getElementById("ash").checked) parcours_pro += ASH;
    if (document.getElementById("difficulte_recrutement").checked) parcours_pro += RECRUTEMENT_DEFICITAIRE;

    let voeu_repete = +document.getElementById("voeu_repete").value


    // Calcul des points 
    let total_points = 0;
    total_points += situation_familiale
    total_points += handicap_maladie 
    total_points += anciennete 
    total_points += anciennete_poste 
    total_points += pts_rep
    total_points += pts_direction
    total_points += parcours_pro;
    total_points += voeu_repete;

    console.log("total_points " + total_points)

    // Détruit les résultats affichés
    let node = document.getElementById("aAfficher");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    displayResults("aAfficher");

    let bareme = "Votre barème est de " + total_points + " points.";
    addResult("aAfficher", bareme);

    if (document.getElementById("carte-scolaire").checked) {
        let contenu = "Vous bénéficiez en plus d'une bonification en raison de la suppression de votre poste de 200 à 300 points.";
        addResult("aAfficher", contenu)
    }

    console.log("total_points " + total_points);
    // Révéler les coordonnées du syndicat
    document.getElementById("syndicat").style.display = "block";


    // Aller à la vue du résultat (utile sur petit écran)
    //document.getElementById("aAfficher").scrollIntoView();

}

// Ces fonctions servent à afficher les éléments de réponse.
function addResult(id, content) {
    let newP = document.createElement("p");
    let node = document.createTextNode(content);
    newP.appendChild(node);
    let element = document.getElementById(id);
    element.appendChild(newP)
}

function displayResults(id) {
    let newH2 = document.createElement("h2");
    let node = document.createTextNode("Résultat");
    newH2.appendChild(node);
    let element = document.getElementById(id);
    let content = "Voici une estimation de vos points de mutation :"
    element.appendChild(newH2);
    addResult(id, content)
}



const checkboxes = document.querySelectorAll('select, input');
checkboxes.forEach(function(item) {
  item.addEventListener('click', calculMutation)
})