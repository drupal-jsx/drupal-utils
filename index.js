import hyperscriptify from '@drupal-jsx/hyperscriptify';
import kebabCase from 'just-kebab-case';
import mapValues from 'just-map-values';

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
  attributes = mapValues(attributes, (value) => Array.isArray(value) ? value.join(' ') : value);
  return dependencies.propsify(attributes, {}, {});
}

export function kebabCasePreserveDoubleDash(str) {
  return str.split('--').map(kebabCase).join('--');
}

export function componentsFromModules(modules) {
  const components = {};
  for (const file in modules) {
    const baseNameWithExtension = file.split('/').pop();
    const baseName = baseNameWithExtension.substring(0, baseNameWithExtension.lastIndexOf('.'));
    const tagName = kebabCasePreserveDoubleDash(baseName);
    components[tagName] = modules[file].default;
  }
  return components;
}
