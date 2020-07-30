import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ead04436.js';

const checkMarkSvg = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01MTIgNTguNjY3OTY5YzAtMzIuMzYzMjgxLTI2LjMwNDY4OC01OC42Njc5NjktNTguNjY3OTY5LTU4LjY2Nzk2OWgtMzk0LjY2NDA2MmMtMzIuMzYzMjgxIDAtNTguNjY3OTY5IDI2LjMwNDY4OC01OC42Njc5NjkgNTguNjY3OTY5djM5NC42NjQwNjJjMCAzMi4zNjMyODEgMjYuMzA0Njg4IDU4LjY2Nzk2OSA1OC42Njc5NjkgNTguNjY3OTY5aDM5NC42NjQwNjJjMzIuMzYzMjgxIDAgNTguNjY3OTY5LTI2LjMwNDY4OCA1OC42Njc5NjktNTguNjY3OTY5em0wIDAiIGZpbGw9IiM0Y2FmNTAiLz48cGF0aCBkPSJtMzg1Ljc1IDE3MS41ODU5MzhjOC4zMzk4NDQgOC4zMzk4NDMgOC4zMzk4NDQgMjEuODIwMzEyIDAgMzAuMTY0MDYybC0xMzguNjY3OTY5IDEzOC42NjQwNjJjLTQuMTYwMTU2IDQuMTYwMTU3LTkuNjIxMDkzIDYuMjUzOTA3LTE1LjA4MjAzMSA2LjI1MzkwN3MtMTAuOTIxODc1LTIuMDkzNzUtMTUuMDgyMDMxLTYuMjUzOTA3bC02OS4zMzIwMzEtNjkuMzMyMDMxYy04LjM0Mzc1LTguMzM5ODQzLTguMzQzNzUtMjEuODI0MjE5IDAtMzAuMTY0MDYyIDguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDBsNTQuMjUgNTQuMjUgMTIzLjU4NTkzOC0xMjMuNTgyMDMxYzguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDB6bTAgMCIgZmlsbD0iI2ZhZmFmYSIvPjwvc3ZnPg==';

const checkBoxCss = ":host{display:flex;align-items:center;box-shadow:0px 0px 1px black;border-radius:10px;width:250px;height:50px}:host img{padding:10px;width:2em;height:2em}:host img.checked{opacity:0}";

const CheckBox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Unique identifier for each checkbox
         * Benefits:
         * - Easy injection into aria labeledby
         * - Use it for internal event ingestion
         */
        this.uuid = `check-box-item-${check_box_id++}`;
        /**
         * Tracks wether this component has been checked or not.
         * Unchecked by default. Can be instantiated with a different value
         * because prop is mutable.
         */
        this.checked = false;
        /**
         * Internal handler for emitting changed event. Called by a listener
         */
        this.emitChangedEvent = () => {
            this.changed.emit({
                type: "checkbox",
                checked: !this.checked,
                uuid: this.uuid,
            });
        };
        /**
         * Emit a changed event when checkbox is clicked
         */
        this.handleClick = () => {
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
        this.handleKeyDown = (e) => {
            if (e.key == "Space") {
                e.stopImmediatePropagation();
                this.emitChangedEvent();
            }
        };
        this.changed = createEvent(this, "changed", 7);
        this.checkboxChecked = createEvent(this, "checkboxChecked", 7);
        this.checkboxUnchecked = createEvent(this, "checkboxUnchecked", 7);
    }
    /**
     * Watch for changes in `checked` Prop
     */
    handleCheckboxChanged(prev, next) {
        if (next === true && prev === false) {
            this.checkboxChecked.emit();
            return;
        }
        if (next === false && prev === true) {
            this.checkboxUnchecked.emit();
        }
    }
    /**
     * Events in the DOM bubble up to the Window if not caught. Frameworks like
     * React will give the developer the ability to manage events and catch them
     * before they bubble up to the window. If it makes it to the window, it is
     * not managed, so we will handle the event internally -- allowing the
     * component to stand alone.
     * @param e
     */
    handleChanged(e) {
        // Is this a checkbox event?
        const isCheckbox = typeof e.detail.type === "string" && e.detail.type === "checkbox";
        // Does this event belong to this component instance?
        const isThisInstance = typeof e.detail.uuid == "string" && e.detail.uuid === this.uuid;
        // Does it have a checked property?
        const hasCheckedProperty = typeof e.detail.checked === "boolean";
        // If all conditions are met, we know this event needs to be handled internally and it
        // belongs to this specific instance. Update prop manually & internally
        if (typeof e.detail != undefined &&
            isCheckbox &&
            isThisInstance &&
            hasCheckedProperty) {
            this.checked = e.detail.checked;
        }
    }
    render() {
        return (h(Host, { class: {
                checked: this.checked,
            }, onKeydown: this.handleKeyDown, onClick: this.handleClick }, h("div", { role: "checkbox", "aria-checked": this.checked, tabindex: "0", "aria-labelledby": this.uuid, class: "checkbox-container", part: "checkbox-container" }, h("img", { class: { checked: !this.checked }, src: checkMarkSvg })), h("label", { id: this.uuid, class: "label-container", part: "label-container" }, h("slot", null)), h("div", { class: "text-container", part: "text-container" }, h("slot", { name: "text-container" }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckboxChanged"]
    }; }
};
let check_box_id = 0;
CheckBox.style = checkBoxCss;

export { CheckBox as check_box };
