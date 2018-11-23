import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | compare', function(hooks) {
  setupRenderingTest(hooks);

  let stringSource = 'A framework for ambitious web developers.';
  let stringArraySource = ['A framework', 'for', 'ambitious', 'web developers.'];
  let object1 = { id: 0, value: 'A' },
    object2 = { id: 1, value: 'framework' };
  //let objectArraySource = [object1, object2, { id: 2, value: 'for' }, { id: 3, value: 'ambituous' }, { id: 4, value: 'web developers.' }];

  test('Default integer comparison', async function(assert) {
    this.setProperties({
      target: 1234,
      value: 1234
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('Default integer comparison with no match', async function(assert) {
    this.setProperties({
      target: 1234,
      value: 5678
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('Default string comparison', async function(assert) {
    this.setProperties({
      target: stringSource,
      value: stringSource
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('Default string comparison with no match', async function(assert) {
    this.setProperties({
      target: stringSource,
      value: stringSource + " "
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('Default string array comparison', async function(assert) {
    this.setProperties({
      target: stringArraySource,
      value: stringArraySource
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('Default string array comparison with no match', async function(assert) {
    this.setProperties({
      target: stringArraySource,
      value: ['A framework', 'for', 'ambitious', 'web developers.']
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('Default date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    date2 = new Date(2002,2,1);
    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  // ==
  test('== integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('== string comparison', async function(assert) {
    this.setProperties({
      target: "456",
      value: "456"
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('== bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('== object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('== date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    date1 = new Date(2100,0,1);
    date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2100,0,1);
    date2 = null;

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '==' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  // ===
  test('=== integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('=== string comparison', async function(assert) {
    this.setProperties({
      target: "456",
      value: "456"
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('=== bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('=== object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('=== date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    date1 = new Date(2100,0,1);
    date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2100,0,1);
    date2 = null;

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '===' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  // !=
  test('!= integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 456
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!= string comparison', async function(assert) {
    this.setProperties({
      target: "123",
      value: "456"
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!= bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!= object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!= date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    date1 = new Date(2000,0,1);
    date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2100,0,1);
    date2 = null;

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  // !==
  test('!== integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 456
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!== string comparison', async function(assert) {
    this.setProperties({
      target: "123",
      value: "456"
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!== bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!== object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('!== date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    date1 = new Date(2000,0,1);
    date2 = new Date(2000,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2100,0,1);
    date2 = null;

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '!==' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  // >
  test('> integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 122
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('> string comparison', async function(assert) {
    this.setProperties({
      target: "123",
      value: "122"
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('> bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('> object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('> date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2001,0,1);
    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '>' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  // >=
  test('>= integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 124
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: 123,
      value: 122
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('>= string comparison', async function(assert) {
    this.setProperties({
      target: "456",
      value: "455"
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: "456",
      value: "456"
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: "456",
      value: "457"
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('>= bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: false,
      value: true
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('>= object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: null,
      value: object2
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: object1,
      value: null
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: undefined,
      value: null
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: null,
      value: null
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('>= date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2000,0,1);

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '>=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  // <
  test('< integer comparison', async function(assert) {
    this.setProperties({
      target: 122,
      value: 123
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: 122,
      value: 122
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: 123,
      value: 122
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('< string comparison', async function(assert) {
    this.setProperties({
      target: "122",
      value: "123"
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: "122",
      value: "122"
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: "123",
      value: "122"
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('< bool comparison', async function(assert) {
    this.setProperties({
      target: false,
      value: true
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('< object comparison with no match', async function(assert) {
    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: object2,
      value: object2
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: object2,
      value: object1
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('< date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2000,0,1);

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '<' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  /** <= **/
  test('<= integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 124
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: 123,
      value: 122
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('<= string comparison', async function(assert) {
    this.setProperties({
      target: "123",
      value: "124"
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: "123",
      value: "122"
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: "123",
      value: "123"
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('<= bool comparison', async function(assert) {
    this.setProperties({
      target: false,
      value: true
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('<= object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: object1,
      value: object2
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: object2,
      value: object2
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('<= date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    date1 = new Date(2001,0,1);
    this.setProperties({
      target: date2,
      value: date1
    });
    await render(hbs`{{compare target '<=' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  // &&
  test('&& integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: 123,
      value: 0
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('&& string comparison', async function(assert) {
    this.setProperties({
      target: "456",
      value: "456"
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: "456",
      value: ""
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('&& bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: true,
      value: null
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.setProperties({
      target: true,
      value: undefined
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('&& object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: object1,
      value: null
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('&& date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date1,
      value: null
    });
    await render(hbs`{{compare target '&&' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  // ||
  test('|| integer comparison', async function(assert) {
    this.setProperties({
      target: 123,
      value: 123
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: 123,
      value: null
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: undefined,
      value: null
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('|| string comparison', async function(assert) {
    this.setProperties({
      target: "456",
      value: "456"
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: null,
      value: null
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('|| bool comparison', async function(assert) {
    this.setProperties({
      target: true,
      value: true
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: true,
      value: false
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: false,
      value: false
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('|| object comparison', async function(assert) {
    this.setProperties({
      target: object1,
      value: object1
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: null,
      value: object1
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: undefined,
      value: undefined
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('|| date comparison', async function(assert) {
    let date1 = new Date(2000,0,1),
      date2 = new Date(2001,0,1);

    this.setProperties({
      target: date1,
      value: date2
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: date1,
      value: null
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.setProperties({
      target: null,
      value: null
    });
    await render(hbs`{{compare target '||' value}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });
});
