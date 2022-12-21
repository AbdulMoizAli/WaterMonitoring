/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { b as getIonMode } from './ionic-global.js';
import { s as safeCall } from './overlays.js';
import { g as getClassMap } from './theme.js';
import { d as defineCustomElement$a } from './checkbox.js';
import { d as defineCustomElement$9 } from './icon.js';
import { d as defineCustomElement$8 } from './item.js';
import { d as defineCustomElement$7 } from './label.js';
import { d as defineCustomElement$6 } from './list.js';
import { d as defineCustomElement$5 } from './list-header.js';
import { d as defineCustomElement$4 } from './note.js';
import { d as defineCustomElement$3 } from './radio.js';
import { d as defineCustomElement$2 } from './radio-group.js';
import { d as defineCustomElement$1 } from './ripple-effect.js';

const selectPopoverIosCss = ".sc-ion-select-popover-ios-h ion-list.sc-ion-select-popover-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-list-header.sc-ion-select-popover-ios,ion-label.sc-ion-select-popover-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const selectPopoverMdCss = ".sc-ion-select-popover-md-h ion-list.sc-ion-select-popover-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-list-header.sc-ion-select-popover-md,ion-label.sc-ion-select-popover-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}ion-list.sc-ion-select-popover-md ion-radio.sc-ion-select-popover-md{opacity:0}ion-item.sc-ion-select-popover-md{--inner-border-width:0}.item-radio-checked.sc-ion-select-popover-md{--background:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.08);--background-focused:var(--ion-color-primary, #3880ff);--background-focused-opacity:0.2;--background-hover:var(--ion-color-primary, #3880ff);--background-hover-opacity:0.12}.item-checkbox-checked.sc-ion-select-popover-md{--background-activated:var(--ion-item-color, var(--ion-text-color, #000));--background-focused:var(--ion-item-color, var(--ion-text-color, #000));--background-hover:var(--ion-item-color, var(--ion-text-color, #000));--color:var(--ion-color-primary, #3880ff)}";

const SelectPopover = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /**
     * An array of options for the popover
     */
    this.options = [];
  }
  onSelect(ev) {
    this.setChecked(ev);
    this.callOptionHandler(ev);
  }
  findOptionFromEvent(ev) {
    const { options } = this;
    return options.find(o => o.value === ev.target.value);
  }
  /**
   * When an option is selected we need to get the value(s)
   * of the selected option(s) and return it in the option
   * handler
   */
  callOptionHandler(ev) {
    const option = this.findOptionFromEvent(ev);
    const values = this.getValues(ev);
    if (option && option.handler) {
      safeCall(option.handler, values);
    }
  }
  /**
   * This is required when selecting a radio that is already
   * selected because it will not trigger the ionChange event
   * but we still want to close the popover
   */
  rbClick(ev) {
    this.callOptionHandler(ev);
  }
  setChecked(ev) {
    const { multiple } = this;
    const option = this.findOptionFromEvent(ev);
    // this is a popover with checkboxes (multiple value select)
    // we need to set the checked value for this option
    if (multiple && option) {
      option.checked = ev.detail.checked;
    }
  }
  getValues(ev) {
    const { multiple, options } = this;
    if (multiple) {
      // this is a popover with checkboxes (multiple value select)
      // return an array of all the checked values
      return options.filter(o => o.checked).map(o => o.value);
    }
    // this is a popover with radio buttons (single value select)
    // return the value that was clicked, otherwise undefined
    const option = this.findOptionFromEvent(ev);
    return option ? option.value : undefined;
  }
  renderOptions(options) {
    const { multiple } = this;
    switch (multiple) {
      case true: return this.renderCheckboxOptions(options);
      default: return this.renderRadioOptions(options);
    }
  }
  renderCheckboxOptions(options) {
    return (options.map(option => h("ion-item", { class: getClassMap(option.cssClass) }, h("ion-checkbox", { slot: "start", value: option.value, disabled: option.disabled, checked: option.checked }), h("ion-label", null, option.text))));
  }
  renderRadioOptions(options) {
    const checked = options.filter(o => o.checked).map(o => o.value)[0];
    return (h("ion-radio-group", { value: checked }, options.map(option => h("ion-item", { class: getClassMap(option.cssClass) }, h("ion-label", null, option.text), h("ion-radio", { value: option.value, disabled: option.disabled, onClick: ev => this.rbClick(ev) })))));
  }
  render() {
    const { header, message, options, subHeader } = this;
    const hasSubHeaderOrMessage = subHeader !== undefined || message !== undefined;
    return (h(Host, { class: getIonMode(this) }, h("ion-list", null, header !== undefined && h("ion-list-header", null, header), hasSubHeaderOrMessage &&
      h("ion-item", null, h("ion-label", { class: "ion-text-wrap" }, subHeader !== undefined && h("h3", null, subHeader), message !== undefined && h("p", null, message))), this.renderOptions(options))));
  }
  static get style() { return {
    ios: selectPopoverIosCss,
    md: selectPopoverMdCss
  }; }
}, [34, "ion-select-popover", {
    "header": [1],
    "subHeader": [1, "sub-header"],
    "message": [1],
    "multiple": [4],
    "options": [16]
  }, [[0, "ionChange", "onSelect"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ion-select-popover", "ion-checkbox", "ion-icon", "ion-item", "ion-label", "ion-list", "ion-list-header", "ion-note", "ion-radio", "ion-radio-group", "ion-ripple-effect"];
  components.forEach(tagName => { switch (tagName) {
    case "ion-select-popover":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SelectPopover);
      }
      break;
    case "ion-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ion-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ion-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ion-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ion-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ion-list-header":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ion-note":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ion-radio":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ion-radio-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "ion-ripple-effect":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { SelectPopover as S, defineCustomElement as d };
