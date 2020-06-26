
//DOM
//querySelector / querySelectorAll
/*let links = document.querySelectorAll("a");

links.forEach(function(link) {
  console.log(link)}
)
;

let cells = document.querySelectorAll("td");

cells.forEach(function(td) {
  td.addEventListener('click',function(){
    console.log(this);
  })
});*/

let links = document.querySelectorAll(".close");

links.forEach(function(link) {
  //add click event
  link.addEventListener('click',function(ev){
    ev.preventDefault();
    let content = document.querySelector('.content');
    //remove class
    content.classList.remove("animate__animated");
    content.classList.remove("animate__fadeInDown");
    //add class
    content.classList.add("animate__animated");
    content.classList.add("animate__fadeOutUp");
    //set timer to execute
    setTimeout(function(){
      location.href = "../index.html";
    },600);
    return false;
  })
});


/*let icons = document.querySelectorAll("i");

  icons.forEach(function(icon){
    icon.classList.remove("fas");
    icon.classList.add("fas");
})
*/
