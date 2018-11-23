import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | name-for', function(hooks) {
  setupRenderingTest(hooks);

  test('Simple data types', async function(assert) {
    this.set('inputValue', '1234');
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'String');

    this.set('inputValue', 1234);
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Number');
  });

  test('Object', async function(assert) {
    this.set('inputValue', new Date());
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Date');

    this.set('inputValue', {});
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Object');
  });

  test('Model', async function(assert) {
    /*this.set('inputValue', DS.Model.create());
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Date');*/

    this.set('inputValue', {});
    await render(hbs`{{name-for inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Object');
  });
});
