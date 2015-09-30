export default function(input) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = input;
    return tmp.textContent || tmp.innerText || "";
}
