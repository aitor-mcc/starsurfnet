
function loadEnlarge(){
    // Add the modal HTML
    const modalHTML = `
    <div id="myModal" class="modal">
        <span class="close">×</span>
        <img class="modal-content" id="img01">
        <div id="caption"></div>
    </div>`;
    
    document.getElementById('enlarge_script').innerHTML = modalHTML;
    
    // Now run the JavaScript
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    
    span.onclick = function() { 
        modal.style.display = "none";
    }
    
    var images = document.querySelectorAll('.image-container img');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            // Get caption from data-caption attribute
            if (this.dataset.caption) {
                captionText.innerHTML = this.dataset.caption;
            } else {
                captionText.innerHTML = "";
            }
        }
    }
}