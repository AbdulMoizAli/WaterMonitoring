/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Component, Element, Event, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { getIonMode } from '../../global/ionic-global';
import { getElementRoot, raf } from '../../utils/helpers';
import { hapticSelectionChanged, hapticSelectionEnd, hapticSelectionStart } from '../../utils/native/haptic';
import { createColorClasses } from '../../utils/theme';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 * @internal
 */
export class PickerColumnInternal {
  constructor() {
    this.hapticsStarted = false;
    this.isColumnVisible = false;
    this.isActive = false;
    /**
     * A list of options to be displayed in the picker
     */
    this.items = [];
    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    this.color = 'primary';
    /**
     * If `true`, tapping the picker will
     * reveal a number input keyboard that lets
     * the user type in values for each picker
     * column. This is useful when working
     * with time pickers.
     *
     * @internal
     */
    this.numericInput = false;
    this.centerPickerItemInView = (target, smooth = true) => {
      const { el, isColumnVisible } = this;
      if (isColumnVisible) {
        // (Vertical offset from parent) - (three empty picker rows) + (half the height of the target to ensure the scroll triggers)
        const top = target.offsetTop - (3 * target.clientHeight) + (target.clientHeight / 2);
        if (el.scrollTop !== top) {
          el.scroll({
            top,
            left: 0,
            behavior: smooth ? 'smooth' : undefined
          });
        }
      }
    };
    /**
     * When ionInputModeChange is emitted, each column
     * needs to check if it is the one being made available
     * for text entry.
     */
    this.inputModeChange = (ev) => {
      if (!this.numericInput) {
        return;
      }
      const { useInputMode, inputModeColumn } = ev.detail;
      /**
       * If inputModeColumn is undefined then this means
       * all numericInput columns are being selected.
       */
      const isColumnActive = inputModeColumn === undefined || inputModeColumn === this.el;
      if (!useInputMode || !isColumnActive) {
        this.isActive = false;
        return;
      }
      this.isActive = true;
    };
    /**
     * When the column scrolls, the component
     * needs to determine which item is centered
     * in the view and will emit an ionChange with
     * the item object.
     */
    this.initializeScrollListener = () => {
      const { el } = this;
      let timeout;
      let activeEl = this.activeItem;
      const scrollCallback = () => {
        raf(() => {
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
          if (!this.hapticsStarted) {
            hapticSelectionStart();
            this.hapticsStarted = true;
          }
          /**
           * Select item in the center of the column
           * which is the month/year that we want to select
           */
          const bbox = el.getBoundingClientRect();
          const centerX = bbox.x + (bbox.width / 2);
          const centerY = bbox.y + (bbox.height / 2);
          const activeElement = el.shadowRoot.elementFromPoint(centerX, centerY);
          if (activeEl !== null) {
            activeEl.classList.remove(PICKER_COL_ACTIVE);
          }
          /**
           * If we are selecting a new value,
           * we need to run haptics again.
           */
          if (activeElement !== activeEl) {
            hapticSelectionChanged();
          }
          activeEl = activeElement;
          activeElement.classList.add(PICKER_COL_ACTIVE);
          timeout = setTimeout(() => {
            const dataIndex = activeElement.getAttribute('data-index');
            /**
             * If no value it is
             * possible we hit one of the
             * empty padding columns.
             */
            if (dataIndex === null) {
              return;
            }
            const index = parseInt(dataIndex, 10);
            const selectedItem = this.items[index];
            if (selectedItem.value !== this.value) {
              this.value = selectedItem.value;
              hapticSelectionEnd();
              this.hapticsStarted = false;
            }
          }, 250);
        });
      };
      /**
       * Wrap this in an raf so that the scroll callback
       * does not fire when component is initially shown.
       */
      raf(() => {
        el.addEventListener('scroll', scrollCallback);
        this.destroyScrollListener = () => {
          el.removeEventListener('scroll', scrollCallback);
        };
      });
    };
  }
  valueChange() {
    if (this.isColumnVisible) {
      /**
       * Only scroll the active item into view and emit the value
       * change, when the picker column is actively visible to the user.
       */
      const { items, value } = this;
      this.scrollActiveItemIntoView();
      const findItem = items.find(item => item.value === value);
      if (findItem) {
        this.ionChange.emit(findItem);
      }
    }
  }
  /**
   * Only setup scroll listeners
   * when the picker is visible, otherwise
   * the container will have a scroll
   * height of 0px.
   */
  componentWillLoad() {
    const visibleCallback = (entries) => {
      var _a;
      const ev = entries[0];
      if (ev.isIntersecting) {
        this.isColumnVisible = true;
        /**
         * Because this initial call to scrollActiveItemIntoView has to fire before
         * the scroll listener is set up, we need to manage the active class manually.
         */
        const oldActive = getElementRoot(this.el).querySelector(`.${PICKER_COL_ACTIVE}`);
        oldActive === null || oldActive === void 0 ? void 0 : oldActive.classList.remove(PICKER_COL_ACTIVE);
        this.scrollActiveItemIntoView();
        (_a = this.activeItem) === null || _a === void 0 ? void 0 : _a.classList.add(PICKER_COL_ACTIVE);
        this.initializeScrollListener();
      }
      else {
        this.isColumnVisible = false;
        if (this.destroyScrollListener) {
          this.destroyScrollListener();
          this.destroyScrollListener = undefined;
        }
      }
    };
    new IntersectionObserver(visibleCallback, { threshold: 0.01 }).observe(this.el);
    const parentEl = this.el.closest('ion-picker-internal');
    if (parentEl !== null) {
      parentEl.addEventListener('ionInputModeChange', (ev) => this.inputModeChange(ev));
    }
  }
  componentDidRender() {
    var _a;
    const { activeItem, items, isColumnVisible, value } = this;
    if (isColumnVisible) {
      if (activeItem) {
        this.scrollActiveItemIntoView();
      }
      else if (((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) !== value) {
        /**
         * If the picker column does not have an active item and the current value
         * does not match the first item in the picker column, that means
         * the value is out of bounds. In this case, we assign the value to the
         * first item to match the scroll position of the column.
         *
         */
        this.value = items[0].value;
      }
    }
  }
  /** @internal  */
  async scrollActiveItemIntoView() {
    const activeEl = this.activeItem;
    if (activeEl) {
      this.centerPickerItemInView(activeEl, false);
    }
  }
  get activeItem() {
    return getElementRoot(this.el).querySelector(`.picker-item[data-value="${this.value}"]`);
  }
  render() {
    const { items, color, isActive, numericInput } = this;
    const mode = getIonMode(this);
    return (h(Host, { tabindex: 0, class: createColorClasses(color, {
        [mode]: true,
        ['picker-column-active']: isActive,
        ['picker-column-numeric-input']: numericInput
      }) },
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0"),
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0"),
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0"),
      items.map((item, index) => {
        return (h("div", { class: "picker-item", "data-value": item.value, "data-index": index, onClick: (ev) => {
            this.centerPickerItemInView(ev.target);
          } }, item.text));
      }),
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0"),
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0"),
      h("div", { class: "picker-item picker-item-empty" }, "\u00A0")));
  }
  static get is() { return "ion-picker-column-internal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "ios": ["picker-column-internal.ios.scss"],
    "md": ["picker-column-internal.md.scss"]
  }; }
  static get styleUrls() { return {
    "ios": ["picker-column-internal.ios.css"],
    "md": ["picker-column-internal.md.css"]
  }; }
  static get properties() { return {
    "items": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "PickerColumnItem[]",
        "resolved": "PickerColumnItem[]",
        "references": {
          "PickerColumnItem": {
            "location": "import",
            "path": "./picker-column-internal-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "A list of options to be displayed in the picker"
      },
      "defaultValue": "[]"
    },
    "value": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "string | number",
        "resolved": "number | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The selected option in the picker."
      },
      "attribute": "value",
      "reflect": false
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "Color",
        "resolved": "string | undefined",
        "references": {
          "Color": {
            "location": "import",
            "path": "../../interface"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
      },
      "attribute": "color",
      "reflect": true,
      "defaultValue": "'primary'"
    },
    "numericInput": {
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
        "text": "If `true`, tapping the picker will\nreveal a number input keyboard that lets\nthe user type in values for each picker\ncolumn. This is useful when working\nwith time pickers."
      },
      "attribute": "numeric-input",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "isActive": {}
  }; }
  static get events() { return [{
      "method": "ionChange",
      "name": "ionChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the value has changed."
      },
      "complexType": {
        "original": "PickerColumnItem",
        "resolved": "PickerColumnItem",
        "references": {
          "PickerColumnItem": {
            "location": "import",
            "path": "./picker-column-internal-interfaces"
          }
        }
      }
    }]; }
  static get methods() { return {
    "scrollActiveItemIntoView": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "internal",
            "text": undefined
          }]
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "valueChange"
    }]; }
}
const PICKER_COL_ACTIVE = 'picker-item-active';
