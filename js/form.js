function validateForm() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var cguCheckbox = document.getElementById('cgu');
    var newsletterCheckbox = document.getElementById('newsletter');
    var errorMessage = document.getElementById('errorMessage');

    if (password !== confirmPassword) {
        errorMessage.textContent = "Les mots de passe ne correspondent pas.";
    } else if (!cguCheckbox.checked) {
        errorMessage.textContent = "Veuillez accepter les CGU.";
    } else {
        errorMessage.textContent = "";
        alert("Formulaire envoyé avec succès!\nNom d'utilisateur: " + username +
            "\nE-mail: " + email +
            "\nMot de passe: " + password +
            "\nAbonnement newsletter: " + (newsletterCheckbox.checked ? "Oui" : "Non"));
    }
}