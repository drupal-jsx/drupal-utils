import hyperscriptify from '@drupal-jsx/hyperscriptify';

export function main({ components, propsify, h, Fragment, render }) {
  componentsWithFragment = { ...components, 'drupal-html-fragment': Fragment };
  document.querySelectorAll('template[hyperscriptify]').forEach((templateElement) => {
    const App = hyperscriptify(templateElement.content, h, Fragment, componentsWithFragment, { propsify });
    const container = document.createElement('div');
    templateElement.after(container);
    render(App, container);
  });
}
