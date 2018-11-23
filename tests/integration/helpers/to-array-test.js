import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-array', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('basic', async function(assert) {
    await render(hbs`{{to-array 'Tomster' 'Ember' null}}`);
    assert.equal(this.element.textContent.trim(), 'Tomster,Ember,');
  });
});
