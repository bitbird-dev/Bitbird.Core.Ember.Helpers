import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | percentage', function(hooks) {
  setupRenderingTest(hooks);

  test('format number', async function(assert) {
    this.set('inputValue', 0.98);
    await render(hbs`{{percentage inputValue}}`);
    assert.equal(this.element.textContent.trim(), '98');

    this.set('inputValue', 0.9814);
    await render(hbs`{{percentage inputValue}}`);
    assert.equal(this.element.textContent.trim(), '98.14');

    this.set('inputValue', "984");
    await render(hbs`{{percentage inputValue}}`);
    assert.equal(this.element.textContent.trim(), '98400');
  });

  test('calculation', async function(assert) {
    await render(hbs`{{percentage 1 4}}`);
    assert.equal(this.element.textContent.trim(), '25');

    await render(hbs`{{percentage 1 3}}`);
    assert.equal(this.element.textContent.trim(), (100/1/3).toString());
  });
});
