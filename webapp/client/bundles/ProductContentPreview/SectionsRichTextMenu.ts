import { toggleMark, setBlockType } from 'prosemirror-commands';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { Plugin } from 'prosemirror-state';

class MenuView {
  public items: any[];
  public editorView: any;
  public dom: HTMLDivElement;

  constructor(items: any[], editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.querySelector('.basic-tab.rich-text-editor-toolbar') as HTMLDivElement;
    // [...this.items].reverse().forEach(({ dom }) => this.dom.insertBefore(dom, this.dom.firstChild));
    this.update();

    console.log('setting up "mousedown" handler', (new Error()).stack);

    this.dom.addEventListener('mousedown', (e) => {
      console.log('e', e);
      e.preventDefault();
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

export const createMenuPluginForBasicTab = () => {
  console.log('createMenuPluginForBasicTab called');

  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  });

  console.log('schema', schema);
  console.log('mySchema', mySchema);

  const tb = document.querySelector('.basic-tab.rich-text-editor-toolbar');

  let menu = menuPlugin([
    // { command: toggleMark(mySchema.marks.strong), dom: tb.querySelector('[role=button][aria-label=Bold]') },
    // { command: toggleMark(mySchema.marks.em), dom: tb.querySelector('[role=button][aria-label=Italic]') },
    { command: toggleMark(mySchema.marks.strong), dom: tb.children[0] },
    { command: toggleMark(mySchema.marks.em), dom: tb.children[1] },
    {
      command: setBlockType(mySchema.nodes.heading, { level: 1 }),
      dom: tb.children[4].querySelector('[role=menu]').children[0],
    },
  ]);

  return menu;
};
