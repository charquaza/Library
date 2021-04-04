(function startLibraryApp() {

    var library = [];

    var libraryElement = document.querySelector(".library");
    var addBookForm = document.querySelector(".add-book-form");
    var addBookBtn = document.querySelector(".add-book");
    var addToLibBtn = document.querySelector(".add-to-lib");

    function Book(title, author, pages, read = "not yet read") {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    function displayBook(book) {
        var bookContainer = document.createElement("tr");
        bookContainer.setAttribute("data-index", library.length - 1);

        var bookTemplate = document.querySelector("#book-template").innerHTML;
        var bookTemplateScript = Handlebars.compile(bookTemplate);
        var bookElement = bookTemplateScript(book);
        bookContainer.innerHTML = bookElement;

        var removeBookBtn = bookContainer.querySelector(".remove-book");
        removeBookBtn.addEventListener("click", removeBook);

        var changeReadStatusBtn = bookContainer.querySelector(".change-read-status");
        changeReadStatusBtn.addEventListener("click", changeReadStatus);

        libraryElement.appendChild(bookContainer);
    }

    function toggleBookForm() {
        addBookForm.classList.toggle("hide-form");
        addBookBtn.toggleAttribute("disabled");
    }

    function processBookForm() {
        var titleInput = document.querySelector("input#title");
        var authorInput = document.querySelector("input#author");
        var pagesInput = document.querySelector("input#pages");
        var yesInput = document.querySelector("input#yes");
        var noInput = document.querySelector("input#no");

        var read = yesInput.checked ? "yes" : "not yet read";

        var book = new Book(titleInput.value, authorInput.value, pagesInput.value, read);
        library.push(book);
        displayBook(book);

        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        yesInput.checked = false;
        noInput.checked = false;
        toggleBookForm();
    }

    function removeBook(click) {
        var bookToRemove = click.target.parentNode.parentNode;
        var indexToRemove = bookToRemove.getAttribute("data-index");

        library.splice(indexToRemove, 1);

        updateDataIndexAttributes(indexToRemove);

        libraryElement.removeChild(bookToRemove);
    }

    function changeReadStatus(click) {
        var readStatusElement = click.target.parentNode.previousElementSibling;
        var bookElement = readStatusElement.parentNode;
        var indexToUpdate = Number(bookElement.getAttribute("data-index"));
        var bookToUpdate = library[indexToUpdate];

        bookToUpdate.read = (bookToUpdate.read === "yes") ?
            "not yet read" : "yes";
        
        readStatusElement.textContent = bookToUpdate.read;
    }

    function updateDataIndexAttributes(startIndex) {
        var booksToUpdate = document.querySelectorAll(
            `[data-index="${startIndex}"] ~ *`
        );
        booksToUpdate.forEach(function decrementDataIndex(bookElement) {
            bookElement.setAttribute("data-index", startIndex);
            startIndex++;
        });
    }


    addBookBtn.addEventListener("click", toggleBookForm);
    addToLibBtn.addEventListener("click", processBookForm);
    
})();
