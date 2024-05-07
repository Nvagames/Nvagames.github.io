function handleStyleSheetLoad(stylesheetId, callback) {
    var stylesheet = document.getElementById(stylesheetId);
    if (stylesheet) {
        if (stylesheet.readyState === 'complete') {
            console.log("Stylesheet with ID '" + stylesheetId + "' already loaded.");
            callback(true);
        } else {
            stylesheet.onload = stylesheet.onerror = function() {
                console.log("Stylesheet with ID '" + stylesheetId + "' loaded.");
                callback(!stylesheet.readyState || stylesheet.readyState === 'complete');
            };
        }
    } else {
        console.error("Stylesheet with ID '" + stylesheetId + "' not found.");
        callback(false);
    }
}



function showLoad(typeLoad, text, target, type) {
    document.getElementById('loadingScreen').style.opacity = 1

    document.getElementById('loadingScreen').style.display = 'block'

    document.getElementById('loadingScreen').style.animation = "showload 0.5s"
        if (type === "stylesheet") {
            //handleStyleSheetLoad(target, function(isLoaded) {
                //if (isLoaded) {
                    console.log('Stylesheet loaded');
                    setTimeout(() => {
                        document.getElementById('loadingScreen').style.animation = "hideload 0.5s"

                        setTimeout(() => {
                            document.getElementById('loadingScreen').style.display = 'none'
                        }, 450);
                        
                    
                    }, 1500);
               // } else {
                   // console.error('Failed to load stylesheet');
               // }
           // });
        } else {
            console.error("Unsupported type: " + type);
        }
    
    
}
var bgnavop = document.getElementById('iconscontainerbg')
var mainmenuicon = document.getElementById('menuicontop')

//mainmenuicon.addEventListener('mouseover', handlenavop('mainmenu', true))
//mainmenuicon.addEventListener('mouseout', handlenavop('mainmenu', false))
var last;
function handlenavop(option, ac) {
    if(last === ac) {
        bgnavop.opacity = 0
        console.log('switch')
    }
    last = ac
    if(ac===true) {
        if(option==='mainmenu') {
            console.log('in')
            //bgnavop.style.background = 'linear-gradient(to left, #454545, #454545, transparent, transparent)'
            bgnavop.style.opacity = 0
            bgnavop.style.background = 'linear-gradient(to left, black, black, transparent, transparent)'
            bgnavop.style.opacity = 1
        } 
        if(option==='translate') {
            console.log('in')
            bgnavop.style.opacity = 0
            bgnavop.style.background = 'linear-gradient(to left, #454545, #454545, #454545, transparent, transparent)'
            //bgnavop.style.background = 'linear-gradient(to left, black, black, transparent, transparent)'
            bgnavop.style.opacity = 1
        }

    } else {
        console.log('out')
        bgnavop.style.opacity = 0
    }
    
}