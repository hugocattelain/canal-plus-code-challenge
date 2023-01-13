import {
  combineLatest as observableCombineLatest,
  distinctUntilChanged,
  map,
  Subject,
  takeUntil,
} from 'rxjs';

const createModule = (module, payload) => {
  if (typeof module !== 'function') {
    throw new Error('A module should be a function');
  }

  const moduleState = {};
  const $destroy = new Subject();
  const $updates = new Subject().pipe(takeUntil($destroy));

  const getFromModule = (...args) => {
    if (!args.length) {
      return moduleState;
    }
    if (args.length === 1) {
      return moduleState[args[0]];
    }
    return args.map((arg) => moduleState[arg]);
  };

  const $getFromModule = (...args) => {
    if (!args.length) {
      return $updates;
    }

    if (args.length === 1) {
      return $updates.pipe(
        map((state) => state[args]),
        distinctUntilChanged()
      );
    }

    const observables = args.map((arg) =>
      $updates.pipe(
        map((state) => state[arg]),
        distinctUntilChanged()
      )
    );

    return observableCombineLatest(observables);
  };

  const moduleArgs = {
    state: {
      get: getFromModule,
      set: (arg) => {
        const newState = Object.assign(moduleState, arg);
        $updates.next(newState);
      },
    },
    $destroy,
  };

  const moduleActions = module(moduleArgs, payload);

  return {
    dispatch: (actionName, actionPayload) => {
      if (!moduleActions || typeof moduleActions[actionName] !== 'function') {
        throw new Error(
          `The ${actionName} action does not exist on this module.`
        );
      }
      return moduleActions[actionName](actionPayload);
    },

    get: getFromModule,
    $get: $getFromModule,
    destroy: () => {
      $destroy.next();
      $destroy.complete();
    },
  };
};

export { createModule };
