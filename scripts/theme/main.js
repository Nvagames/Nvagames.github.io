var mainstylehead = document.getElementById('mainstylehead');

function getTheme() {

}

function changetheme(option) {
    showLoad('load', 'none', 'mainstylehead', 'stylesheet')
    if(option === 'def') {
        mainstylehead.href = './main.css'; 
    } else if(option === 'purpleish') {
        mainstylehead.href = './main-styleA.css'; 
    } else if(option === 'blueish') {
        mainstylehead.href = './themes/main-styleB.css'; 
    }
}