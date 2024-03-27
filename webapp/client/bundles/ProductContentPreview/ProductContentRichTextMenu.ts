import { toggleMark } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

class MenuView {
  public items: any[];
  public editorView: any;
  public dom: HTMLDivElement;

  constructor(items: any[], editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.querySelector('.content-tab.rich-text-editor-toolbar') as HTMLDivElement;
    [...this.items].reverse().forEach(({ dom }) => this.dom.insertBefore(dom, this.dom.firstChild));
    this.update();

    this.dom.addEventListener('mousedown', (e) => {
      e.preventDefault();
      editorView.focus();
      items.forEach(({ command, dom }) => {
        if (dom.contains(e.target)) command(editorView.state, editorView.dispatch, editorView);
      });
    });
  }

  update() {
    this.items.forEach(({ command, dom }) => {
      let active = command(this.editorView.state, null, this.editorView);
      // dom.style.display = active ? '' : 'none';
    });
  }

  destroy() {
    this.dom.remove();
  }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let menuView = new MenuView(items, editorView);
      return menuView;
    },
  });
}

function iconBold() {
  let span = document.createElement('span');
  span.setAttribute('role', 'button');
  span.setAttribute('aria-pressed', 'false');
  span.setAttribute('aria-label', 'Bold');
  let innerSpan = document.createElement('span');
  innerSpan.classList.add('icon', 'icon-bold');
  span.appendChild(innerSpan);
  return span;
}

function iconItalic() {
  let span = document.createElement('span');
  span.setAttribute('role', 'button');
  span.setAttribute('aria-pressed', 'false');
  span.setAttribute('aria-label', 'Italic');
  let innerSpan = document.createElement('span');
  innerSpan.classList.add('icon', 'icon-italic');
  span.appendChild(innerSpan);
  return span;
}

export const createMenuPlugin = (mySchema) => {
  let menu = menuPlugin([
    { command: toggleMark(mySchema.marks.strong), dom: iconBold() },
    { command: toggleMark(mySchema.marks.em), dom: iconItalic() },
  ]);
  return menu;
};
