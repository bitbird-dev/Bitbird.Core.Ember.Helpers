import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | and', function(hooks) {
  setupRenderingTest(hooks);

  test('mixed types', async function(assert) {
    this.setProperties({
      value1: 1,
      value2: true,
      value3: "Tomster",
      value4: [],
      value5: function() {}
    });
    await render(hbs`{{and value1 value2 value3 value4 value5}}`);
    assert.equal(this.element.textContent.trim(), 'true', "Five types with value are positive");
  });
});
