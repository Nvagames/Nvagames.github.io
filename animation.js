

function slideIn(element) {
    document.getElementById(element).style.display = 'block'

    document.getElementById(element).style.animation = 'slideIn 0.5s'

}

function slideOut(element) {
    document.getElementById(element).style.display = 'block'

    document.getElementById(element).style.animation = 'slideOut 0.5s'
    setTimeout(() => {
        document.getElementById(element).style.display = 'none'


    }, 490);
}
function movePage(from, to) {
    document.body.style.overflow = 'hidden'

    slideOut(from)
    slideIn(to)

    setTimeout(() => {

        document.body.style.overflow = 'auto'

    }, 500);
}
function moveBR2(from, to, json, element, ex) {
    document.body.style.overflow = 'hidden'
    if(document.getElementById(element)) {
        document.getElementById(element).remove()
    }
    

    let div = document.createElement('div')
    div.setAttribute('id', element, ex)
    document.getElementById('browse').appendChild(div)


    itemsAdd(json, element, true)


    slideOut(from)
    slideIn(to)  

    setTimeout(() => {

        document.body.style.overflow = 'auto'

    }, 500);

}

function albumMove(from, to, json, bg, typeurl) {
  if(bg) {

  }
  console.log(typeurl)
    document.body.style.overflow = 'hidden'
    if(document.getElementById('albumSongs')) {
        document.getElementById('albumSongs').remove()
    }
    if(document.getElementById('ALBUMSANDSTUFF')) {
    document.getElementById('ALBUMSANDSTUFF').remove()
    }
    let div = document.createElement('div')
    div.classList.add('SONGSCROLLER')
    div.setAttribute('id', 'albumSongs')
    div.classList.add('albumMenu')
    div.style.height = window.innerHeight - 90 + 'px'

    document.getElementById('albumPG').appendChild(div)
    slideOut(from)
    slideIn(to)
    
    if(typeurl) {
        itemsAdd2(json, 'albumSongs')

    } else {
     itemsAdd(json, 'albumSongs')
    }
    setTimeout(() => {
        
        document.body.style.overflow = 'auto'

    }, 550);

   
}
console.warn('Animation Loaded In But Must Be Called From Index.html')