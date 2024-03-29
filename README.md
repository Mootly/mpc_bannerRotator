# MoosePlum Banner Rotator Class

This is a simple carousel script. It does not include nor generate the HTML.

The carousel structure was meant to be reasonably accessible. The following assumptions are made in the code:

- There must be on/off button.
- There must be a way to limit the number of times the banner cycles.
- There is a menu of links to each item in the set of banner items. The original design has them styled as tabs across the bottom of the banner.
- Selecting a link to a banner item will stop the rotation and give focus to the corresponding item.
- Current banner items are swapped out by using classes. This leaves the developer free to style the rotator however they want.
- The script auto-disables for smaller screens: The default setting is 56em (896px). Small screen layouts will need to be styled accordingly.
- The IDs and classes of each link and banner item are related as below.

## Dependencies

Written for ES6.

This was written in TypeScript and exported to ES6 to allow support for browsers not yet up to the most recent ECMAScript standards.

## Assets

The files in this set are as follows:

| path                    | description
| ------------            | ------------
| LICENSE.md              | License notice ( [MIT](https://mit-license.org) ).
| README.md               | This document.
| mpc_rotator.ts          | The class definition in TypeScript.
| mpc_rotator.js          | The class definition in ES6.
| mpc_rotator.min.js      | Minified version.
| mpc_rotator.min.js.map  | Map file.
| _invoke.js              | Example implementation code.

## Installation

Download this repo, or just the script, and add it to the script library for your site.

This script has no external dependencies.

## Configuration

### Recommended HTML Code

The code was developed for a page with the following code.

```html
<div id="hero-banner" class="rotator">
  <p class="reader-only">Jump links for the rotating banner items.</p>
  <ul id="rotator-set">
    <li class="rotator-tab" id="rotator-tab-1">
      <a href="#rotator-box-1" id="rotator-link-1">Item 1</a>
    </li>
     ⋮
  </ul>
  <div id="rotator-switch">
    <span class="reader-only">toggle carousel</span>
  </div>
  <div id="rotator-box-1" class="rotator-box">
    <div class="hero-splash"></div>
    <div class="hero-content">Banner Item 1</div>
  </div>
   ⋮
</div>
```

### Notes on the HTML

Any `reader-only` elements are meant for text readers only and do not display on the screen.

The `hero-splash` elements are empty elements to receive CSS background image placement. This can also be done directly in the `hero-content` elements depending on your layout.

The IDs for the rotating elements are the same as the class for each with a number appended to the end, e.g. `id="rotator-box-1" class="rotator-box"`. The numbers MUST be sequential, starting with 1.

### Sample CSS

This only includes style rules relevant to the script and how it functions. The actual styling on the elements is entirely dependent on the implementation. A grid is recommended to keep the tabs together.

```css
// *** desktop and large screens ***
@media (min-width: _breakTablet_) {
  #hero-banner {
    z-index         : _defaultZIndex;
    #rotator-switch {
      z-index       : _rotZIndex_+10;
    }
    #rotator-set {
      display       : grid;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
      z-index       : _rotZindex_-10;
    }
    .rotator-box {
      z-index       : _rotZindex_;
      &.selected { z-index: _rotZindex_+1; }
    }
  }
}
// *** tablet and smaller *** disable and hide navigation tabs
@media (max-width: _breakTablet_) {
  #hero-banner #rotator-switch, #hero-banner #rotator-set { display: none; }
}
```

### Parameters

| name            | type        | default         | description
| ------------    | ----------  | ------------    | ------------
| pContainer      | string      | rotator-set     | ID of containing element for link list.
| pDisplayBox     | string      | rotator-box     | Class for banner items.
| pControlTab     | string      | rotator-tab     | Class of link associated with banner.
| pControlSwitch  | string      | rotator-switch  | ID of on/off switch for carousel.
| pMaxLoop        | number      | 0 (disabled)    | Number of times to loop.

### Coding Example

Use the `mp` namespace to help avoid collisions.

```js
const rot_container = 'rotator-set';
const rot_banner    = 'rotator-box';
const rot_tabs      = 'rotator-tab';
const rot_switch    = 'rotator-switch';
const rot_limit     = 0;
let mp = {
  rotator: new mpc_bannerRotator(rot_container, rot_banner, rot_tabs, rot_switch, rot_limit),
  ⋮
};

```
