const drkModeBtn = document.querySelector('.darkmode__button');
const drkModeBtnContainer = document.getElementById('darkmodeButton');
let drkModeOn = true;

drkModeBtn.addEventListener('click', () => {
  if (drkModeOn) {
    sessionStorage.setItem('darkmode', false);
    drkModeBtn.style.transition = 'transform 0.3s ease-in-out';
    drkModeBtn.style.transform = 'translateX( -20px)';
    document.documentElement.style.setProperty('--mainBg', '#F0F0F0');
    document.documentElement.style.setProperty('--charColor', '#515151');
    document.documentElement.style.setProperty('--drkBtnBg', '#E1E1E4');
    document.documentElement.style.setProperty('--cardColor', '#ffffff');
    document.documentElement.style.setProperty('--platformColor', '#515151');
    document.documentElement.style.setProperty('--listStyleOnBg', '#939393');
    document.documentElement.style.setProperty('--listStyleOffBg', '#D8D8D8');
  } else if (!drkModeOn) {
    sessionStorage.setItem('darkmode', true);
    drkModeBtn.style.transition = 'transform 0.3s ease-in-out';
    drkModeBtn.style.transform = 'translateX( 0px)';
    document.documentElement.style.setProperty('--mainBg', '#141414');
    document.documentElement.style.setProperty('--charColor', '#ffffff');
    document.documentElement.style.setProperty('--drkBtnBg', '#5f81fb');
    document.documentElement.style.setProperty('--cardColor', '#303030');
    document.documentElement.style.setProperty('--platformColor', '#ffffff');
    document.documentElement.style.setProperty('--listStyleOnBg', '#515151');
    document.documentElement.style.setProperty('--listStyleOffBg', '#303030');
  }

  drkModeOn = !drkModeOn;
});
