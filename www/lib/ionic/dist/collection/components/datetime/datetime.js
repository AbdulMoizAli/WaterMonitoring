/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Component, Element, Event, Host, Method, Prop, State, Watch, h, writeTask } from '@stencil/core';
import { caretDownSharp, caretUpSharp, chevronBack, chevronDown, chevronForward } from 'ionicons/icons';
import { getIonMode } from '../../global/ionic-global';
import { startFocusVisible } from '../../utils/focus-visible';
import { getElementRoot, raf, renderHiddenInput } from '../../utils/helpers';
import { isRTL } from '../../utils/rtl';
import { createColorClasses } from '../../utils/theme';
import { generateMonths, generateTime, getCalendarYears, getDaysOfMonth, getDaysOfWeek, getPickerMonths, getToday } from './utils/data';
import { addTimePadding, getFormattedHour, getFormattedTime, getMonthAndDay, getMonthAndYear } from './utils/format';
import { is24Hour, isMonthFirstLocale } from './utils/helpers';
import { calculateHourFromAMPM, convertDataToISO, getEndOfWeek, getInternalHourValue, getNextDay, getNextMonth, getNextWeek, getNextYear, getPreviousDay, getPreviousMonth, getPreviousWeek, getPreviousYear, getStartOfWeek } from './utils/manipulation';
import { convertToArrayOfNumbers, getPartsFromCalendarDay, parseDate } from './utils/parse';
import { getCalendarDayState, isDayDisabled, isMonthDisabled, isNextMonthDisabled, isPrevMonthDisabled } from './utils/state';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot title - The title of the datetime.
 * @slot buttons - The buttons in the datetime.
 * @slot time-label - The label for the time selector in the datetime.
 */
export class Datetime {
  constructor() {
    this.inputId = `ion-dt-${datetimeIds++}`;
    this.overlayIsPresenting = false;
    this.todayParts = parseDate(getToday());
    this.prevPresentation = null;
    this.showMonthAndYear = false;
    this.activeParts = {
      month: 5,
      day: 28,
      year: 2021,
      hour: 13,
      minute: 52,
      ampm: 'pm'
    };
    this.workingParts = {
      month: 5,
      day: 28,
      year: 2021,
      hour: 13,
      minute: 52,
      ampm: 'pm'
    };
    this.isPresented = false;
    this.isTimePopoverOpen = false;
    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    this.color = 'primary';
    /**
     * The name of the control, which is submitted with the form data.
     */
    this.name = this.inputId;
    /**
     * If `true`, the user cannot interact with the datetime.
     */
    this.disabled = false;
    /**
     * If `true`, the datetime appears normal but is not interactive.
     */
    this.readonly = false;
    /**
     * Which values you want to select. `'date'` will show
     * a calendar picker to select the month, day, and year. `'time'`
     * will show a time picker to select the hour, minute, and (optionally)
     * AM/PM. `'date-time'` will show the date picker first and time picker second.
     * `'time-date'` will show the time picker first and date picker second.
     */
    this.presentation = 'date-time';
    /**
     * The text to display on the picker's cancel button.
     */
    this.cancelText = 'Cancel';
    /**
     * The text to display on the picker's "Done" button.
     */
    this.doneText = 'Done';
    /**
     * The text to display on the picker's "Clear" button.
     */
    this.clearText = 'Clear';
    /**
     * The locale to use for `ion-datetime`. This
     * impacts month and day name formatting.
     * The `'default'` value refers to the default
     * locale set by your device.
     */
    this.locale = 'default';
    /**
     * The first day of the week to use for `ion-datetime`. The
     * default value is `0` and represents Sunday.
     */
    this.firstDayOfWeek = 0;
    /**
     * If `true`, a header will be shown above the calendar
     * picker. On `ios` mode this will include the
     * slotted title, and on `md` mode this will include
     * the slotted title and the selected date.
     */
    this.showDefaultTitle = false;
    /**
     * If `true`, the default "Cancel" and "OK" buttons
     * will be rendered at the bottom of the `ion-datetime`
     * component. Developers can also use the `button` slot
     * if they want to customize these buttons. If custom
     * buttons are set in the `button` slot then the
     * default buttons will not be rendered.
     */
    this.showDefaultButtons = false;
    /**
     * If `true`, a "Clear" button will be rendered alongside
     * the default "Cancel" and "OK" buttons at the bottom of the `ion-datetime`
     * component. Developers can also use the `button` slot
     * if they want to customize these buttons. If custom
     * buttons are set in the `button` slot then the
     * default buttons will not be rendered.
     */
    this.showClearButton = false;
    /**
     * If `true`, the default "Time" label will be rendered
     * for the time selector of the `ion-datetime` component.
     * Developers can also use the `time-label` slot
     * if they want to customize this label. If a custom
     * label is set in the `time-label` slot then the
     * default label will not be rendered.
     */
    this.showDefaultTimeLabel = true;
    /**
     * If `cover`, the `ion-datetime` will expand to cover the full width of its container.
     * If `fixed`, the `ion-datetime` will have a fixed width.
     */
    this.size = 'fixed';
    this.closeParentOverlay = () => {
      const popoverOrModal = this.el.closest('ion-modal, ion-popover');
      if (popoverOrModal) {
        popoverOrModal.dismiss();
      }
    };
    this.setWorkingParts = (parts) => {
      this.workingParts = Object.assign({}, parts);
    };
    this.setActiveParts = (parts) => {
      this.activeParts = Object.assign({}, parts);
      const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
      if (hasSlottedButtons || this.showDefaultButtons) {
        return;
      }
      this.confirm();
    };
    /**
     * Stencil sometimes sets calendarBodyRef to null on rerender, even though
     * the element is present. Query for it manually as a fallback.
     *
     * TODO(FW-901) Remove when issue is resolved: https://github.com/ionic-team/stencil/issues/3253
     */
    this.getCalendarBodyEl = () => {
      var _a;
      return this.calendarBodyRef || ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.calendar-body'));
    };
    this.initializeKeyboardListeners = () => {
      const calendarBodyRef = this.getCalendarBodyEl();
      if (!calendarBodyRef) {
        return;
      }
      const root = this.el.shadowRoot;
      /**
       * Get a reference to the month
       * element we are currently viewing.
       */
      const currentMonth = calendarBodyRef.querySelector('.calendar-month:nth-of-type(2)');
      /**
       * When focusing the calendar body, we want to pass focus
       * to the working day, but other days should
       * only be accessible using the arrow keys. Pressing
       * Tab should jump between bodies of selectable content.
       */
      const checkCalendarBodyFocus = (ev) => {
        var _a;
        const record = ev[0];
        /**
         * If calendar body was already focused
         * when this fired or if the calendar body
         * if not currently focused, we should not re-focus
         * the inner day.
         */
        if (((_a = record.oldValue) === null || _a === void 0 ? void 0 : _a.includes('ion-focused')) ||
          !calendarBodyRef.classList.contains('ion-focused')) {
          return;
        }
        this.focusWorkingDay(currentMonth);
      };
      const mo = new MutationObserver(checkCalendarBodyFocus);
      mo.observe(calendarBodyRef, { attributeFilter: ['class'], attributeOldValue: true });
      this.destroyKeyboardMO = () => {
        mo === null || mo === void 0 ? void 0 : mo.disconnect();
      };
      /**
       * We must use keydown not keyup as we want
       * to prevent scrolling when using the arrow keys.
       */
      calendarBodyRef.addEventListener('keydown', (ev) => {
        const activeElement = root.activeElement;
        if (!activeElement || !activeElement.classList.contains('calendar-day')) {
          return;
        }
        const parts = getPartsFromCalendarDay(activeElement);
        let partsToFocus;
        switch (ev.key) {
          case 'ArrowDown':
            ev.preventDefault();
            partsToFocus = getNextWeek(parts);
            break;
          case 'ArrowUp':
            ev.preventDefault();
            partsToFocus = getPreviousWeek(parts);
            break;
          case 'ArrowRight':
            ev.preventDefault();
            partsToFocus = getNextDay(parts);
            break;
          case 'ArrowLeft':
            ev.preventDefault();
            partsToFocus = getPreviousDay(parts);
            break;
          case 'Home':
            ev.preventDefault();
            partsToFocus = getStartOfWeek(parts);
            break;
          case 'End':
            ev.preventDefault();
            partsToFocus = getEndOfWeek(parts);
            break;
          case 'PageUp':
            ev.preventDefault();
            partsToFocus = ev.shiftKey ? getPreviousYear(parts) : getPreviousMonth(parts);
            break;
          case 'PageDown':
            ev.preventDefault();
            partsToFocus = ev.shiftKey ? getNextYear(parts) : getNextMonth(parts);
            break;
          /**
           * Do not preventDefault here
           * as we do not want to override other
           * browser defaults such as pressing Enter/Space
           * to select a day.
           */
          default:
            return;
        }
        /**
         * If the day we want to move focus to is
         * disabled, do not do anything.
         */
        if (isDayDisabled(partsToFocus, this.minParts, this.maxParts)) {
          return;
        }
        this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), partsToFocus));
        /**
         * Give view a chance to re-render
         * then move focus to the new working day
         */
        requestAnimationFrame(() => this.focusWorkingDay(currentMonth));
      });
    };
    this.focusWorkingDay = (currentMonth) => {
      /**
       * Get the number of padding days so
       * we know how much to offset our next selector by
       * to grab the correct calenday-day element.
       */
      const padding = currentMonth.querySelectorAll('.calendar-day-padding');
      const { day } = this.workingParts;
      if (day === null) {
        return;
      }
      /**
       * Get the calendar day element
       * and focus it.
       */
      const dayEl = currentMonth.querySelector(`.calendar-day:nth-of-type(${padding.length + day})`);
      if (dayEl) {
        dayEl.focus();
      }
    };
    this.processMinParts = () => {
      if (this.min === undefined) {
        this.minParts = undefined;
        return;
      }
      const { month, day, year, hour, minute } = parseDate(this.min);
      this.minParts = {
        month,
        day,
        year,
        hour,
        minute
      };
    };
    this.processMaxParts = () => {
      if (this.max === undefined) {
        this.maxParts = undefined;
        return;
      }
      const { month, day, year, hour, minute } = parseDate(this.max);
      this.maxParts = {
        month,
        day,
        year,
        hour,
        minute
      };
    };
    this.initializeCalendarIOListeners = () => {
      const calendarBodyRef = this.getCalendarBodyEl();
      if (!calendarBodyRef) {
        return;
      }
      const mode = getIonMode(this);
      /**
       * For performance reasons, we only render 3
       * months at a time: The current month, the previous
       * month, and the next month. We have IntersectionObservers
       * on the previous and next month elements to append/prepend
       * new months.
       *
       * We can do this because Stencil is smart enough to not
       * re-create the .calendar-month containers, but rather
       * update the content within those containers.
       *
       * As an added bonus, WebKit has some troubles with
       * scroll-snap-stop: always, so not rendering all of
       * the months in a row allows us to mostly sidestep
       * that issue.
       */
      const months = calendarBodyRef.querySelectorAll('.calendar-month');
      const startMonth = months[0];
      const workingMonth = months[1];
      const endMonth = months[2];
      /**
       * Before setting up the IntersectionObserver,
       * scroll the middle month into view.
       * scrollIntoView() will scroll entire page
       * if element is not in viewport. Use scrollLeft instead.
       */
      writeTask(() => {
        calendarBodyRef.scrollLeft = startMonth.clientWidth * (isRTL(this.el) ? -1 : 1);
        let endIO;
        let startIO;
        const ioCallback = (callbackType, entries) => {
          const refIO = (callbackType === 'start') ? startIO : endIO;
          const refMonth = (callbackType === 'start') ? startMonth : endMonth;
          const refMonthFn = (callbackType === 'start') ? getPreviousMonth : getNextMonth;
          /**
           * If the month is not fully in view, do not do anything
           */
          const ev = entries[0];
          if (!ev.isIntersecting) {
            return;
          }
          /**
           * When presenting an inline overlay,
           * subsequent presentations will cause
           * the IO to fire again (since the overlay
           * is now visible and therefore the calendar
           * months are intersecting).
           */
          if (this.overlayIsPresenting) {
            this.overlayIsPresenting = false;
            return;
          }
          const { month, year, day } = refMonthFn(this.workingParts);
          if (isMonthDisabled({ month, year, day: null }, {
            minParts: Object.assign(Object.assign({}, this.minParts), { day: null }),
            maxParts: Object.assign(Object.assign({}, this.maxParts), { day: null })
          })) {
            return;
          }
          /**
           * On iOS, we need to set pointer-events: none
           * when the user is almost done with the gesture
           * so that they cannot quickly swipe while
           * the scrollable container is snapping.
           * Updating the container while snapping
           * causes WebKit to snap incorrectly.
           */
          if (mode === 'ios') {
            const ratio = ev.intersectionRatio;
            // `maxTouchPoints` will be 1 in device preview, but > 1 on device
            const shouldDisable = Math.abs(ratio - 0.7) <= 0.1 && navigator.maxTouchPoints > 1;
            if (shouldDisable) {
              calendarBodyRef.style.setProperty('pointer-events', 'none');
              return;
            }
          }
          /**
           * Prevent scrolling for other browsers
           * to give the DOM time to update and the container
           * time to properly snap.
           */
          calendarBodyRef.style.setProperty('overflow', 'hidden');
          /**
           * Remove the IO temporarily
           * otherwise you can sometimes get duplicate
           * events when rubber banding.
           */
          if (refIO === undefined) {
            return;
          }
          refIO.disconnect();
          /**
           * Use a writeTask here to ensure
           * that the state is updated and the
           * correct month is scrolled into view
           * in the same frame. This is not
           * typically a problem on newer devices
           * but older/slower device may have a flicker
           * if we did not do this.
           */
          writeTask(() => {
            // Disconnect all active intersection observers
            // to avoid a re-render causing a duplicate event.
            if (this.destroyCalendarIO) {
              this.destroyCalendarIO();
            }
            raf(() => {
              this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { month, day: day, year }));
              calendarBodyRef.scrollLeft = workingMonth.clientWidth * (isRTL(this.el) ? -1 : 1);
              calendarBodyRef.style.removeProperty('overflow');
              calendarBodyRef.style.removeProperty('pointer-events');
              endIO === null || endIO === void 0 ? void 0 : endIO.observe(endMonth);
              startIO === null || startIO === void 0 ? void 0 : startIO.observe(startMonth);
            });
            /**
             * Now that state has been updated
             * and the correct month is in view,
             * we can resume the IO.
             */
            // tslint:disable-next-line
            if (refIO === undefined) {
              return;
            }
            refIO.observe(refMonth);
          });
        };
        const threshold = mode === 'ios' &&
          // tslint:disable-next-line
          typeof navigator !== 'undefined' &&
          navigator.maxTouchPoints > 1 ?
          [0.7, 1] : 1;
        // Intersection observers cannot accurately detect the
        // intersection with a threshold of 1, when the observed
        // element width is a sub-pixel value (i.e. 334.05px).
        // Setting a root margin to 1px solves the issue.
        const rootMargin = '1px';
        /**
         * Listen on the first month to
         * prepend a new month and on the last
         * month to append a new month.
         * The 0.7 threshold is required on ios
         * so that we can remove pointer-events
         * when adding new months.
         * Adding to a scroll snapping container
         * while the container is snapping does not
         * completely work as expected in WebKit.
         * Adding pointer-events: none allows us to
         * avoid these issues.
         *
         * This should be fine on Chromium, but
         * when you set pointer-events: none
         * it applies to active gestures which is not
         * something WebKit does.
         */
        endIO = new IntersectionObserver(ev => ioCallback('end', ev), {
          threshold,
          root: calendarBodyRef,
          rootMargin
        });
        endIO.observe(endMonth);
        startIO = new IntersectionObserver(ev => ioCallback('start', ev), {
          threshold,
          root: calendarBodyRef,
          rootMargin
        });
        startIO.observe(startMonth);
        this.destroyCalendarIO = () => {
          endIO === null || endIO === void 0 ? void 0 : endIO.disconnect();
          startIO === null || startIO === void 0 ? void 0 : startIO.disconnect();
        };
      });
    };
    /**
     * Clean up all listeners except for the overlay
     * listener. This is so that we can re-create the listeners
     * if the datetime has been hidden/presented by a modal or popover.
     */
    this.destroyInteractionListeners = () => {
      const { destroyCalendarIO, destroyKeyboardMO } = this;
      if (destroyCalendarIO !== undefined) {
        destroyCalendarIO();
      }
      if (destroyKeyboardMO !== undefined) {
        destroyKeyboardMO();
      }
    };
    /**
     * When doing subsequent presentations of an inline
     * overlay, the IO callback will fire again causing
     * the calendar to go back one month. We need to listen
     * for the presentation of the overlay so we can properly
     * cancel that IO callback.
     */
    this.initializeOverlayListener = () => {
      const overlay = this.el.closest('ion-popover, ion-modal');
      if (overlay === null) {
        return;
      }
      const overlayListener = () => {
        this.overlayIsPresenting = true;
      };
      overlay.addEventListener('willPresent', overlayListener);
      this.destroyOverlayListener = () => {
        overlay.removeEventListener('willPresent', overlayListener);
      };
    };
    this.processValue = (value) => {
      const valueToProcess = value || getToday();
      const { month, day, year, hour, minute, tzOffset } = parseDate(valueToProcess);
      this.workingParts = {
        month,
        day,
        year,
        hour,
        minute,
        tzOffset,
        ampm: hour >= 12 ? 'pm' : 'am'
      };
      this.activeParts = {
        month,
        day,
        year,
        hour,
        minute,
        tzOffset,
        ampm: hour >= 12 ? 'pm' : 'am'
      };
    };
    this.onFocus = () => {
      this.ionFocus.emit();
    };
    this.onBlur = () => {
      this.ionBlur.emit();
    };
    this.hasValue = () => {
      return this.value != null && this.value !== '';
    };
    this.nextMonth = () => {
      const calendarBodyRef = this.getCalendarBodyEl();
      if (!calendarBodyRef) {
        return;
      }
      const nextMonth = calendarBodyRef.querySelector('.calendar-month:last-of-type');
      if (!nextMonth) {
        return;
      }
      const left = nextMonth.offsetWidth * 2;
      calendarBodyRef.scrollTo({
        top: 0,
        left: left * (isRTL(this.el) ? -1 : 1),
        behavior: 'smooth'
      });
    };
    this.prevMonth = () => {
      const calendarBodyRef = this.getCalendarBodyEl();
      if (!calendarBodyRef) {
        return;
      }
      const prevMonth = calendarBodyRef.querySelector('.calendar-month:first-of-type');
      if (!prevMonth) {
        return;
      }
      calendarBodyRef.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
    this.toggleMonthAndYearView = () => {
      this.showMonthAndYear = !this.showMonthAndYear;
    };
  }
  disabledChanged() {
    this.emitStyle();
  }
  minChanged() {
    this.processMinParts();
  }
  maxChanged() {
    this.processMaxParts();
  }
  yearValuesChanged() {
    this.parsedYearValues = convertToArrayOfNumbers(this.yearValues);
  }
  monthValuesChanged() {
    this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues);
  }
  dayValuesChanged() {
    this.parsedDayValues = convertToArrayOfNumbers(this.dayValues);
  }
  hourValuesChanged() {
    this.parsedHourValues = convertToArrayOfNumbers(this.hourValues);
  }
  minuteValuesChanged() {
    this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues);
  }
  activePartsChanged() {
    this.activePartsClone = this.activeParts;
  }
  /**
   * Update the datetime value when the value changes
   */
  valueChanged() {
    if (this.hasValue()) {
      /**
       * Clones the value of the `activeParts` to the private clone, to update
       * the date display on the current render cycle without causing another render.
       *
       * This allows us to update the current value's date/time display without
       * refocusing or shifting the user's display (leaves the user in place).
       */
      const { month, day, year, hour, minute } = parseDate(this.value);
      this.activePartsClone = Object.assign(Object.assign({}, this.activeParts), { month,
        day,
        year,
        hour,
        minute });
    }
    this.emitStyle();
    this.ionChange.emit({
      value: this.value
    });
  }
  /**
   * Confirms the selected datetime value, updates the
   * `value` property, and optionally closes the popover
   * or modal that the datetime was presented in.
   */
  async confirm(closeOverlay = false) {
    /**
     * Prevent convertDataToISO from doing any
     * kind of transformation based on timezone
     * This cancels out any change it attempts to make
     *
     * Important: Take the timezone offset based on
     * the date that is currently selected, otherwise
     * there can be 1 hr difference when dealing w/ DST
     */
    const date = new Date(convertDataToISO(this.activeParts));
    this.activeParts.tzOffset = date.getTimezoneOffset() * -1;
    this.value = convertDataToISO(this.activeParts);
    if (closeOverlay) {
      this.closeParentOverlay();
    }
  }
  /**
   * Resets the internal state of the datetime but does not update the value.
   * Passing a valid ISO-8601 string will reset the state of the component to the provided date.
   * If no value is provided, the internal state will be reset to today.
   */
  async reset(startDate) {
    this.processValue(startDate);
  }
  /**
   * Emits the ionCancel event and
   * optionally closes the popover
   * or modal that the datetime was
   * presented in.
   */
  async cancel(closeOverlay = false) {
    this.ionCancel.emit();
    if (closeOverlay) {
      this.closeParentOverlay();
    }
  }
  connectedCallback() {
    this.clearFocusVisible = startFocusVisible(this.el).destroy;
  }
  disconnectedCallback() {
    if (this.clearFocusVisible) {
      this.clearFocusVisible();
      this.clearFocusVisible = undefined;
    }
  }
  initializeListeners() {
    this.initializeCalendarIOListeners();
    this.initializeKeyboardListeners();
    this.initializeOverlayListener();
  }
  componentDidLoad() {
    /**
     * If a scrollable element is hidden using `display: none`,
     * it will not have a scroll height meaning we cannot scroll elements
     * into view. As a result, we will need to wait for the datetime to become
     * visible if used inside of a modal or a popover otherwise the scrollable
     * areas will not have the correct values snapped into place.
     */
    let visibleIO;
    const visibleCallback = (entries) => {
      const ev = entries[0];
      if (!ev.isIntersecting) {
        return;
      }
      this.initializeListeners();
      /**
       * TODO: Datetime needs a frame to ensure that it
       * can properly scroll contents into view. As a result
       * we hide the scrollable content until after that frame
       * so users do not see the content quickly shifting. The downside
       * is that the content will pop into view a frame after. Maybe there
       * is a better way to handle this?
       */
      writeTask(() => {
        this.el.classList.add('datetime-ready');
      });
    };
    visibleIO = new IntersectionObserver(visibleCallback, { threshold: 0.01 });
    /**
     * Use raf to avoid a race condition between the component loading and
     * its display animation starting (such as when shown in a modal). This
     * could cause the datetime to start at a visibility of 0, erroneously
     * triggering the `hiddenIO` observer below.
     */
    raf(() => visibleIO === null || visibleIO === void 0 ? void 0 : visibleIO.observe(this.el));
    /**
     * We need to clean up listeners when the datetime is hidden
     * in a popover/modal so that we can properly scroll containers
     * back into view if they are re-presented. When the datetime is hidden
     * the scroll areas have scroll widths/heights of 0px, so any snapping
     * we did originally has been lost.
     */
    let hiddenIO;
    const hiddenCallback = (entries) => {
      const ev = entries[0];
      if (ev.isIntersecting) {
        return;
      }
      this.destroyInteractionListeners();
      writeTask(() => {
        this.el.classList.remove('datetime-ready');
      });
    };
    hiddenIO = new IntersectionObserver(hiddenCallback, { threshold: 0 });
    raf(() => hiddenIO === null || hiddenIO === void 0 ? void 0 : hiddenIO.observe(this.el));
    /**
     * Datetime uses Ionic components that emit
     * ionFocus and ionBlur. These events are
     * composed meaning they will cross
     * the shadow dom boundary. We need to
     * stop propagation on these events otherwise
     * developers will see 2 ionFocus or 2 ionBlur
     * events at a time.
     */
    const root = getElementRoot(this.el);
    root.addEventListener('ionFocus', (ev) => ev.stopPropagation());
    root.addEventListener('ionBlur', (ev) => ev.stopPropagation());
  }
  /**
   * When the presentation is changed, all calendar content is recreated,
   * so we need to re-init behavior with the new elements.
   */
  componentDidRender() {
    const { presentation, prevPresentation } = this;
    if (prevPresentation === null) {
      this.prevPresentation = presentation;
      return;
    }
    if (presentation === prevPresentation) {
      return;
    }
    this.prevPresentation = presentation;
    this.destroyInteractionListeners();
    if (this.destroyOverlayListener !== undefined) {
      this.destroyOverlayListener();
    }
    this.initializeListeners();
  }
  componentWillLoad() {
    this.processMinParts();
    this.processMaxParts();
    this.processValue(this.value);
    this.parsedHourValues = convertToArrayOfNumbers(this.hourValues);
    this.parsedMinuteValues = convertToArrayOfNumbers(this.minuteValues);
    this.parsedMonthValues = convertToArrayOfNumbers(this.monthValues);
    this.parsedYearValues = convertToArrayOfNumbers(this.yearValues);
    this.parsedDayValues = convertToArrayOfNumbers(this.dayValues);
    this.emitStyle();
  }
  emitStyle() {
    this.ionStyle.emit({
      'interactive': true,
      'datetime': true,
      'interactive-disabled': this.disabled,
    });
  }
  renderFooter() {
    const { showDefaultButtons, showClearButton } = this;
    const hasSlottedButtons = this.el.querySelector('[slot="buttons"]') !== null;
    if (!hasSlottedButtons && !showDefaultButtons && !showClearButton) {
      return;
    }
    const clearButtonClick = () => {
      this.reset();
      this.value = undefined;
    };
    /**
     * By default we render two buttons:
     * Cancel - Dismisses the datetime and
     * does not update the `value` prop.
     * OK - Dismisses the datetime and
     * updates the `value` prop.
     */
    return (h("div", { class: "datetime-footer" },
      h("div", { class: "datetime-buttons" },
        h("div", { class: {
            ['datetime-action-buttons']: true,
            ['has-clear-button']: this.showClearButton
          } },
          h("slot", { name: "buttons" },
            h("ion-buttons", null,
              showDefaultButtons && h("ion-button", { id: "cancel-button", color: this.color, onClick: () => this.cancel(true) }, this.cancelText),
              h("div", null,
                showClearButton && h("ion-button", { id: "clear-button", color: this.color, onClick: () => clearButtonClick() }, this.clearText),
                showDefaultButtons && h("ion-button", { id: "confirm-button", color: this.color, onClick: () => this.confirm(true) }, this.doneText))))))));
  }
  renderYearView() {
    const { presentation, workingParts, locale } = this;
    const calendarYears = getCalendarYears(this.todayParts, this.minParts, this.maxParts, this.parsedYearValues);
    const showMonth = presentation !== 'year';
    const showYear = presentation !== 'month';
    const months = getPickerMonths(locale, workingParts, this.minParts, this.maxParts, this.parsedMonthValues);
    const years = calendarYears.map(year => {
      return {
        text: `${year}`,
        value: year
      };
    });
    const showMonthFirst = isMonthFirstLocale(locale);
    const columnOrder = showMonthFirst ? 'month-first' : 'year-first';
    return (h("div", { class: "datetime-year" },
      h("div", { class: {
          'datetime-year-body': true,
          [`order-${columnOrder}`]: true
        } },
        h("ion-picker-internal", null,
          showMonth &&
            h("ion-picker-column-internal", { class: "month-column", color: this.color, items: months, value: workingParts.month, onIonChange: (ev) => {
                // Due to a Safari 14 issue we need to destroy
                // the intersection observer before we update state
                // and trigger a re-render.
                if (this.destroyCalendarIO) {
                  this.destroyCalendarIO();
                }
                this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { month: ev.detail.value }));
                if (presentation === 'month' || presentation === 'month-year') {
                  this.setActiveParts(Object.assign(Object.assign({}, this.activeParts), { month: ev.detail.value }));
                }
                // We can re-attach the intersection observer after
                // the working parts have been updated.
                this.initializeCalendarIOListeners();
                ev.stopPropagation();
              } }),
          showYear &&
            h("ion-picker-column-internal", { class: "year-column", color: this.color, items: years, value: workingParts.year, onIonChange: (ev) => {
                // Due to a Safari 14 issue we need to destroy
                // the intersection observer before we update state
                // and trigger a re-render.
                if (this.destroyCalendarIO) {
                  this.destroyCalendarIO();
                }
                this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { year: ev.detail.value }));
                if (presentation === 'year' || presentation === 'month-year') {
                  this.setActiveParts(Object.assign(Object.assign({}, this.activeParts), { year: ev.detail.value }));
                }
                // We can re-attach the intersection observer after
                // the working parts have been updated.
                this.initializeCalendarIOListeners();
                ev.stopPropagation();
              } })))));
  }
  renderCalendarHeader(mode) {
    const expandedIcon = mode === 'ios' ? chevronDown : caretUpSharp;
    const collapsedIcon = mode === 'ios' ? chevronForward : caretDownSharp;
    const prevMonthDisabled = isPrevMonthDisabled(this.workingParts, this.minParts, this.maxParts);
    const nextMonthDisabled = isNextMonthDisabled(this.workingParts, this.maxParts);
    return (h("div", { class: "calendar-header" },
      h("div", { class: "calendar-action-buttons" },
        h("div", { class: "calendar-month-year" },
          h("ion-item", { button: true, detail: false, lines: "none", onClick: () => this.toggleMonthAndYearView() },
            h("ion-label", null,
              getMonthAndYear(this.locale, this.workingParts),
              " ",
              h("ion-icon", { icon: this.showMonthAndYear ? expandedIcon : collapsedIcon, lazy: false })))),
        h("div", { class: "calendar-next-prev" },
          h("ion-buttons", null,
            h("ion-button", { disabled: prevMonthDisabled, onClick: () => this.prevMonth() },
              h("ion-icon", { slot: "icon-only", icon: chevronBack, lazy: false, flipRtl: true })),
            h("ion-button", { disabled: nextMonthDisabled, onClick: () => this.nextMonth() },
              h("ion-icon", { slot: "icon-only", icon: chevronForward, lazy: false, flipRtl: true }))))),
      h("div", { class: "calendar-days-of-week" }, getDaysOfWeek(this.locale, mode, this.firstDayOfWeek % 7).map(d => {
        return h("div", { class: "day-of-week" }, d);
      }))));
  }
  renderMonth(month, year) {
    const yearAllowed = this.parsedYearValues === undefined || this.parsedYearValues.includes(year);
    const monthAllowed = this.parsedMonthValues === undefined || this.parsedMonthValues.includes(month);
    const isCalMonthDisabled = !yearAllowed || !monthAllowed;
    const swipeDisabled = isMonthDisabled({
      month,
      year,
      day: null
    }, {
      // The day is not used when checking if a month is disabled.
      // Users should be able to access the min or max month, even if the
      // min/max date is out of bounds (e.g. min is set to Feb 15, Feb should not be disabled).
      minParts: Object.assign(Object.assign({}, this.minParts), { day: null }),
      maxParts: Object.assign(Object.assign({}, this.maxParts), { day: null })
    });
    // The working month should never have swipe disabled.
    // Otherwise the CSS scroll snap will not work and the user
    // can free-scroll the calendar.
    const isWorkingMonth = this.workingParts.month === month && this.workingParts.year === year;
    return (h("div", { class: {
        'calendar-month': true,
        // Prevents scroll snap swipe gestures for months outside of the min/max bounds
        'calendar-month-disabled': !isWorkingMonth && swipeDisabled
      } },
      h("div", { class: "calendar-month-grid" }, getDaysOfMonth(month, year, this.firstDayOfWeek % 7).map((dateObject, index) => {
        const { day, dayOfWeek } = dateObject;
        const referenceParts = { month, day, year };
        const { isActive, isToday, ariaLabel, ariaSelected, disabled } = getCalendarDayState(this.locale, referenceParts, this.activePartsClone, this.todayParts, this.minParts, this.maxParts, this.parsedDayValues);
        return (h("button", { tabindex: "-1", "data-day": day, "data-month": month, "data-year": year, "data-index": index, "data-day-of-week": dayOfWeek, disabled: isCalMonthDisabled || disabled, class: {
            'calendar-day-padding': day === null,
            'calendar-day': true,
            'calendar-day-active': isActive,
            'calendar-day-today': isToday
          }, "aria-selected": ariaSelected, "aria-label": ariaLabel, onClick: () => {
            if (day === null) {
              return;
            }
            this.setWorkingParts(Object.assign(Object.assign({}, this.workingParts), { month,
              day,
              year }));
            this.setActiveParts(Object.assign(Object.assign({}, this.activeParts), { month,
              day,
              year }));
          } }, day));
      }))));
  }
  renderCalendarBody() {
    return (h("div", { class: "calendar-body ion-focusable", ref: el => this.calendarBodyRef = el, tabindex: "0" }, generateMonths(this.workingParts).map(({ month, year }) => {
      return this.renderMonth(month, year);
    })));
  }
  renderCalendar(mode) {
    return (h("div", { class: "datetime-calendar" },
      this.renderCalendarHeader(mode),
      this.renderCalendarBody()));
  }
  renderTimeLabel() {
    const hasSlottedTimeLabel = this.el.querySelector('[slot="time-label"]') !== null;
    if (!hasSlottedTimeLabel && !this.showDefaultTimeLabel) {
      return;
    }
    return (h("slot", { name: "time-label" }, "Time"));
  }
  renderTimePicker(hoursItems, minutesItems, ampmItems, use24Hour) {
    const { color, activePartsClone, workingParts } = this;
    return (h("ion-picker-internal", null,
      h("ion-picker-column-internal", { color: color, value: activePartsClone.hour, items: hoursItems, numericInput: true, onIonChange: (ev) => {
          this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { hour: ev.detail.value }));
          this.setActiveParts(Object.assign(Object.assign({}, activePartsClone), { hour: ev.detail.value }));
          ev.stopPropagation();
        } }),
      h("ion-picker-column-internal", { color: color, value: activePartsClone.minute, items: minutesItems, numericInput: true, onIonChange: (ev) => {
          this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { minute: ev.detail.value }));
          this.setActiveParts(Object.assign(Object.assign({}, activePartsClone), { minute: ev.detail.value }));
          ev.stopPropagation();
        } }),
      !use24Hour && h("ion-picker-column-internal", { color: color, value: activePartsClone.ampm, items: ampmItems, onIonChange: (ev) => {
          const hour = calculateHourFromAMPM(workingParts, ev.detail.value);
          this.setWorkingParts(Object.assign(Object.assign({}, workingParts), { ampm: ev.detail.value, hour }));
          this.setActiveParts(Object.assign(Object.assign({}, activePartsClone), { ampm: ev.detail.value, hour }));
          ev.stopPropagation();
        } })));
  }
  renderTimeOverlay(hoursItems, minutesItems, ampmItems, use24Hour) {
    return [
      h("div", { class: "time-header" }, this.renderTimeLabel()),
      h("button", { class: {
          'time-body': true,
          'time-body-active': this.isTimePopoverOpen
        }, "aria-expanded": "false", "aria-haspopup": "true", onClick: async (ev) => {
          const { popoverRef } = this;
          if (popoverRef) {
            this.isTimePopoverOpen = true;
            popoverRef.present(new CustomEvent('ionShadowTarget', {
              detail: {
                ionShadowTarget: ev.target
              }
            }));
            await popoverRef.onWillDismiss();
            this.isTimePopoverOpen = false;
          }
        } }, getFormattedTime(this.activePartsClone, use24Hour)),
      h("ion-popover", { alignment: "center", translucent: true, overlayIndex: 1, arrow: false, onWillPresent: ev => {
          /**
           * Intersection Observers do not consistently fire between Blink and Webkit
           * when toggling the visibility of the popover and trying to scroll the picker
           * column to the correct time value.
           *
           * This will correctly scroll the element position to the correct time value,
           * before the popover is fully presented.
           */
          const cols = ev.target.querySelectorAll('ion-picker-column-internal');
          // TODO (FW-615): Potentially remove this when intersection observers are fixed in picker column
          cols.forEach(col => col.scrollActiveItemIntoView());
        }, style: {
          '--offset-y': '-10px'
        }, 
        // Allow native browser keyboard events to support up/down/home/end key
        // navigation within the time picker.
        keyboardEvents: true, ref: el => this.popoverRef = el }, this.renderTimePicker(hoursItems, minutesItems, ampmItems, use24Hour))
    ];
  }
  /**
   * Render time picker inside of datetime.
   * Do not pass color prop to segment on
   * iOS mode. MD segment has been customized and
   * should take on the color prop, but iOS
   * should just be the default segment.
   */
  renderTime() {
    const { workingParts, presentation } = this;
    const timeOnlyPresentation = presentation === 'time';
    const use24Hour = is24Hour(this.locale, this.hourCycle);
    const { hours, minutes, am, pm } = generateTime(this.workingParts, use24Hour ? 'h23' : 'h12', this.minParts, this.maxParts, this.parsedHourValues, this.parsedMinuteValues);
    const hoursItems = hours.map(hour => {
      return {
        text: getFormattedHour(hour, use24Hour),
        value: getInternalHourValue(hour, use24Hour, workingParts.ampm)
      };
    });
    const minutesItems = minutes.map(minute => {
      return {
        text: addTimePadding(minute),
        value: minute
      };
    });
    const ampmItems = [];
    if (am) {
      ampmItems.push({
        text: 'AM',
        value: 'am'
      });
    }
    if (pm) {
      ampmItems.push({
        text: 'PM',
        value: 'pm'
      });
    }
    return (h("div", { class: "datetime-time" }, timeOnlyPresentation ? this.renderTimePicker(hoursItems, minutesItems, ampmItems, use24Hour) : this.renderTimeOverlay(hoursItems, minutesItems, ampmItems, use24Hour)));
  }
  renderCalendarViewHeader(mode) {
    const hasSlottedTitle = this.el.querySelector('[slot="title"]') !== null;
    if (!hasSlottedTitle && !this.showDefaultTitle) {
      return;
    }
    return (h("div", { class: "datetime-header" },
      h("div", { class: "datetime-title" },
        h("slot", { name: "title" }, "Select Date")),
      mode === 'md' && h("div", { class: "datetime-selected-date" }, getMonthAndDay(this.locale, this.activeParts))));
  }
  renderDatetime(mode) {
    const { presentation } = this;
    switch (presentation) {
      case 'date-time':
        return [
          this.renderCalendarViewHeader(mode),
          this.renderCalendar(mode),
          this.renderYearView(),
          this.renderTime(),
          this.renderFooter()
        ];
      case 'time-date':
        return [
          this.renderCalendarViewHeader(mode),
          this.renderTime(),
          this.renderCalendar(mode),
          this.renderYearView(),
          this.renderFooter()
        ];
      case 'time':
        return [
          this.renderTime(),
          this.renderFooter()
        ];
      case 'month':
      case 'month-year':
      case 'year':
        return [
          this.renderYearView(),
          this.renderFooter()
        ];
      default:
        return [
          this.renderCalendarViewHeader(mode),
          this.renderCalendar(mode),
          this.renderYearView(),
          this.renderFooter()
        ];
    }
  }
  render() {
    const { name, value, disabled, el, color, isPresented, readonly, showMonthAndYear, presentation, size } = this;
    const mode = getIonMode(this);
    const isMonthAndYearPresentation = presentation === 'year' || presentation === 'month' || presentation === 'month-year';
    const shouldShowMonthAndYear = showMonthAndYear || isMonthAndYearPresentation;
    renderHiddenInput(true, el, name, value, disabled);
    return (h(Host, { "aria-disabled": disabled ? 'true' : null, onFocus: this.onFocus, onBlur: this.onBlur, class: Object.assign({}, createColorClasses(color, {
        [mode]: true,
        ['datetime-presented']: isPresented,
        ['datetime-readonly']: readonly,
        ['datetime-disabled']: disabled,
        'show-month-and-year': shouldShowMonthAndYear,
        [`datetime-presentation-${presentation}`]: true,
        [`datetime-size-${size}`]: true
      })) }, this.renderDatetime(mode)));
  }
  static get is() { return "ion-datetime"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "ios": ["datetime.ios.scss"],
    "md": ["datetime.md.scss"]
  }; }
  static get styleUrls() { return {
    "ios": ["datetime.ios.css"],
    "md": ["datetime.md.css"]
  }; }
  static get properties() { return {
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
      "reflect": false,
      "defaultValue": "'primary'"
    },
    "name": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The name of the control, which is submitted with the form data."
      },
      "attribute": "name",
      "reflect": false,
      "defaultValue": "this.inputId"
    },
    "disabled": {
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
        "text": "If `true`, the user cannot interact with the datetime."
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "readonly": {
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
        "text": "If `true`, the datetime appears normal but is not interactive."
      },
      "attribute": "readonly",
      "reflect": false,
      "defaultValue": "false"
    },
    "min": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The minimum datetime allowed. Value must be a date string\nfollowing the\n[ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),\nsuch as `1996-12-19`. The format does not have to be specific to an exact\ndatetime. For example, the minimum could just be the year, such as `1994`.\nDefaults to the beginning of the year, 100 years ago from today."
      },
      "attribute": "min",
      "reflect": false
    },
    "max": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The maximum datetime allowed. Value must be a date string\nfollowing the\n[ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),\n`1996-12-19`. The format does not have to be specific to an exact\ndatetime. For example, the maximum could just be the year, such as `1994`.\nDefaults to the end of this year."
      },
      "attribute": "max",
      "reflect": false
    },
    "presentation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'date-time' | 'time-date' | 'date' | 'time' | 'month' | 'year' | 'month-year'",
        "resolved": "\"date\" | \"date-time\" | \"month\" | \"month-year\" | \"time\" | \"time-date\" | \"year\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Which values you want to select. `'date'` will show\na calendar picker to select the month, day, and year. `'time'`\nwill show a time picker to select the hour, minute, and (optionally)\nAM/PM. `'date-time'` will show the date picker first and time picker second.\n`'time-date'` will show the time picker first and date picker second."
      },
      "attribute": "presentation",
      "reflect": false,
      "defaultValue": "'date-time'"
    },
    "cancelText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display on the picker's cancel button."
      },
      "attribute": "cancel-text",
      "reflect": false,
      "defaultValue": "'Cancel'"
    },
    "doneText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display on the picker's \"Done\" button."
      },
      "attribute": "done-text",
      "reflect": false,
      "defaultValue": "'Done'"
    },
    "clearText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display on the picker's \"Clear\" button."
      },
      "attribute": "clear-text",
      "reflect": false,
      "defaultValue": "'Clear'"
    },
    "yearValues": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "number[] | number | string",
        "resolved": "number | number[] | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Values used to create the list of selectable years. By default\nthe year values range between the `min` and `max` datetime inputs. However, to\ncontrol exactly which years to display, the `yearValues` input can take a number, an array\nof numbers, or string of comma separated numbers. For example, to show upcoming and\nrecent leap years, then this input's value would be `yearValues=\"2024,2020,2016,2012,2008\"`."
      },
      "attribute": "year-values",
      "reflect": false
    },
    "monthValues": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "number[] | number | string",
        "resolved": "number | number[] | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Values used to create the list of selectable months. By default\nthe month values range from `1` to `12`. However, to control exactly which months to\ndisplay, the `monthValues` input can take a number, an array of numbers, or a string of\ncomma separated numbers. For example, if only summer months should be shown, then this\ninput value would be `monthValues=\"6,7,8\"`. Note that month numbers do *not* have a\nzero-based index, meaning January's value is `1`, and December's is `12`."
      },
      "attribute": "month-values",
      "reflect": false
    },
    "dayValues": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "number[] | number | string",
        "resolved": "number | number[] | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Values used to create the list of selectable days. By default\nevery day is shown for the given month. However, to control exactly which days of\nthe month to display, the `dayValues` input can take a number, an array of numbers, or\na string of comma separated numbers. Note that even if the array days have an invalid\nnumber for the selected month, like `31` in February, it will correctly not show\ndays which are not valid for the selected month."
      },
      "attribute": "day-values",
      "reflect": false
    },
    "hourValues": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "number[] | number | string",
        "resolved": "number | number[] | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Values used to create the list of selectable hours. By default\nthe hour values range from `0` to `23` for 24-hour, or `1` to `12` for 12-hour. However,\nto control exactly which hours to display, the `hourValues` input can take a number, an\narray of numbers, or a string of comma separated numbers."
      },
      "attribute": "hour-values",
      "reflect": false
    },
    "minuteValues": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "number[] | number | string",
        "resolved": "number | number[] | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Values used to create the list of selectable minutes. By default\nthe minutes range from `0` to `59`. However, to control exactly which minutes to display,\nthe `minuteValues` input can take a number, an array of numbers, or a string of comma\nseparated numbers. For example, if the minute selections should only be every 15 minutes,\nthen this input value would be `minuteValues=\"0,15,30,45\"`."
      },
      "attribute": "minute-values",
      "reflect": false
    },
    "locale": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The locale to use for `ion-datetime`. This\nimpacts month and day name formatting.\nThe `'default'` value refers to the default\nlocale set by your device."
      },
      "attribute": "locale",
      "reflect": false,
      "defaultValue": "'default'"
    },
    "firstDayOfWeek": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The first day of the week to use for `ion-datetime`. The\ndefault value is `0` and represents Sunday."
      },
      "attribute": "first-day-of-week",
      "reflect": false,
      "defaultValue": "0"
    },
    "value": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string | null",
        "resolved": "null | string | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The value of the datetime as a valid ISO 8601 datetime string."
      },
      "attribute": "value",
      "reflect": false
    },
    "showDefaultTitle": {
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
        "text": "If `true`, a header will be shown above the calendar\npicker. On `ios` mode this will include the\nslotted title, and on `md` mode this will include\nthe slotted title and the selected date."
      },
      "attribute": "show-default-title",
      "reflect": false,
      "defaultValue": "false"
    },
    "showDefaultButtons": {
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
        "text": "If `true`, the default \"Cancel\" and \"OK\" buttons\nwill be rendered at the bottom of the `ion-datetime`\ncomponent. Developers can also use the `button` slot\nif they want to customize these buttons. If custom\nbuttons are set in the `button` slot then the\ndefault buttons will not be rendered."
      },
      "attribute": "show-default-buttons",
      "reflect": false,
      "defaultValue": "false"
    },
    "showClearButton": {
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
        "text": "If `true`, a \"Clear\" button will be rendered alongside\nthe default \"Cancel\" and \"OK\" buttons at the bottom of the `ion-datetime`\ncomponent. Developers can also use the `button` slot\nif they want to customize these buttons. If custom\nbuttons are set in the `button` slot then the\ndefault buttons will not be rendered."
      },
      "attribute": "show-clear-button",
      "reflect": false,
      "defaultValue": "false"
    },
    "showDefaultTimeLabel": {
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
        "text": "If `true`, the default \"Time\" label will be rendered\nfor the time selector of the `ion-datetime` component.\nDevelopers can also use the `time-label` slot\nif they want to customize this label. If a custom\nlabel is set in the `time-label` slot then the\ndefault label will not be rendered."
      },
      "attribute": "show-default-time-label",
      "reflect": false,
      "defaultValue": "true"
    },
    "hourCycle": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'h23' | 'h12'",
        "resolved": "\"h12\" | \"h23\" | undefined",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The hour cycle of the `ion-datetime`. If no value is set, this is\nspecified by the current locale."
      },
      "attribute": "hour-cycle",
      "reflect": false
    },
    "size": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'cover' | 'fixed'",
        "resolved": "\"cover\" | \"fixed\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "If `cover`, the `ion-datetime` will expand to cover the full width of its container.\nIf `fixed`, the `ion-datetime` will have a fixed width."
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'fixed'"
    }
  }; }
  static get states() { return {
    "showMonthAndYear": {},
    "activeParts": {},
    "workingParts": {},
    "isPresented": {},
    "isTimePopoverOpen": {}
  }; }
  static get events() { return [{
      "method": "ionCancel",
      "name": "ionCancel",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the datetime selection was cancelled."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "ionChange",
      "name": "ionChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the value (selected date) has changed."
      },
      "complexType": {
        "original": "DatetimeChangeEventDetail",
        "resolved": "DatetimeChangeEventDetail",
        "references": {
          "DatetimeChangeEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }, {
      "method": "ionFocus",
      "name": "ionFocus",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the datetime has focus."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "ionBlur",
      "name": "ionBlur",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the datetime loses focus."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "ionStyle",
      "name": "ionStyle",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [{
            "name": "internal",
            "text": undefined
          }],
        "text": "Emitted when the styles change."
      },
      "complexType": {
        "original": "StyleEventDetail",
        "resolved": "StyleEventDetail",
        "references": {
          "StyleEventDetail": {
            "location": "import",
            "path": "../../interface"
          }
        }
      }
    }]; }
  static get methods() { return {
    "confirm": {
      "complexType": {
        "signature": "(closeOverlay?: boolean) => Promise<void>",
        "parameters": [{
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
        "text": "Confirms the selected datetime value, updates the\n`value` property, and optionally closes the popover\nor modal that the datetime was presented in.",
        "tags": []
      }
    },
    "reset": {
      "complexType": {
        "signature": "(startDate?: string | undefined) => Promise<void>",
        "parameters": [{
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
        "text": "Resets the internal state of the datetime but does not update the value.\nPassing a valid ISO-8601 string will reset the state of the component to the provided date.\nIf no value is provided, the internal state will be reset to today.",
        "tags": []
      }
    },
    "cancel": {
      "complexType": {
        "signature": "(closeOverlay?: boolean) => Promise<void>",
        "parameters": [{
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
        "text": "Emits the ionCancel event and\noptionally closes the popover\nor modal that the datetime was\npresented in.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "disabled",
      "methodName": "disabledChanged"
    }, {
      "propName": "min",
      "methodName": "minChanged"
    }, {
      "propName": "max",
      "methodName": "maxChanged"
    }, {
      "propName": "yearValues",
      "methodName": "yearValuesChanged"
    }, {
      "propName": "monthValues",
      "methodName": "monthValuesChanged"
    }, {
      "propName": "dayValues",
      "methodName": "dayValuesChanged"
    }, {
      "propName": "hourValues",
      "methodName": "hourValuesChanged"
    }, {
      "propName": "minuteValues",
      "methodName": "minuteValuesChanged"
    }, {
      "propName": "activeParts",
      "methodName": "activePartsChanged"
    }, {
      "propName": "value",
      "methodName": "valueChanged"
    }]; }
}
let datetimeIds = 0;
