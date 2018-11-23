import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | pad-end', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('pad end', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{pad-end inputValue 10 '*'}}`);
    assert.equal(this.element.textContent.trim(), '1234******');
  });
});
