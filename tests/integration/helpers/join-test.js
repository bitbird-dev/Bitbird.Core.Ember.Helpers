import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | join', function(hooks) {
  setupRenderingTest(hooks);

  test('default string join', async function(assert) {
    this.set('value', ['aaa','bbb','ccc','ddd','eee','fff']);
    await render(hbs`{{join value}}`);
    assert.equal(this.element.textContent.trim(), 'aaa, bbb, ccc, ddd, eee, fff');

    this.set('value', 'aaa, bbb, ccc, ddd, eee, fff');
    await render(hbs`{{join value}}`);
    assert.equal(this.element.textContent.trim(), 'aaa, bbb, ccc, ddd, eee, fff');
  });

  test('custom separator string join', async function(assert) {
    this.set('value', ['aaa','bbb','ccc','ddd','eee','fff']);
    await render(hbs`{{join value separator="..."}}`);
    assert.equal(this.element.textContent.trim(), 'aaa...bbb...ccc...ddd...eee...fff');
  });
});
