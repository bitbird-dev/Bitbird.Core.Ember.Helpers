import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import ArrayProxy from '@ember/array/proxy';

module('Integration | Helper | instance-of', function(hooks) {
  setupRenderingTest(hooks);

  test('instance-of object', async function(assert) {
    this.set('value', { a: 0 });
    await render(hbs`{{instance-of value 'object'}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('value', null);
    await render(hbs`{{instance-of value 'object'}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('instance-of array', async function(assert) {
    this.set('value', [1,2,3]);
    await render(hbs`{{instance-of value 'array'}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('value', ArrayProxy.create());
    await render(hbs`{{instance-of value 'array'}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('value', "Tomster");
    await render(hbs`{{instance-of value 'array'}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });
});
