function searchPrimo() {
    console.log("HELLO");
    document.getElementById("primoQuery").value = "any,contains," + document.getElementById("primoQueryTemp").value;
    console.log(document.getElementById("primoQueryTemp").value)
    document.forms["searchForm"].submit();
}
