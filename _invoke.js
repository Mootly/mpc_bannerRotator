/* ---------------------------------------------------------------------------- */
/*! --- Implementation Example Script ----------------------------------------- *
 * Copyright (c) 2023 Mootly Obviate -- See /LICENSE.md
 * ---------------------------------------------------------------------------- */
                    // Rotator variables                                        *
                    // All are optional if you want to use the defaults         *
const rot_container = 'rotator-set';
const rot_banner    = 'rotator-box';
const rot_tabs      = 'rotator-tab';
const rot_switch    = 'rotator-switch';
const rot_limit     = 0;
                    // All scripts in the mp namespace to avoid collisions.     *
let mp = {
  rotator: new mpc_bannerRotator(rot_container, rot_banner, rot_tabs, rot_switch, rot_limit),
  sticky: new mpc_sticky('sticky', 'layer', true),
//...
};
/* ---------------------------------------------------------------------------- */
