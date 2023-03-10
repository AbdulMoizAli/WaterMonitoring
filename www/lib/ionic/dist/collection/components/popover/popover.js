/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Component, Element, Event, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { getIonMode } from '../../global/ionic-global';
import { CoreDelegate, attachComponent, detachComponent } from '../../utils/framework-delegate';
import { addEventListener, raf } from '../../utils/helpers';
import { BACKDROP, dismiss, eventMethod, focusFirstDescendant, prepareOverlay, present } from '../../utils/overlays';
import { isPlatform } from '../../utils/platform';
import { getClassMap } from '../../utils/theme';
import { deepReady } from '../../utils/transition';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
import { configureDismissInteraction, configureKeyboardInteraction, configureTriggerInteraction } from './utils';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed inside of the `.popover-content` element.
 *
 * @part backdrop - The `ion-backdrop` element.
 * @part arrow - The arrow that points to the reference element. Only applies on `ios` mode.
 * @part content - The wrapper element for the default slot.
 */
export class Popover {
  constructor() {
    this.parentPopover = null;
    this.popoverIndex = popoverIds++;
    this.coreDelegate = CoreDelegate();
    this.inline = false;
    this.focusDescendantOnPresent = false;
    this.presented = false;
    /** @internal */
    this.hasController = false;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    this.keyboardClose = true;
    /**
     * If `true`, the popover will be dismissed when the backdrop is clicked.
     */
    this.backdropDismiss = true;
    /**
     * If `true`, a backdrop will be displayed behind the popover.
     */
    this.showBackdrop = true;
    /**
     * If `true`, the popover will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    this.translucent = false;
    /**
     * If `true`, the popover will animate.
     */
    this.animated = true;
    /**
     * Describes what kind of interaction with the trigger that
     * should cause the popover to open. Does not apply when the `trigger`
     * property is `undefined`.
     * If `'click'`, the popover will be presented when the trigger is left clicked.
     * If `'hover'`, the popover will be presented when a pointer hovers over the trigger.
     * If `'context-menu'`, the popover will be presented when the trigger is right
     * clicked on desktop and long pressed on mobile. This will also prevent your
     * device's normal context menu from appearing.
     */
    this.triggerAction = 'click';
    /**
     * Describes how to calculate the popover width.
     * If `'cover'`, the popover width will match the width of the trigger.
     * If `'auto'`, the popover width will be determined by the content in
     * the popover.
     */
    this.size = 'auto';
    /**
     * If `true`, the popover will be automatically
     * dismissed when the content has been clicked.
     */
    this.dismissOnSelect = false;
    /**
     * Describes what to position the popover relative to.
     * If `'trigger'`, the popover will be positioned relative
     * to the trigger button. If passing in an event, this is
     * determined via event.target.
     * If `'event'`, the popover will be positioned relative
     * to the x/y coordinates of the trigger action. If passing
     * in an event, this is determined via event.clientX and event.clientY.
     */
    this.reference = 'trigger';
    /**
     * Describes which side of the `reference` point to position
     * the popover on. The `'start'` and `'end'` values are RTL-aware,
     * and the `'left'` and `'right'` values are not.
     */
    this.side = 'bottom';
    /**
     * If `true`, the popover will display an arrow
     * that points at the `reference` when running in `ios` mode
     * on mobile. Does not apply in `md` mode or on desktop.
     */
    this.arrow = true;
    /**
     * If `true`, the popover will open. If `false`, the popover will close.
     * Use this if you need finer grained control over presentation, otherwise
     * just use the popoverController or the `trigger` property.
     * Note: `isOpen` will not automatically be set back to `false` when
     * the popover dismisses. You will need to do that in your code.
     */
    this.isOpen = false;
    /**
     * @internal
     *
     * If `true` the popover will not register its own keyboard event handlers.
     * This allows the contents of the popover to handle their own keyboard interactions.
     *
     * If `false`, the popover will register its own keyboard event handlers for
     * navigating `ion-list` items within a popover (up/down/home/end/etc.).
     * This will also cancel browser keyboard event bindings to prevent scroll
     * behavior in a popover using a list of items.
     */
    this.keyboardEvents = false;
    this.onDismiss = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      this.dismiss();
    };
    this.onBackdropTap = () => {
      this.dismiss(undefined, BACKDROP);
    };
    this.onLifecycle = (modalEvent) => {
      const el = this.usersElement;
      const name = LIFECYCLE_MAP[modalEvent.type];
      if (el && name) {
        const event = new CustomEvent(name, {
          bubbles: false,
          cancelable: false,
          detail: modalEvent.detail
        });
        el.dispatchEvent(event);
      }
    };
    this.configureTriggerInteraction = () => {
      const { trigger, triggerAction, el, destroyTriggerInteraction } = this;
      if (destroyTriggerInteraction) {
        destroyTriggerInteraction();
      }
      const triggerEl = this.triggerEl = (trigger !== undefined) ? document.getElementById(trigger) : null;
      if (!triggerEl) {
        return;
      }
      this.destroyTriggerInteraction = configureTriggerInteraction(triggerEl, triggerAction, el);
    };
    this.configureKeyboardInteraction = () => {
      const { destroyKeyboardInteraction, el } = this;
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
      }
      this.destroyKeyboardInteraction = configureKeyboardInteraction(el);
    };
    this.configureDismissInteraction = () => {
      const { destroyDismissInteraction, parentPopover, triggerAction, triggerEl, el } = this;
      if (!parentPopover || !triggerEl) {
        return;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
      }
      this.destroyDismissInteraction = configureDismissInteraction(triggerEl, triggerAction, el, parentPopover);
    };
  }
  onTriggerChange() {
    this.configureTriggerInteraction();
  }
  onIsOpenChange(newValue, oldValue) {
    if (newValue === true && oldValue === false) {
      this.present();
    }
    else if (newValue === false && oldValue === true) {
      this.dismiss();
    }
  }
  connectedCallback() {
    prepareOverlay(this.el);
  }
  componentWillLoad() {
    /**
     * If user has custom ID set then we should
     * not assign the default incrementing ID.
     */
    this.popoverId = (this.el.hasAttribute('id')) ? this.el.getAttribute('id') : `ion-popover-${this.popoverIndex}`;
    this.parentPopover = this.el.closest(`ion-popover:not(#${this.popoverId})`);
    if (this.alignment === undefined) {
      this.alignment = getIonMode(this) === 'ios' ? 'center' : 'start';
    }
  }
  componentDidLoad() {
    const { parentPopover, isOpen } = this;
    /**
     * If popover was rendered with isOpen="true"
     * then we should open popover immediately.
     */
    if (isOpen === true) {
      raf(() => this.present());
    }
    if (parentPopover) {
      addEventListener(parentPopover, 'ionPopoverWillDismiss', () => {
        this.dismiss(undefined, undefined, false);
      });
    }
    this.configureTriggerInteraction();
  }
  /**
   * When opening a popover from a trigger, we should not be
   * modifying the `event` prop from inside the component.
   * Additionally, when pressing the "Right" arrow key, we need
   * to shift focus to the first descendant in the newly presented
   * popover.
   *
   * @internal
   */
  async presentFromTrigger(event, focusDescendant = false) {
    this.focusDescendantOnPresent = focusDescendant;
    await this.present(event);
    this.focusDescendantOnPresent = false;
  }
  /**
   * Determines whether or not an overlay
   * is being used inline or via a controller/JS
   * and returns the correct delegate.
   * By default, subsequent calls to getDelegate
   * will use a cached version of the delegate.
   * This is useful for calling dismiss after
   * present so that the correct delegate is given.
   */
  getDelegate(force = false) {
    if (this.workingDelegate && !force) {
      return {
        delegate: this.workingDelegate,
        inline: this.inline
      };
    }
    /**
     * If using overlay inline
     * we potentially need to use the coreDelegate
     * so that this works in vanilla JS apps.
     * If a developer has presented this component
     * via a controller, then we can assume
     * the component is already in the
     * correct place.
     */
    const parentEl = this.el.parentNode;
    const inline = this.inline = parentEl !== null && !this.hasController;
    const delegate = this.workingDelegate = (inline) ? this.delegate || this.coreDelegate : this.delegate;
    return { inline, delegate };
  }
  /**
   * Present the popover overlay after it has been created.
   * Developers can pass a mouse, touch, or pointer event
   * to position the popover relative to where that event
   * was dispatched.
   */
  async present(event) {
    if (this.presented) {
      return;
    }
    /**
     * When using an inline popover
     * and dismissing a popover it is possible to
     * quickly present the popover while it is
     * dismissing. We need to await any current
     * transition to allow the dismiss to finish
     * before presenting again.
     */
    if (this.currentTransition !== undefined) {
      await this.currentTransition;
    }
    const data = Object.assign(Object.assign({}, this.componentProps), { popover: this.el });
    const { inline, delegate } = this.getDelegate(true);
    this.usersElement = await attachComponent(delegate, this.el, this.component, ['popover-viewport'], data, inline);
    await deepReady(this.usersElement);
    if (!this.keyboardEvents) {
      this.configureKeyboardInteraction();
    }
    this.configureDismissInteraction();
    this.currentTransition = present(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, {
      event: event || this.event,
      size: this.size,
      trigger: this.triggerEl,
      reference: this.reference,
      side: this.side,
      align: this.alignment
    });
    await this.currentTransition;
    this.currentTransition = undefined;
    /**
     * If popover is nested and was
     * presented using the "Right" arrow key,
     * we need to move focus to the first
     * descendant inside of the popover.
     */
    if (this.focusDescendantOnPresent) {
      focusFirstDescendant(this.el, this.el);
    }
  }
  /**
   * Dismiss the popover overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
   * @param dismissParentPopover If `true`, dismissing this popover will also dismiss
   * a parent popover if this popover is nested. Defaults to `true`.
   */
  async dismiss(data, role, dismissParentPopover = true) {
    /**
     * When using an inline popover
     * and presenting a popover it is possible to
     * quickly dismiss the popover while it is
     * presenting. We need to await any current
     * transition to allow the present to finish
     * before dismissing again.
     */
    if (this.currentTransition !== undefined) {
      await this.currentTransition;
    }
    const { destroyKeyboardInteraction, destroyDismissInteraction } = this;
    if (dismissParentPopover && this.parentPopover) {
      this.parentPopover.dismiss(data, role, dismissParentPopover);
    }
    this.currentTransition = dismiss(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event);
    const shouldDismiss = await this.currentTransition;
    if (shouldDismiss) {
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
        this.destroyKeyboardInteraction = undefined;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
        this.destroyDismissInteraction = undefined;
      }
      /**
       * If using popover inline
       * we potentially need to use the coreDelegate
       * so that this works in vanilla JS apps
       */
      const { delegate } = this.getDelegate();
      await detachComponent(delegate, this.usersElement);
    }
    this.currentTransition = undefined;
    return shouldDismiss;
  }
  /**
   * @internal
   */
  async getParentPopover() {
    return this.parentPopover;
  }
  /**
   * Returns a promise that resolves when the popover did dismiss.
   */
  onDidDismiss() {
    return eventMethod(this.el, 'ionPopoverDidDismiss');
  }
  /**
   * Returns a promise that resolves when the popover will dismiss.
   */
  onWillDismiss() {
    return eventMethod(this.el, 'ionPopoverWillDismiss');
  }
  render() {
    const mode = getIonMode(this);
    const { onLifecycle, popoverId, parentPopover, dismissOnSelect, side, arrow, htmlAttributes } = this;
    const desktop = isPlatform('desktop');
    const enableArrow = arrow && !parentPopover && !desktop;
    return (h(Host, Object.assign({ "aria-modal": "true", "no-router": true, tabindex: "-1" }, htmlAttributes, { style: {
        zIndex: `${20000 + this.overlayIndex}`,
      }, id: popoverId, class: Object.assign(Object.assign({}, getClassMap(this.cssClass)), { [mode]: true, 'popover-translucent': this.translucent, 'overlay-hidden': true, 'popover-desktop': desktop, [`popover-side-${side}`]: true, 'popover-nested': !!parentPopover }), onIonPopoverDidPresent: onLifecycle, onIonPopoverWillPresent: onLifecycle, onIonPopoverWillDismiss: onLifecycle, onIonPopoverDidDismiss: onLifecycle, onIonDismiss: this.onDismiss, onIonBackdropTap: this.onBackdropTap }),
      !parentPopover && h("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop, part: "backdrop" }),
      h("div", { class: "popover-wrapper ion-overlay-wrapper", onClick: dismissOnSelect ? () => this.dismiss() : undefined },
        enableArrow && h("div", { class: "popover-arrow", part: "arrow" }),
        h("div", { class: "popover-content", part: "content" },
          h("slot", null)))));
  }
  static get is() { return "ion-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "ios": ["popover.ios.scss"],
    "md": ["popover.md.scss"]
  }; }
  static get styleUrls() { return {
    "ios": ["popover.ios.css"],
    "md": ["popover.md.css"]
  }; }
  static get properties() { return {
    "hasController": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": undefined
          }],
        "text": ""
      },
      "attribute": "has-controller",
      "reflect": false,
      "defaultValue": "false"
    },
    "delegate": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "FrameworkDelegate",
        "resolved": "FrameworkDelegate | undefined",
        "references": {
          "FrameworkDelegate": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": undefined
          }],
        "text": ""
      }
    },
    "overlayIndex": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": undefined
          }],
        "text": ""
      },
      "attribute": "overlay-index",
      "reflect": false
    },
    "enterAnimation": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "AnimationBuilder",
        "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
        "references": {
          "AnimationBuilder": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Animation to use when the popover is presented."
      }
    },
    "leaveAnimation": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "AnimationBuilder",
        "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
        "references": {
          "AnimationBuilder": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Animation to use when the popover is dismissed."
      }
    },
    "component": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ComponentRef",
        "resolved": "Function | HTMLElement | null | string | undefined",
        "references": {
          "ComponentRef": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The component to display inside of the popover.\nYou only need to use this if you are not using\na JavaScript framework. Otherwise, you can just\nslot your component inside of `ion-popover`."
      },
      "attribute": "component",
      "reflect": false
    },
    "componentProps": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ComponentProps",
        "resolved": "undefined | { [key: string]: any; }",
        "references": {
          "ComponentProps": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The data to pass to the popover component.\nYou only need to use this if you are not using\na JavaScript framework. Otherwise, you can just\nset the props directly on your component."
      }
    },
    "keyboardClose": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the keyboard will be automatically dismissed when the overlay is presented."
      },
      "attribute": "keyboard-close",
      "reflect": false,
      "defaultValue": "true"
    },
    "cssClass": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | string[]",
        "resolved": "string | string[] | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": undefined
          }],
        "text": "Additional classes to apply for custom CSS. If multiple classes are\nprovided they should be separated by spaces."
      },
      "attribute": "css-class",
      "reflect": false
    },
    "backdropDismiss": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will be dismissed when the backdrop is clicked."
      },
      "attribute": "backdrop-dismiss",
      "reflect": false,
      "defaultValue": "true"
    },
    "event": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The event to pass to the popover animation."
      },
      "attribute": "event",
      "reflect": false
    },
    "showBackdrop": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, a backdrop will be displayed behind the popover."
      },
      "attribute": "show-backdrop",
      "reflect": false,
      "defaultValue": "true"
    },
    "translucent": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility)."
      },
      "attribute": "translucent",
      "reflect": false,
      "defaultValue": "false"
    },
    "animated": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will animate."
      },
      "attribute": "animated",
      "reflect": false,
      "defaultValue": "true"
    },
    "htmlAttributes": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "PopoverAttributes",
        "resolved": "PopoverAttributes | undefined",
        "references": {
          "PopoverAttributes": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Additional attributes to pass to the popover."
      }
    },
    "triggerAction": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "TriggerAction",
        "resolved": "\"click\" | \"context-menu\" | \"hover\"",
        "references": {
          "TriggerAction": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes what kind of interaction with the trigger that\nshould cause the popover to open. Does not apply when the `trigger`\nproperty is `undefined`.\nIf `'click'`, the popover will be presented when the trigger is left clicked.\nIf `'hover'`, the popover will be presented when a pointer hovers over the trigger.\nIf `'context-menu'`, the popover will be presented when the trigger is right\nclicked on desktop and long pressed on mobile. This will also prevent your\ndevice's normal context menu from appearing."
      },
      "attribute": "trigger-action",
      "reflect": false,
      "defaultValue": "'click'"
    },
    "trigger": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | undefined",
        "resolved": "string | undefined",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An ID corresponding to the trigger element that\ncauses the popover to open. Use the `trigger-action`\nproperty to customize the interaction that results in\nthe popover opening."
      },
      "attribute": "trigger",
      "reflect": false
    },
    "size": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "PopoverSize",
        "resolved": "\"auto\" | \"cover\"",
        "references": {
          "PopoverSize": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes how to calculate the popover width.\nIf `'cover'`, the popover width will match the width of the trigger.\nIf `'auto'`, the popover width will be determined by the content in\nthe popover."
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'auto'"
    },
    "dismissOnSelect": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will be automatically\ndismissed when the content has been clicked."
      },
      "attribute": "dismiss-on-select",
      "reflect": false,
      "defaultValue": "false"
    },
    "reference": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "PositionReference",
        "resolved": "\"event\" | \"trigger\"",
        "references": {
          "PositionReference": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes what to position the popover relative to.\nIf `'trigger'`, the popover will be positioned relative\nto the trigger button. If passing in an event, this is\ndetermined via event.target.\nIf `'event'`, the popover will be positioned relative\nto the x/y coordinates of the trigger action. If passing\nin an event, this is determined via event.clientX and event.clientY."
      },
      "attribute": "reference",
      "reflect": false,
      "defaultValue": "'trigger'"
    },
    "side": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "PositionSide",
        "resolved": "\"bottom\" | \"end\" | \"left\" | \"right\" | \"start\" | \"top\"",
        "references": {
          "PositionSide": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Describes which side of the `reference` point to position\nthe popover on. The `'start'` and `'end'` values are RTL-aware,\nand the `'left'` and `'right'` values are not."
      },
      "attribute": "side",
      "reflect": false,
      "defaultValue": "'bottom'"
    },
    "alignment": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "PositionAlign",
        "resolved": "\"center\" | \"end\" | \"start\" | undefined",
        "references": {
          "PositionAlign": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Describes how to align the popover content with the `reference` point.\nDefaults to `'center'` for `ios` mode, and `'start'` for `md` mode."
      },
      "attribute": "alignment",
      "reflect": false
    },
    "arrow": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will display an arrow\nthat points at the `reference` when running in `ios` mode\non mobile. Does not apply in `md` mode or on desktop."
      },
      "attribute": "arrow",
      "reflect": false,
      "defaultValue": "true"
    },
    "isOpen": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `true`, the popover will open. If `false`, the popover will close.\nUse this if you need finer grained control over presentation, otherwise\njust use the popoverController or the `trigger` property.\nNote: `isOpen` will not automatically be set back to `false` when\nthe popover dismisses. You will need to do that in your code."
      },
      "attribute": "is-open",
      "reflect": false,
      "defaultValue": "false"
    },
    "keyboardEvents": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": "If `true` the popover will not register its own keyboard event handlers.\nThis allows the contents of the popover to handle their own keyboard interactions.\n\nIf `false`, the popover will register its own keyboard event handlers for\nnavigating `ion-list` items within a popover (up/down/home/end/etc.).\nThis will also cancel browser keyboard event bindings to prevent scroll\nbehavior in a popover using a list of items."
          }],
        "text": ""
      },
      "attribute": "keyboard-events",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "presented": {}
  }; }
  static get events() { return [{
      "method": "didPresent",
      "name": "ionPopoverDidPresent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted after the popover has presented."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "willPresent",
      "name": "ionPopoverWillPresent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted before the popover has presented."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "willDismiss",
      "name": "ionPopoverWillDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted before the popover has dismissed."
      },
      "complexType": {
        "original": "OverlayEventDetail",
        "resolved": "OverlayEventDetail<any>",
        "references": {
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }, {
      "method": "didDismiss",
      "name": "ionPopoverDidDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted after the popover has dismissed."
      },
      "complexType": {
        "original": "OverlayEventDetail",
        "resolved": "OverlayEventDetail<any>",
        "references": {
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }, {
      "method": "didPresentShorthand",
      "name": "didPresent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted after the popover has presented.\nShorthand for ionPopoverWillDismiss."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "willPresentShorthand",
      "name": "willPresent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted before the popover has presented.\nShorthand for ionPopoverWillPresent."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "willDismissShorthand",
      "name": "willDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted before the popover has dismissed.\nShorthand for ionPopoverWillDismiss."
      },
      "complexType": {
        "original": "OverlayEventDetail",
        "resolved": "OverlayEventDetail<any>",
        "references": {
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }, {
      "method": "didDismissShorthand",
      "name": "didDismiss",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted after the popover has dismissed.\nShorthand for ionPopoverDidDismiss."
      },
      "complexType": {
        "original": "OverlayEventDetail",
        "resolved": "OverlayEventDetail<any>",
        "references": {
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }]; }
  static get methods() { return {
    "presentFromTrigger": {
      "complexType": {
        "signature": "(event?: any, focusDescendant?: boolean) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }, {
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "When opening a popover from a trigger, we should not be\nmodifying the `event` prop from inside the component.\nAdditionally, when pressing the \"Right\" arrow key, we need\nto shift focus to the first descendant in the newly presented\npopover.",
        "tags": [{
            "name": "internal",
            "text": undefined
          }]
      }
    },
    "present": {
      "complexType": {
        "signature": "(event?: MouseEvent | TouchEvent | PointerEvent | CustomEvent<any> | undefined) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "MouseEvent": {
            "location": "global"
          },
          "TouchEvent": {
            "location": "global"
          },
          "PointerEvent": {
            "location": "global"
          },
          "CustomEvent": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Present the popover overlay after it has been created.\nDevelopers can pass a mouse, touch, or pointer event\nto position the popover relative to where that event\nwas dispatched.",
        "tags": []
      }
    },
    "dismiss": {
      "complexType": {
        "signature": "(data?: any, role?: string | undefined, dismissParentPopover?: boolean) => Promise<boolean>",
        "parameters": [{
            "tags": [{
                "name": "param",
                "text": "data Any data to emit in the dismiss events."
              }],
            "text": "Any data to emit in the dismiss events."
          }, {
            "tags": [{
                "name": "param",
                "text": "role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'."
              }],
            "text": "The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'."
          }, {
            "tags": [{
                "name": "param",
                "text": "dismissParentPopover If `true`, dismissing this popover will also dismiss\na parent popover if this popover is nested. Defaults to `true`."
              }],
            "text": "If `true`, dismissing this popover will also dismiss\na parent popover if this popover is nested. Defaults to `true`."
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "Dismiss the popover overlay after it has been presented.",
        "tags": [{
            "name": "param",
            "text": "data Any data to emit in the dismiss events."
          }, {
            "name": "param",
            "text": "role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'."
          }, {
            "name": "param",
            "text": "dismissParentPopover If `true`, dismissing this popover will also dismiss\na parent popover if this popover is nested. Defaults to `true`."
          }]
      }
    },
    "getParentPopover": {
      "complexType": {
        "signature": "() => Promise<HTMLIonPopoverElement | null>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "HTMLIonPopoverElement": {
            "location": "global"
          }
        },
        "return": "Promise<HTMLIonPopoverElement | null>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": undefined
          }]
      }
    },
    "onDidDismiss": {
      "complexType": {
        "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          },
          "T": {
            "location": "global"
          }
        },
        "return": "Promise<OverlayEventDetail<T>>"
      },
      "docs": {
        "text": "Returns a promise that resolves when the popover did dismiss.",
        "tags": []
      }
    },
    "onWillDismiss": {
      "complexType": {
        "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "OverlayEventDetail": {
            "location": "import",
            "path": "../../interface"
          },
          "T": {
            "location": "global"
          }
        },
        "return": "Promise<OverlayEventDetail<T>>"
      },
      "docs": {
        "text": "Returns a promise that resolves when the popover will dismiss.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "trigger",
      "methodName": "onTriggerChange"
    }, {
      "propName": "triggerAction",
      "methodName": "onTriggerChange"
    }, {
      "propName": "isOpen",
      "methodName": "onIsOpenChange"
    }]; }
}
const LIFECYCLE_MAP = {
  'ionPopoverDidPresent': 'ionViewDidEnter',
  'ionPopoverWillPresent': 'ionViewWillEnter',
  'ionPopoverWillDismiss': 'ionViewWillLeave',
  'ionPopoverDidDismiss': 'ionViewDidLeave',
};
let popoverIds = 0;
