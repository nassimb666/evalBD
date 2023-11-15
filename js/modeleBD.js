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

    imgAlbum.addEventListener("error", function () {
        prbImg(this);
    });

    imgAlbumMini.addEventListener("error", function () {
        prbImg(this);
    });

    id.addEventListener("change", function () {
        getAlbum(this);
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

            txtSerie.value = serie.nom;
            txtNumero.value = album.numero;
            txtTitre.value = album.titre;
            txtAuteur.value = auteur.nom;
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
            } else {
                var authorId = this.id;
                cacherTousLesAuteursSaufUn(authorId);
            }

            btns.forEach(function (btn) {
                btn.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    document.getElementById('showAllButton').addEventListener('click', function () {
        afficherTousLesAuteurs();
    });

    function afficherTousLesAuteurs() {
        var parent = document.getElementById('parent');
        var tableContainer = document.getElementById('tableContainer');
        var tableBody = document.getElementById('tableBody');

        // Supprimer les noms d'auteurs s'ils sont déjà affichés
        parent.innerHTML = "";
        tableBody.innerHTML = "";
        btns.forEach(function (btn) {
            btn.classList.remove('active');
        });

        // Ajouter les noms d'auteurs à la liste et au tableau
        auteurs.forEach(function (auteur, idAuteur) {
            var auteurDiv = document.createElement('div');
            auteurDiv.id = idAuteur;
            auteurDiv.className = 'auteur';
            auteurDiv.textContent = auteur.nom;
            parent.appendChild(auteurDiv);

            // Ajouter une ligne au tableau
            var tableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            tableData.textContent = auteur.nom;
            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);
        });

        document.getElementById('showAllButton').classList.add('active');

        parent.style.display = "block";
        tableContainer.style.display = "block";
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
