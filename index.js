import hyperscriptify from 'hyperscriptify';

export function init({ components, propsify, h, Fragment, render }) {
  componentsWithFragment = { ...components, 'drupal-html-fragment': Fragment };
  document.querySelectorAll('template[hyperscriptify]').forEach((templateElement) => {
    const App = hyperscriptify(templateElement.content, h, Fragment, componentsWithFragment, { propsify });
    const container = document.createElement('div');
    templateElement.after(container);
    render(App, container);
  });
}
