$(document).ready( () => {

    id = 0;
    genreSelected ="";
    bookSelected = "";
    
    // Class used to store books
    class Book {
        // class constructor
        constructor(name, desc, isbn, author, publisher, review)
        {
            this.bookId = ++id;
            this.name = name;
            this.desc = desc;
            this.isbn = isbn;
            this.author = author;
            this.publisher = publisher;
            this.review = review;
        }
    }

    // Function to perform ajax call
    function retrieveJSON() {
    // ajax Call
    $.get({
        url: "./jsons/books.json",
        dataType: "json",
        success: parseJSON
        });
    }

    // take the data from the ajax call and add it to local storage
    function parseJSON(data) {
        localStorage.clear();
        $.each(data['bookobject'], (key, val) => {
            let i = 0;
            let books = [];
            let value = "";
            $.each(val['Books'], (key2, val2) => {
                let book = new Book(val2['name'], val2['description'], val2['ISBN'], val2['author'], val2['publisher'], val2['personalreview']);
                books[i] = book;
                i++;
            });
            $.each(books, (key3, val3) => {
                localStorage.setItem(val['genre'], JSON.stringify(books));
            });
         });
         id = 0;
         $("#errors").html("Data was successfully retrieved!");

    }

    // event listener for Retrieve Data Button
    $('#getJSON').click( () => {
        $("#genreList").attr('hidden');
        retrieveJSON();
     });

     // event listener for List genre button
    $('#listGenre').click( () => {
        if(localStorage.length < 1)
        {
            $("#errors").html("");
            $("#errors").html("Error. <br> Data has not yet been retrieved <br> Please Retrieve Data first.");
        }
        else
        {
            $("#errors").html("");
            listGenres();
            $("#genreList").listview();
            $("#listSpace").listview();
        }
     });

     
     function listGenres(){
        $("#errors").html("");
        $("#errors").attr('hidden');
        $("#genreList").removeAttr('hidden');
            for(let k = 0; k <= localStorage.length; k++)
                {
                    $(`#${k}`).html(`${localStorage.key(k)}`);
                }
     }

     $('#0').on("click", ()=> {
        $("#error2").html("");
        $("#bookDetailMain").removeAttr('hidden');
        genreSelected = 'SciFi';
        $("#selectedGenre").html(genreSelected);
        loadBooks(genreSelected);
        $(":mobile-pagecontainer").pagecontainer("change","#bookDetailPage",
        {transition:"flip"});
     });

     $('#1').on("click", ()=> {
        $("#error2").html("");
        $("#bookDetailMain").removeAttr('hidden');
        genreSelected = 'Fantasy';
        $("#selectedGenre").html("Genre: " + genreSelected);
        loadBooks(genreSelected);
        $(":mobile-pagecontainer").pagecontainer("change","#bookDetailPage",
        {transition:"flip"});
     });

     $('#2').on("click", ()=> {
        $("#error2").html("");
        $("#bookDetailMain").removeAttr('hidden');
        genreSelected = 'Mystery';
        $("#selectedGenre").html("Genre: " + genreSelected);
        loadBooks(genreSelected);
        $(":mobile-pagecontainer").pagecontainer("change","#bookDetailPage",
        {transition:"flip"});
     });

     function loadBooks(genreChoice)
     {
        $("#footerh2").html("wyrobap / " + genreChoice);
        let books = JSON.parse(localStorage.getItem(`${genreChoice}`));
        listBooks(books);
     }

     function listBooks(books){
            for(let k = 3; k < books.length+3; k++)
                {
                    $(`#${k}`).html("");
                    let m= k-3;
                    $(`#${k}`).append(`
                    <h4>${books[m].name}</h4>
                    <li>Author: ${books[m].author}</li>
                    <li>${books[m].desc}</li>
                    <li>Publisher: ${books[m].publisher}</li>
                    <li>ISBN: ${books[m].isbn}</li>
                    `);
                }
     }

     $('#3').on("click", ()=> {
        bookSelected = 0;
        doReview(bookSelected);
     });
     $('#4').on("click", ()=> {
        bookSelected = 1;
        doReview(bookSelected);
     });
     $('#5').on("click", ()=> {
        bookSelected = 2;
        doReview(bookSelected);
        
     });

     function doReview(bookSelected){
        let theseBooks = JSON.parse(localStorage.getItem(genreSelected));
        $("#bookTitle").html(`${theseBooks[bookSelected].name}`);
        $("#footerRev").html(`<strong>${theseBooks[bookSelected].name} / ${theseBooks[bookSelected].desc}</strong>`);
        $("#reviewHere").html(`${theseBooks[bookSelected].review}`);
     }
});