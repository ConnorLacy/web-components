import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'check-box',
  styleUrl: 'check-box.css',
  shadow: true,
})
export class CheckBox implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
