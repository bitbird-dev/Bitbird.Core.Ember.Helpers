import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | pad-start', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('default padding', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{pad-start inputValue 10}}`);
    assert.equal(this.element.textContent, '      1234');
  });

  test('custom padString with single char', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{pad-start inputValue 10 '*'}}`);
    assert.equal(this.element.textContent, '******1234');
  });

  test('custom padString with multiple chars', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{pad-start inputValue 10 '9876543210'}}`);
    assert.equal(this.element.textContent, '5432101234');
  });
});
