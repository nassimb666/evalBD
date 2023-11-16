

document.addEventListener('DOMContentLoaded', function () {
    const srcImg = "images/";
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/";
    const srcAlbum = "albums/";

    var txtSerie = document.getElementById("serie");
    var txtNumero = document.getElementById("numero");
    var txtTitre = document.getElementById("titre");
    var txtAuteur = document.getElementById("auteur");
    var txtPrix = document.getElementById("prix");
    var imgAlbum = document.getElementById("album");
    var imgAlbumMini = document.getElementById("albumMini");
    var id = document.getElementById("id");

    var tableBody = document.getElementById('tableBody');
    var showAllButton = document.getElementById('showAllButton');
    var isListeVisible = false;
    var searchAuthorInput = document.getElementById('searchAuthor');
    var searchButton = document.getElementById('searchButton');
    var authorWorksContainer = document.getElementById('authorWorks');
    var panierListeModal = document.getElementById('panier-liste-modal');
    var totalPanierModal = document.getElementById('total-panier-modal');

    searchButton.addEventListener('click', function () {
        var searchValue = searchAuthorInput.value.trim().toLowerCase();

        // Filtrer les œuvres par nom d'œuvre ou nom d'auteur
        var filteredWorks = Array.from(albums.values()).filter(function (work) {
            var author = auteurs.get(work.idAuteur);
            return (
                (work.titre.toLowerCase().includes(searchValue)) ||
                (author && author.nom.toLowerCase().includes(searchValue))
            );
        });

        // Afficher les œuvres dans des cards
        displayAuthorWorks(filteredWorks);
    });

    function displayAuthorWorks(works) {
        // Effacer le contenu actuel
        authorWorksContainer.innerHTML = "";

        // Afficher les œuvres dans des cards
        works.forEach(function (work) {
            var card = createWorkCard(work);
            authorWorksContainer.appendChild(card);
        });
    }

    function createWorkCard(work) {
        var card = document.createElement('div');
        card.className = 'card';

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = work.titre;

        var seriesElement = document.createElement('p');
        seriesElement.className = 'card-text';

        // Recherche de la série correspondante dans la Map des séries
        var serie = series.get(work.idSerie); // Utiliser la variable globale series
        console.log(series.get(work.idSerie));
        seriesElement.textContent = serie ? "Série : " + serie.nom : "";

        var number = document.createElement('p');
        number.className = 'card-text';
        number.textContent = "Numéro : " + work.numero;

        var price = document.createElement('p');
        price.className = 'card-text';
        price.textContent = "Prix : " + work.prix + " €";
        var addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Ajouter au panier';
        addToCartButton.addEventListener('click', function () {
            addToCart(work);
            console.log(work);
        });

        cardBody.appendChild(addToCartButton);

        cardBody.appendChild(title);
        cardBody.appendChild(seriesElement);
        cardBody.appendChild(number);
        cardBody.appendChild(price);

        card.appendChild(cardBody);

        return card;
    }

    var panier = [];

    var panierListe = document.getElementById('panier-liste');
    var totalPanier = document.getElementById('total-panier');
    var panier = []; // Array pour stocker les éléments du panier

    function addToCart(work) {
        // Vérifiez si l'article est déjà dans le panier
        var existingItem = panier.findIndex(item => item.work.numero === work.numero);

        console.log(existingItem);
        if (existingItem !== -1) {
            // Si l'article est déjà dans le panier, mettez à jour la quantité
            panier[existingItem].quantity++;
        } else {
            // Sinon, ajoutez un nouvel élément au panier
            panier.push({ work, quantity: 1 });
        }

        // Mettez à jour l'affichage du panier
        displayCart();
    }

    function displayCart() {
        // Effacez le contenu actuel du panier
        panierListeModal.innerHTML = '';

        console.log(panier)
        // Affichez chaque élément du panier
        panier.forEach(item => {
            var listItem = document.createElement('li');
            listItem.textContent = `${item.work.titre} - Quantité : ${item.quantity}`;
            panierListeModal.appendChild(listItem);
        });

        // Calculez et affichez le total du panier
        var total = panier.reduce((acc, item) => acc + item.work.prix * item.quantity, 0);
        totalPanierModal.textContent = total;
    }

    imgAlbum.addEventListener("error", function () {
        prbImg(this);
    });

    imgAlbumMini.addEventListener("error", function () {
        prbImg(this);
    });

    id.addEventListener("change", function () {
        getAlbum(this);
    });

    showAllButton.addEventListener('click', function () {
        if (isListeVisible) {
            // Si la liste est déjà visible, on la cache
            tableBody.innerHTML = "";
            isListeVisible = false;
        } else {
            // Sinon, on l'affiche
            afficherTousLesAuteurs();
            isListeVisible = true;
        }
    });

    function getAlbum(num) {
        var album = albums.get(num.value);

        if (album === undefined) {
            txtSerie.value = "";
            txtNumero.value = "";
            txtTitre.value = "";
            txtAuteur.value = "";
            txtPrix.value = 0;

            afficheAlbums(imgAlbumMini, imgAlbum, albumDefaultMini, albumDefault);
        } else {
            var serie = series.get(album.idSerie);
            var auteur = auteurs.get(album.idAuteur);

            txtSerie.value = serie ? serie.nom : "";
            txtNumero.value = album.numero;
            txtTitre.value = album.titre;
            txtAuteur.value = auteur ? auteur.nom : "";
            txtPrix.value = album.prix;

            var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
            nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

            afficheAlbums(
                imgAlbumMini,
                imgAlbum,
                srcAlbumMini + nomFic + ".jpg",
                srcAlbum + nomFic + ".jpg"
            );
        }
    }

    function afficheAlbums(albumMini, album, nomFicMini, nomFic) {
        album.src = nomFic;
        albumMini.src = nomFicMini;
        album.style.display = "block";
        albumMini.style.display = "block";
    }

    function prbImg(element) {
        if (element.id === "albumMini") {
            element.src = albumDefaultMini;
        } else {
            element.src = albumDefault;
        }
    }

    var btns = document.querySelectorAll('.btn');
    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (this.id == 'all') {
                afficherTousLesAuteurs();
                isListeVisible = true;
            } else {
                var authorId = this.id;
                cacherTousLesAuteursSaufUn(authorId);
                isListeVisible = false;
            }

            btns.forEach(function (btn) {
                btn.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    function afficherTousLesAuteurs() {
        // Supprimer les lignes existantes dans le tableau
        tableBody.innerHTML = "";

        // Ajouter les noms d'auteurs au tableau
        auteurs.forEach(function (auteur, idAuteur) {
            var tableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            tableData.textContent = auteur.nom;
            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);
        });
    }

    function cacherTousLesAuteursSaufUn(authorId) {
        var auteursDivs = document.querySelectorAll('.auteur');
        auteursDivs.forEach(function (auteurDiv) {
            if (auteurDiv.id !== authorId) {
                auteurDiv.style.display = "none";
            } else {
                auteurDiv.style.display = "block";
            }
        });
    }

    function removeFromCart(work) {
        // Retirez un article du panier
        var existingItem = panier.find(item => item.work.id === work.id);
    
        if (existingItem) {
            existingItem.quantity--;
    
            if (existingItem.quantity === 0) {
                // Si la quantité atteint 0, retirez complètement l'article du panier
                panier = panier.filter(item => item.work.id !== work.id);
            }
        }
    
        // Mettez à jour l'affichage du panier
        displayCart();
    }
    
    function viderPanier() {
        // Vide complètement le panier
        panier = [];
    
        // Mettez à jour l'affichage du panier
        displayCart();
    }
    
});
