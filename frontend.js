var isthemeopen = false;
var thememenuforstuff = document.getElementById('thememenu')
function thememenuinteract() {
    if(isthemeopen === true) {
        thememenuforstuff.style.opacity = 0
        mainmenutoggle()
        isthemeopen = false
        setTimeout(() => {
            thememenuforstuff.style.display = 'none'
        }, 450);
    } else {
        isthemeopen = true
        mainmenutoggle()
        thememenuforstuff.style.display = 'block'
        thememenuforstuff.style.opacity = 1

    }
    console.warn('note for me in the future: the theme menu has been toggled but theres no code to save the theme retard.')
}
var ismainopen = false;
var mainmenuelement = document.getElementById('MAINMENU')
var mainmenubg = document.getElementById('menucontainerbg')
var mainmenucontainer = document.getElementById('mainmenucontainer')
var widgetcontainer = document.getElementById('mainmenuwidget')

function mainmenutoggle() {
    if(ismainopen === true) {
        ismainopen = false
        mainmenubg.style.animation = "mainmenubgouy 0.5s"
        document.body.style.overflow = 'auto'
        mainmenubg.style.opacity = 0
        widgetcontainer.style.opacity = 0


        widgetcontainer.style.animation = ''


        widgetcontainer.style.animation = 'widgetout 0.5s'

        setTimeout(() => {
            mainmenuelement.style.animation = "mainmenuout 0.4s"

            mainmenuelement.style.opacity = 0
            setTimeout(() => {
                widgetcontainer.style.opacity = 1

                widgetcontainer.style.animation = ''


                mainmenucontainer.style.display = 'none'
            }, 350);
        }, 600);
    } else {
        ismainopen = true
        mainmenucontainer.style.display = 'block'
        document.body.style.overflow = 'hidden'
        widgetcontainer.style.opacity = 0

        mainmenuelement.style.animation = "mainmenuin 0.5s"

        mainmenuelement.style.opacity = 1
        setTimeout(() => {
            widgetcontainer.style.opacity = 1

            widgetcontainer.style.animation = 'widgetin 0.5s'

            mainmenubg.style.animation = "mainmenubgin 0.5s"

            mainmenubg.style.opacity = 1
        }, 600);
    }
}
