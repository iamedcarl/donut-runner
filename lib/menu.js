class Menu {
  constructor(game) {
    this.game = game;

    this.setMenuButtonListeners();
  }

  closeMainMenu() {
    const menu = document.getElementsByClassName('menu')[0];
    menu.className = 'menu close';
  }

  setMenuButtonListeners() {
    this.playButton = document.getElementById('play-button');
    this.playButton.addEventListener('click', e => {
      this.closeMainMenu();
      setTimeout(() => this.game.start(), 500);
    });
  }

  openMainMenu() {
    const menu = document.getElementsByClassName('menu')[0];
    menu.className = 'menu';
  }


}

export default Menu;
