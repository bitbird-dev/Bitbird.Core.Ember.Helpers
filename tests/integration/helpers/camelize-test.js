import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | camelize', function(hooks) {
  setupRenderingTest(hooks);

  test('string', async function(assert) {
    this.set('inputValue', 'Das_ist.ein-test');
    await render(hbs`{{camelize inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'DasIstEinTest');
  });
});
