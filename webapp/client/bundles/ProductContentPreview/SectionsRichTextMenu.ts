import { setBlockType, toggleMark } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

class MenuView {
  public items: any[];
  public editorView: any;
  public dom: HTMLDivElement;

  constructor(items: any[], editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.querySelector('.basic-tab.rich-text-editor-toolbar') as HTMLDivElement;
    this.update();

    this.dom.addEventListener('mousedown', (e) => {
      console.log('e', e);
      e.preventDefault();
      items.forEach(({ command, dom }) => {
        if (dom.contains(e.target)) {
          console.log('contains', command);
          command(editorView.state, editorView.dispatch);
        }
      });
    });
  }

  update() {
    this.items.forEach(({ name, command, dom, nodeType, options }) => {
      if (!nodeType) {
        let active = command(this.editorView.state, null);
        dom.style.display = active ? '' : 'none';
        console.log(`enable ${name}?`, active ? 'yes' : 'no');
      } else {
        let active = command(this.editorView.state);
        console.log(`enable ${name}?`, active ? 'yes' : 'no');
        // let { $from, to, node } = this.editorView.selection as NodeSelection;
        // if (node) {
        //   return node.hasMarkup(nodeType, options.attrs);
        // }
        // return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
      }
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
  span.tabIndex = 0;
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
  span.tabIndex = 0;
  let innerSpan = document.createElement('span');
  innerSpan.classList.add('icon', 'icon-italic');
  span.appendChild(innerSpan);
  return span;
}

export const createMenuPluginForBasicTab = (mySchema) => {
  console.log('mySchema', mySchema);

  const tb = document.querySelector('.basic-tab.rich-text-editor-toolbar');

  let menu = menuPlugin([
    { name: 'bold', command: toggleMark(mySchema.marks.strong), dom: tb.children[0] },
    { name: 'italics', command: toggleMark(mySchema.marks.em), dom: tb.children[1] },
    {
      name: 'H1',
      command: setBlockType(mySchema.nodes.heading, { level: 1 }),
      dom: tb.children[4].querySelector('[role=menu]').children[0],
      nodeType: mySchema.nodes.heading,
      options: { attrs: { level: 1 } },
    },
  ]);

  return menu;
};
