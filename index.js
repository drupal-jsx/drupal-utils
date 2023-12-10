import hyperscriptify from '@drupal-jsx/hyperscriptify';
import kebabCase from 'just-kebab-case';

const dependencies = {};

export function main({ components, propsify, h, Fragment, render }) {
  dependencies.propsify = propsify;
  const componentsWithFragment = { ...components, 'drupal-html-fragment': Fragment };
  document.querySelectorAll('template[hyperscriptify]').forEach((templateElement) => {
    const App = hyperscriptify(templateElement.content, h, Fragment, componentsWithFragment, { propsify });
    const container = document.createElement('div');
    templateElement.after(container);
    render(App, container);
  });
}

export function props(attributes = {}) {
  return dependencies.propsify(attributes, {}, {});
}

export function kebabCasePreserveDoubleDash(str) {
  return str.split('--').map(kebabCase).join('--');
}
