import {
  Component,
  Element,
  Event,
  Host,
  h,
  Prop,
  EventEmitter,
  Listen,
  Watch,
} from "@stencil/core";
import { CheckboxChecked } from "../../interface";
import checkMark from "./checkMark.svg"
@Component({
  tag: "check-box",
  styleUrl: "check-box.css",
  shadow: true,
})
export class CheckBox {
  /**
   * Unique identifier for each checkbox
   * Benefits:
   * - Easy injection into aria labeledby
   * - Use it for internal event ingestion
   */
  private uuid = `check-box-item-${check_box_id++}`;

  @Element() el!: HTMLCheckBoxElement;

  /**
   * Tracks wether this component has been checked or not.
   * Unchecked by default. Can be instantiated with a different value
   * because prop is mutable.
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * Watch for changes in `checked` Prop
   */
  @Watch("checked")
  handleCheckboxChanged(prev: boolean, next: boolean) {
    if (next === true && prev === false) {
      this.checkboxChecked.emit();
      return;
    }
    if (next === false && prev === true) {
      this.checkboxUnchecked.emit();
    }
  }

  /**
   * This event should be emitted when the checkbox ingests input
   * from user
   */
  @Event() changed!: EventEmitter<CheckboxChecked>;
  /**
   * Internal event not exposed
   */
  @Event() checkboxChecked!: EventEmitter<void>;
  /**
   * Internal Event not exposed
   */
  @Event() checkboxUnchecked!: EventEmitter<void>;

  /**
   * Internal handler for emitting changed event. Called by a listener
   */
  private emitChangedEvent = () => {
    this.changed.emit({
      type: "checkbox",
      checked: !this.checked,
      uuid: this.uuid,
    });
  };

  /**
   * Events in the DOM bubble up to the Window if not caught. Frameworks like
   * React will give the developer the ability to manage events and catch them
   * before they bubble up to the window. If it makes it to the window, it is
   * not managed, so we will handle the event internally -- allowing the
   * component to stand alone.
   * @param e
   */
  @Listen("changed", { target: "window" })
  handleChanged(e: CustomEvent<any>) {
    // Is this a checkbox event?
    const isCheckbox =
      typeof e.detail.type === "string" && e.detail.type === "checkbox";
    // Does this event belong to this component instance?
    const isThisInstance =
      typeof e.detail.uuid == "string" && e.detail.uuid === this.uuid;
    // Does it have a checked property?
    const hasCheckedProperty = typeof e.detail.checked === "boolean";

    // If all conditions are met, we know this event needs to be handled internally and it
    // belongs to this specific instance. Update prop manually & internally
    if (
      typeof e.detail != undefined &&
      isCheckbox &&
      isThisInstance &&
      hasCheckedProperty
    ) {
      this.checked = e.detail.checked;
    }
  }

  /**
   * Emit a changed event when checkbox is clicked
   */
  private handleClick = () => {
    this.emitChangedEvent();
  };

  /**
   * This handler aims to provide functionality existing in standard HTML input
   * elements of type "checkbox". We want to make sure it functions the same way.
   * When a key press is detected and it is space, immediately stop the event from
   * propogating up the DOM tree. We will handle this event internally through the
   * 'changed' event emitter.
   * @param e
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Space") {
      e.stopImmediatePropagation();
      this.emitChangedEvent();
    }
  };

  render() {
    return (
      <Host
        class={{
          checked: this.checked,
        }}
        onKeydown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        <div
          role="checkbox"
          aria-checked={this.checked}
          tabindex="0"
          aria-labelledby={this.uuid}
          class="checkbox-container"
          part="checkbox-container"
        >
          <img class={{checked: !this.checked}} src={checkMark}/>
        </div>
        <label id={this.uuid} class="label-container" part="label-container">
          <slot />
        </label>
        <div class="text-container" part="text-container">
          <slot name="text-container" />
        </div>
      </Host>
    );
  }
}

let check_box_id = 0;
