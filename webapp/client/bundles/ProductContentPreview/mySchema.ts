import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';

/**
 * shared schema for both the basic tab's rich text editor and the preview pane's rich text editor
 *
 * the schema needs to be shared between ProseMirror editors in order to be able to apply the same transaction to both editors
 */
export const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});
