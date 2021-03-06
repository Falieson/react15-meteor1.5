import * as React from 'react'

interface IProps {
  defaultValue: number | string
}

interface IState {
  value: number
}

export default class CounterComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {defaultValue} = props
    this.state = {
      value: typeof(defaultValue) === 'number' ? defaultValue :  parseInt(defaultValue, 10),
    };
  }

  public handleChangeValue(decrement: boolean): void {
    this.setState((prevState) => ({
      value: decrement ? prevState.value - 1 : prevState.value + 1,
    }))
  }

  // TODO @autobind from core-decorators instead of .bind(this)
  public renderChangeValue({
    decrement= false,
  }: {decrement?: boolean} = {}): React.ReactElement<{}> {

    return (
      <button
        className={`app-counter-button--${decrement ? 'decrementer' : 'incrementer'}`}
        onClick={this.handleChangeValue.bind(this, decrement)}
      >
        {decrement ? 'Decrease' : 'Increase'}
      </button>
    )
  }

  public render() {
    return (
      <div>
        <p>Count is {this.state.value}</p>
        <p>
          {this.renderChangeValue()}
          {this.renderChangeValue({decrement: true})}
        </p>
      </div>
    );
  }
}

// According to some github issue discussions rather than .bind(this) make a PureComponent
// ======================================================
// class Button extends React.PureComponent<{onClick: void}> {
//   public render() {
//     const { onClick } = this.props;
//
//     // console.log('render button');
//
//     return (
//       <button onClick={onClick}>Click</button>
//     );
//   }
// }
// return (
//   <Button
//     onClick={this.handleChangeValue(decrement)}
//   />
// )
