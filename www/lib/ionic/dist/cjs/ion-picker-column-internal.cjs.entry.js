/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e9d456ae.js');
const ionicGlobal = require('./ionic-global-647139c4.js');
const helpers = require('./helpers-b26578db.js');
const haptic = require('./haptic-c4a1d647.js');
const theme = require('./theme-a4c4a7eb.js');

const pickerColumnInternalIosCss = ":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}";

const pickerColumnInternalMdCss = ":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}";

const PickerColumnInternal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionChange = index.createEvent(this, "ionChange", 7);
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
        helpers.raf(() => {
          if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
          }
          if (!this.hapticsStarted) {
            haptic.hapticSelectionStart();
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
            haptic.hapticSelectionChanged();
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
              haptic.hapticSelectionEnd();
              this.hapticsStarted = false;
            }
          }, 250);
        });
      };
      /**
       * Wrap this in an raf so that the scroll callback
       * does not fire when component is initially shown.
       */
      helpers.raf(() => {
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
        const oldActive = helpers.getElementRoot(this.el).querySelector(`.${PICKER_COL_ACTIVE}`);
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
    return helpers.getElementRoot(this.el).querySelector(`.picker-item[data-value="${this.value}"]`);
  }
  render() {
    const { items, color, isActive, numericInput } = this;
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { tabindex: 0, class: theme.createColorClasses(color, {
        [mode]: true,
        ['picker-column-active']: isActive,
        ['picker-column-numeric-input']: numericInput
      }) }, index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0"), items.map((item, index$1) => {
      return (index.h("div", { class: "picker-item", "data-value": item.value, "data-index": index$1, onClick: (ev) => {
          this.centerPickerItemInView(ev.target);
        } }, item.text));
    }), index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0"), index.h("div", { class: "picker-item picker-item-empty" }, "\u00A0")));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChange"]
  }; }
};
const PICKER_COL_ACTIVE = 'picker-item-active';
PickerColumnInternal.style = {
  ios: pickerColumnInternalIosCss,
  md: pickerColumnInternalMdCss
};

exports.ion_picker_column_internal = PickerColumnInternal;
