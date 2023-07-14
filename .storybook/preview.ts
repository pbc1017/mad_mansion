import routerDecorator from './router-decorator';

export const decorators = [routerDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
