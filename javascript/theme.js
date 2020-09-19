const html = document.getElementsByTagName('html')[0];
const themeButton = document.getElementById('switchTheme');
const themeIcon = document.getElementById('themeIcon');

let lightTheme = true;

let winState = {
    winCombo: [],
    token: '',
    current: false
}

let colors = {
    background_l: '#f5f5f5',
    background_d: '#17223b',
    contrast_l: 'black',
    contrast_d: 'white',
    component_l: 'white',
    component_d: '#263859',
    hover_l: 'rgba(0, 0, 0, 0.1)',
    hover_d: 'rgba(255, 255, 255, 0.1)',
};

let contrastColor = colors.contrast_l;
let componentColor = colors.component_l;

const switchTheme = () => {
    lightTheme = !lightTheme;
    themeButton.classList.toggle('right');
    themeIcon.classList.toggle('fa-sun-o');
    themeIcon.classList.toggle('fa-moon-o');
    if (lightTheme) {
        html.style.setProperty('--background', colors.background_l);
        html.style.setProperty('--contrast', colors.contrast_l);
        html.style.setProperty('--component', colors.component_l);
        html.style.setProperty('--hover', colors.hover_l);
        contrastColor = colors.contrast_l;
        componentColor = colors.component_l;
    } else {
        html.style.setProperty('--background', colors.background_d);
        html.style.setProperty('--contrast', colors.contrast_d);
        html.style.setProperty('--component', colors.component_d);
        html.style.setProperty('--hover', colors.hover_d);
        contrastColor = colors.contrast_d;
        componentColor = colors.component_d;
    }
    gameBoard.drawBoard();
    gameBoard.drawTokens();
    if (winState.current) {
        gameBoard.drawWinLine(winState.winCombo, winState.token);
    }
};