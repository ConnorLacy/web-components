import { r as registerInstance, h, H as Host } from './index-b7a24656.js';

const checkBoxCss = ":host{display:block}";

const CheckBox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
};
CheckBox.style = checkBoxCss;

export { CheckBox as check_box };
