window.onload = function () {
  'use strict';

  var socket = io.connect("/");
  
  // DROPDOWN MENU
  var playerDropdown = document.getElementById('playerDropdown');
  if (playerDropdown){
    var playerInputFields = document.getElementsByClassName('playerInput');
    var playerDropdownItems = playerDropdown.getElementsByTagName('li');
    var playerInputValue = null;
    var str, id, n, i, t, matches, currentInputField;
    for (i = 0; i < playerDropdownItems.length; i++) {
      playerDropdownItems[i].addEventListener("click", function(event){
        str = this.innerHTML;
        this.id = event.srcElement.id;
        document.getElementById('p'+currentInputField.id).value = this.id;
        currentInputField.value = str;
      });
    }
    for (i = 0; i < playerInputFields.length; i++) {
      playerInputFields[i].addEventListener("keyup", function(){
        if (document.getElementById('p'+currentInputField.id).value) {
          document.getElementById('p'+currentInputField.id).value = '';
        }
        playerInputValue = this.value;
        if (playerInputValue){
          playerDropdown.style.display = "block";
          matches = 0;
          for (t = 0; t < playerDropdownItems.length; t++) {
            playerDropdownItems[t].style.display = "none";
            str = playerDropdownItems[t].innerHTML.toUpperCase();
            n = str.search(playerInputValue.toUpperCase()) + 1;
            if (n > 0){
              matches++;
              playerDropdownItems[t].style.display = "block";
            }
          }
          if (!matches) {
            playerDropdown.style.display = "none";
          }
        } else {
          playerDropdown.style.display = "none";
        }
      });
      playerInputFields[i].addEventListener("blur", function(){
        if (!document.getElementById('p'+currentInputField.id).value) {
          currentInputField.value = "";
        }
        setTimeout(function(){
          playerDropdown.style.display = "none";
        }, 10);
      });
      playerInputFields[i].addEventListener("focus", function(){
        currentInputField = this;
        this.parentNode.appendChild(playerDropdown);
        for (t = 0; t < playerDropdownItems.length; t++) {
          playerDropdownItems[t].style.display = "none";
        }
      });
    }
  }

  var formatie = document.getElementById('formatie');
  var field = document.getElementById('field');
  if (formatie){
    formatie.addEventListener("change", function(){
      var optie = this.options[this.selectedIndex].innerHTML;
      field.className = 'f'+optie;
    });
  }

  /* IO dingen  */

  socket.on("connect", function(){
    console.log("Connected!");
    socket.emit("message", {message: "Yay!", level: "important"})
  })

  socket.on("welcome", function(msg){
    console.log("Welcome:", msg);
  })

  socket.on("message", function(data){
    console.log("message", data);
  })
}