sendButton.addEventListener("click", () => {
    alert("You Clicked Me");
    question = document.getElementById("question").value;
    document.getElementById("question").value = "";
    document.querySelector("right2").style.display = "block";
    document.querySelector("right1").style.display = "none";
})