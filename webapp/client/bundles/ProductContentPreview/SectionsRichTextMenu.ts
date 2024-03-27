import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { wrapInList } from 'prosemirror-schema-list';
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
      editorView.focus();
      items.forEach(({ command, dom, close }) => {
        if (dom.contains(e.target)) {
          command(editorView.state, editorView.dispatch);
          if (close) close();
        }
      });
    });
  }

  update() {
    (this.items as { command: any; dom: HTMLElement }[]).forEach(({ command, dom }) => {
      let active = command(this.editorView.state, null);
      dom.setAttribute('aria-disabled', !active ? 'true' : 'false');
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

export const createMenuPluginForBasicTab = (mySchema) => {
  console.log('mySchema', mySchema);

  const tb = document.querySelector('.basic-tab.rich-text-editor-toolbar');

  let menu = menuPlugin([
    /* bold */
    { command: toggleMark(mySchema.marks.strong), dom: tb.children[0] },
    /* italic */
    { command: toggleMark(mySchema.marks.em), dom: tb.children[1] },
    /* Heading 1 */
    {
      command: setBlockType(mySchema.nodes.heading, { level: 2 }),
      dom: tb.children[4].querySelector('[role=menu]').children[0],
      close: () => {
        tb.children[4].removeAttribute('open');
      },
    },
    /* Heading 2 */
    {
      command: setBlockType(mySchema.nodes.heading, { level: 3 }),
      dom: tb.children[4].querySelector('[role=menu]').children[1],
      close: () => {
        tb.children[4].removeAttribute('open');
      },
    },
    /* Heading 3 */
    {
      command: setBlockType(mySchema.nodes.heading, { level: 4 }),
      dom: tb.children[4].querySelector('[role=menu]').children[2],
      close: () => {
        tb.children[4].removeAttribute('open');
      },
    },
    /* Code Block */
    { command: setBlockType(mySchema.nodes.code_block), dom: tb.children[5] },
    /* Bullet List */
    { command: wrapInList(mySchema.nodes.bullet_list), dom: tb.children[6] },
    /* Number List */
    { command: wrapInList(mySchema.nodes.ordered_list), dom: tb.children[7] },
    /* Horizontal Rule */
    {
      command: (state, dispatch) => {
        const available = true;
        if (dispatch) dispatch(state.tr.replaceSelectionWith(mySchema.nodes.horizontal_rule.create()));
        return available;
      },
      dom: tb.children[8],
    },
    /* Blockquote */
    { command: wrapIn(mySchema.nodes.blockquote), dom: tb.children[9] },
    /* Undo */
    { command: undo, dom: tb.children[16].children[0] },
    /* Redo */
    { command: redo, dom: tb.children[16].children[1] },
  ]);

  return menu;
};
