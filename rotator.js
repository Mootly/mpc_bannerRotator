/** --- Banner Rotator - aka, Carousel ---------------------------------------- *
 * mpc_bannerRotator 1.0.0
 * @copyright 2023 Mootly Obviate -- See /LICENSE.md
 * @license   MIT
 * @version   1.0.0
 * ---------------------------------------------------------------------------- *
 * Swap banners as a carousel in a defined region of the page.
 * ---------------------------------------------------------------------------- *
 * Assumptions and Features:
 *  - There is an on/off button.
 *  - A rotatiom limit can be set.
 *  - There are tabs or links for each banner that will stop the rotation and
 *    give focus to the corresponding banner.
 *  - The IDs and classes of each tab and banner are related:
 *    If banner element has a class of 'rotAd', then the ID is 'rotAd-#',
 *    where # is the current number of the element in sequence.
 *  - Script only adds and removes classes.
 *  - Script does not run for smaller screens.
 * ---
 * Constructor arguments:
 *   pContainer     : string  : ID of containing element for link list.
 *   pDisplayBox    : string  : Class of banner items.
 *   pControlTab    : string  : Class of links associated with banner items.
 *   pControlSwitch : string  : ID of on/off switch for carousel.
 *   pMaxLoop       : number  : Number of times to loop.
 *                              Default = 0, loop endlessly
 * *
 * Notes:
 *   This was created to maximize accessibility of a carousel without
 *   creating something overly complex.
 *   The page it was written for uses z-index stacking for featured elements,
 *   so all elements should still visible to a text reader.
 *   The tabs or links are meant to make it clear that there is more
 *   on the carousel than currently displayed.
 * *** Initialize - Example --------------------------------------------------- *
 * let mp = {
 *   rotator: new mpc_bannerRotator(container ID, box class, tab class, switch ID),
 *   ...
 * };
 * --- Revision History ------------------------------------------------------- *
 * 2023-12-04 | Version 1.0.0 completed
 * ---------------------------------------------------------------------------- */
class mpc_bannerRotator {
  constructor(
    pContainer      = 'rotator-set',
    pDisplayBox     = 'rotator-box',
    pControlTab     = 'rotator-tab',
    pControlSwitch  = 'rotator-switch',
    pMaxLoop        = 0
  ) {
    this.containerID = pContainer;
    this.container  = document.getElementById(this.containerID);
    this.boxCurr    = pDisplayBox + '-1';
    this.box        = document.getElementById(this.boxCurr);
    this.tabCurr    = pControlTab + '-1';
    this.tab        = document.getElementById(this.tabCurr);
    this.controlID  = pControlSwitch;
    this.control    = document.getElementById(this.controlID);
                    // Do not continue if any required elements missing.        *
    if (this.container && this.box && this.tab && this.control) {
      this.count    = this.container.getElementsByTagName('li').length;
      this.limit    = this.count * pMaxLoop;
      this.counter  = 0;
                    // add listener for all tabs - bubble up                    *
      this.container.addEventListener('click', (el) => {
        this.stopBanner(el.target.id.slice(-1));
      });
      this.control.addEventListener('click', () => this.stopBanner(-1));
                    // disable rotator for small screens                        *
      const desktop = window.matchMedia('(min-width: 56em)');
      if (desktop.matches) {
        this.interval = setInterval(() => { this.rotateBanner(); }, 7500);
      }
      desktop.onchange = (el) => {
        if (el.matches) {
          this.interval = setInterval(() => { this.rotateBanner(); }, 7500);
        } else {
          clearInterval(this.interval);
        }
      };
    }
  }
                    // trigger this one on interval                             *
  rotateBanner() {
    let pos_curr = parseInt(this.boxCurr.slice(-1));
    let pos_new = (pos_curr < this.count) ? pos_curr + 1 : 1;
    if (this.limit && this.limit > this.counter) {
      this.counter++;
      this.popitup(pos_new);
    } else {
      this.stopBanner(pos_new);
    }
  }
                    // trigger this one on click                                *
  stopBanner(pos_new) {
    if (pos_new > 0) {
      clearInterval(this.interval);
      this.popitup(pos_new);
      this.control.classList.remove('rot-pause');
      this.control.classList.add('rot-play');
    } else if (this.control.classList.contains('rot-pause')) {
      clearInterval(this.interval);
      this.control.classList.remove('rot-pause');
      this.control.classList.add('rot-play');
    } else {
      this.interval = setInterval(() => { this.rotateBanner(); }, 7500);
      this.control.classList.remove('rot-play');
      this.control.classList.add('rot-pause');
    }
  }
                    // call from the above two, not directly                    *
  popitup(pos_new) {
    let tab_new     = this.tabCurr.replace(/\d$/, pos_new);
    let box_new     = this.boxCurr.replace(/\d$/, pos_new);
    if (this.tabCurr != tab_new) {
      document.getElementById(tab_new)?.classList.add('selected');
      document.getElementById(box_new)?.classList.add('selected');
      document.getElementById(this.boxCurr)?.classList.remove('selected');
      document.getElementById(this.tabCurr)?.classList.remove('selected');
      this.boxCurr  = box_new;
      this.tabCurr  = tab_new;
    }
  }
}
/*! --- Copyright (c) 2023 Mootly Obviate -- See /LICENSE.md ------------------ */
