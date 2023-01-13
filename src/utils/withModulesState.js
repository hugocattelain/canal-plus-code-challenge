import React from 'react';

const withModulesState = (modulesState) => (Comp) => {
  const modulesProps = Object.keys(modulesState);
  const modulesSubscriptions = {};

  return class extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {};

      modulesProps.forEach((moduleProp) => {
        if (!this.props[moduleProp]) {
          return;
        }

        const translations = modulesState[modulesProps];
        const module = this.props[moduleProp];
        const wantedProps = Object.keys(modulesState[moduleProp]);
        wantedProps.forEach((state) => {
          this.state[translations[state]] = module.get(state);
        });
      });
    }

    componentDidMount() {
      modulesProps.forEach((moduleProp) => {
        if (!this.props[moduleProp]) {
          return;
        }

        modulesSubscriptions[moduleProp] = [];

        const translations = modulesState[modulesProps];
        const module = this.props[moduleProp];
        const wantedProps = Object.keys(modulesState[moduleProp]);
        wantedProps.forEach((state) => {
          const sub = module.$get(state).subscribe((val) =>
            this.setState({
              [translations[state]]: val,
            })
          );

          modulesSubscriptions[moduleProp].push(sub);
        });
      });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      modulesProps.forEach((moduleProp) => {
        if (
          !Object.prototype.hasOwnProperty.call(nextProps, moduleProp) ||
          nextProps[moduleProp] !== this.props[moduleProp]
        ) {
          if (modulesSubscriptions[moduleProp]) {
            modulesSubscriptions[moduleProp].forEach((sub) =>
              sub.unsubscribe()
            );
            delete modulesSubscriptions[moduleProp];
          }
        }

        if (
          Object.prototype.hasOwnProperty.call(nextProps, moduleProp) &&
          !modulesSubscriptions[moduleProp]
        ) {
          modulesSubscriptions[moduleProp] = [];
          const translations = modulesState[modulesProps];
          const module = nextProps[moduleProp];
          const wantedProps = Object.keys(modulesState[moduleProp]);
          wantedProps.forEach((state) => {
            const sub = module.$get(state).subscribe((val) =>
              this.setState({
                [translations[state]]: val,
              })
            );

            modulesSubscriptions[moduleProp].push(sub);
          });
        }
      });
    }

    componentWillUnmount() {
      Object.keys(modulesSubscriptions).forEach((moduleProp) => {
        modulesSubscriptions[moduleProp].forEach((sub) => sub.unsubscribe());
        delete modulesSubscriptions[moduleProp];
      });
    }

    render() {
      const newProps = Object.assign({}, this.props, this.state);
      return <Comp {...newProps} />;
    }
  };
};

export default withModulesState;
