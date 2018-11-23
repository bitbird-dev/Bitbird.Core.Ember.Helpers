import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | to-string', function(hooks) {
  setupRenderingTest(hooks);

  test('Number', async function(assert) {
    this.set('inputValue', 1234);
    await render(hbs`{{to-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), '1234', 'Integer to string');

    this.set('inputValue', 1234.54);
    await render(hbs`{{to-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), (1234.54).toString(), 'Float to string');
  });

  test('Object', async function(assert) {
    this.set('inputValue', {});
    await render(hbs`{{to-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), '[object Object]', "JS default toString behavior");

    this.set('inputValue', { name: 'Tomster', toString() { return this.name; } });
    await render(hbs`{{to-string inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Tomster', 'Object with toString()');

    this.set('inputValue', {name: 'Tomster'});
    await render(hbs`{{to-string inputValue true}}`);
    assert.equal(this.element.textContent.trim(), '{"name":"Tomster"}', 'Object with forced JSON flag');

    this.set('inputValue', { name: 'Tomster', toString() { return this.name; } });
    await render(hbs`{{to-string inputValue true}}`);
    assert.equal(this.element.textContent.trim(), '{"name":"Tomster"}', 'Object with toString() with forced JSON flag');
  });
});
