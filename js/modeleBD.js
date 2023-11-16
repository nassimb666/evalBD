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

    searchButton.addEventListener('click', function () {
        var authorName = searchAuthorInput.value.trim().toLowerCase();

        // Filtrer les œuvres de l'auteur
        var authorWorks = Array.from(albums.values()).filter(function (album) {
            var author = auteurs.get(album.idAuteur);
            return author && author.nom.toLowerCase() === authorName;
        });

        // Afficher les œuvres de l'auteur dans des cards
        displayAuthorWorks(authorWorks);
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
        var serie = albums.get(work.idSerie);
    
        // Vérifie si la série existe avant d'accéder à ses propriétés
        seriesElement.textContent = serie ? "Série : " + serie.nom : "Série : Inconnue";
    
        var number = document.createElement('p');
        number.className = 'card-text';
        number.textContent = "Numéro : " + work.numero;
    
        var price = document.createElement('p');
        price.className = 'card-text';
        price.textContent = "Prix : " + work.prix + " €";
    
        cardBody.appendChild(title);
        cardBody.appendChild(seriesElement);
        cardBody.appendChild(number);
        cardBody.appendChild(price);
    
        card.appendChild(cardBody);
    
        return card;
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
});
