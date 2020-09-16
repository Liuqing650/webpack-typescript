export class App {
  
  findRoot(): HTMLElement {
    const rootDom: HTMLElement = document.getElementById('root');
    return rootDom;
  }

  appendText(text: string, dom: HTMLElement) {
    dom.innerHTML = text;
  }

  appendDom(source: HTMLElement, target: HTMLElement) {
    target.appendChild(source);
  }

  render() {
    const dom = this.findRoot();
    const el = document.createElement('h2');
    this.appendText('hello word', el);
    this.appendDom(el, dom);
  }
}

const app = new App();

window.onload = function yoha() {
  app.render();
}
