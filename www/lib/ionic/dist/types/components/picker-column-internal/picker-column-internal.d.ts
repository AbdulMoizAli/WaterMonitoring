import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { Color } from '../../interface';
import { PickerColumnItem } from './picker-column-internal-interfaces';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 * @internal
 */
export declare class PickerColumnInternal implements ComponentInterface {
  private destroyScrollListener?;
  private hapticsStarted;
  private isColumnVisible;
  isActive: boolean;
  el: HTMLIonPickerColumnInternalElement;
  /**
   * A list of options to be displayed in the picker
   */
  items: PickerColumnItem[];
  /**
   * The selected option in the picker.
   */
  value?: string | number;
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  color?: Color;
  /**
   * If `true`, tapping the picker will
   * reveal a number input keyboard that lets
   * the user type in values for each picker
   * column. This is useful when working
   * with time pickers.
   *
   * @internal
   */
  numericInput: boolean;
  /**
   * Emitted when the value has changed.
   */
  ionChange: EventEmitter<PickerColumnItem>;
  valueChange(): void;
  /**
   * Only setup scroll listeners
   * when the picker is visible, otherwise
   * the container will have a scroll
   * height of 0px.
   */
  componentWillLoad(): void;
  componentDidRender(): void;
  /** @internal  */
  scrollActiveItemIntoView(): Promise<void>;
  private centerPickerItemInView;
  /**
   * When ionInputModeChange is emitted, each column
   * needs to check if it is the one being made available
   * for text entry.
   */
  private inputModeChange;
  /**
   * When the column scrolls, the component
   * needs to determine which item is centered
   * in the view and will emit an ionChange with
   * the item object.
   */
  private initializeScrollListener;
  get activeItem(): HTMLElement | null;
  render(): any;
}
