/** Compiler avec
 * tsc --strict --target es2022 1d.ts
 *  */ 


function calculMutation(): void {
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
    const html_enfants = document.getElementById("nb_enfants") as HTMLInputElement | null;
    let nb_enfants = 0;
    if (html_enfants != null) nb_enfants = Number(html_enfants.value);
    let enfants = nb_enfants * PTS_ENFANTS;

    // Situation familiale
    let situation_familiale = 0;

    const html_situation = document.getElementById("situation_familiale") as HTMLInputElement | null;
    let situation = "";
    if (html_situation != null) situation = html_situation.value;

    switch (situation) {
        case "RAS":
            situation_familiale = 0;
            break;
        case "parent_isole":
            situation_familiale += PTS_PARENT_ISOLE;
            break;
        case "rapprochement_conjoint":
            situation_familiale += PTS_SITUATION_FAMILIALE;
            situation_familiale += enfants;
            break;
        case "autorité_conjointe":
            situation_familiale += PTS_SITUATION_FAMILIALE;
            situation_familiale += enfants;
            break;
    }

    const html_conge_parental = document.getElementById("retour_conge_parental") as HTMLInputElement | null
    if (html_conge_parental != null && html_conge_parental.checked) situation_familiale += PTS_RETOUR_CONGE_PARENTAL;


    // Handicap - maladie
    let handicap_maladie = 0;

    const check_pacd_cld = document.getElementById("pacd-cld") as HTMLInputElement | null;
    if (check_pacd_cld != null && check_pacd_cld.checked) handicap_maladie += PTS_PACD_CLD;

    const check_rqth_cdaph = document.getElementById("rqth-cdaph") as HTMLInputElement | null;
    if (check_rqth_cdaph != null && check_rqth_cdaph.checked) handicap_maladie += PTS_HANDICAP_MALADIE;

    const check_rqth_medecin = document.getElementById("rqth_medecin") as HTMLInputElement | null;
    if (check_rqth_medecin != null && check_rqth_medecin.checked) handicap_maladie += PTS_MEDECINE_TRAVAIL;

    // Ancienneté dans le 1er degré
    let anciennete = 0

    const html_anciennete_annee = document.getElementById("anciennete") as HTMLInputElement | null
    let anciennete_annee = 0
    if (html_anciennete_annee != null) anciennete_annee = Number(html_anciennete_annee.value)
    anciennete += anciennete_annee * 2;

    const html_anciennete_mois = document.getElementById("anciennete_mois") as HTMLInputElement | null
    let anciennete_mois = 0
    if (html_anciennete_mois != null) anciennete_mois = Number(html_anciennete_mois.value);
    anciennete += (anciennete_mois / 12) * 2;

    const html_anciennete_jours = document.getElementById("anciennete_jours") as HTMLInputElement | null
    let anciennete_jours = 0
    if (html_anciennete_jours != null) anciennete_jours = Number(html_anciennete_jours.value);
    anciennete += (anciennete_jours / 360) * 2;

    anciennete = Math.round(anciennete * 100) / 100;

    // Stabilité dans le poste
    let anciennete_poste = ""
    const html_anciennete_poste = document.getElementById("anciennete_poste") as HTMLInputElement | null;
    if (html_anciennete_poste != null) anciennete_poste = html_anciennete_poste.value
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
    let anciennete_rep = ""
    const html_anciennete_rep = document.getElementById("rep") as HTMLInputElement | null;
    if (html_anciennete_rep != null) anciennete_rep = html_anciennete_rep.value

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

    const check_direction = document.getElementById("direction") as HTMLInputElement | null
    if (check_direction != null && check_direction.checked) pts_direction += ANCIENNETE_DIRECTION;

    const check_faisant_fonction = document.getElementById("faisant-fonction-direction") as HTMLInputElement | null
    if (check_faisant_fonction != null && check_faisant_fonction.checked) pts_direction += FAISANT_FONCTION;

    const check_direction_vacante = document.getElementById("direction_vacante") as HTMLInputElement | null
    if (check_direction_vacante != null && check_direction_vacante.checked) pts_direction += PTS_DIRECTION_VACANTE;

    // Autres
    let parcours_pro = 0;

    const check_ash = document.getElementById("ash") as HTMLInputElement | null
    if (check_ash != null && check_ash.checked) parcours_pro += ASH;

    const check_difficulte_recrutement = document.getElementById("difficulte_recrutement") as HTMLInputElement | null
    if (check_difficulte_recrutement != null && check_difficulte_recrutement.checked) 
        parcours_pro += RECRUTEMENT_DEFICITAIRE;

    let voeu_repete = 0
    const html_voeu_repete = document.getElementById("voeu_repete") as HTMLInputElement | null
    if (html_voeu_repete != null) voeu_repete += Number(html_voeu_repete.value)

    // Calcul des points 
    let total_points = 0;
    total_points += situation_familiale
    total_points += handicap_maladie
    total_points += anciennete
    total_points += pts_stabilite
    total_points += pts_rep
    total_points += pts_direction
    total_points += parcours_pro;
    total_points += voeu_repete;

    // Détruit les résultats affichés
    let node = document.getElementById("aAfficher");
    if (node != null) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    displayResults("aAfficher");

    let bareme = "Votre barème est de " + toLocaleNumber(total_points) + " points.";
    addResult("aAfficher", bareme);

    const check_carte_scolaire = document.getElementById("carte-scolaire") as HTMLInputElement | null
    if (check_carte_scolaire != null && check_carte_scolaire.checked) {
        let contenu = "Vous bénéficiez en plus d'une bonification en raison de la suppression de votre poste de 200 à 300 points.";
        addResult("aAfficher", contenu)
    }

    console.log("total_points " + total_points);
    // Révéler les coordonnées du syndicat

    //const bloc_syndicat = document.getElementById("syndicat") as HTMLElement
    //bloc_syndicat.style.display = "block";

    // Même fonctionnement en TS avec ?.setAttribute()
    document.getElementById("syndicat")?.setAttribute("style", "display: block")

    // Aller à la vue du résultat (utile sur petit écran)
    //document.getElementById("aAfficher")?.scrollIntoView();

}

// Affichage avec virgule
function toLocaleNumber(fieldValue: number): string {
    let locale_value = fieldValue.toFixed(2)
    locale_value = locale_value.replace(/\./, ',')
    return locale_value
}

// Ces fonctions servent à afficher les éléments de réponse.
function addResult(id: string, content: string): void {
    let newP = document.createElement("p");
    let node = document.createTextNode(content);
    newP.appendChild(node);
    let element: HTMLElement | null
    element = document.getElementById(id);
    if (element != null) element.appendChild(newP)
}

function displayResults(id: string): void {
    let newH2 = document.createElement("h2");
    let node = document.createTextNode("Résultat");
    newH2.appendChild(node);
    let element: HTMLElement | null
    element = document.getElementById(id);
    let content = "Voici une estimation de vos points de mutation :"
    if (element != null) element.appendChild(newH2);
    addResult(id, content)
}



const checkboxes = document.querySelectorAll('select, input');
checkboxes.forEach(function (item) {
    item.addEventListener('click', calculMutation)
})