import React from 'react';

type Maybe<T> = T | null;

export type LoadingBarProps = {
  colors: string[];
  cycleDurationInMs: number;
  height: number;
  positionAtTop: boolean;
};

export type LoadingBarState = {
  currentCycle: number;
  currentTick: number;
};

export const rotateArray = (array: any[], times: number) => {
  const rotatedArray = [...array];
  while (times--) {
    var temp = rotatedArray.pop();
    rotatedArray.unshift(temp);
  }
  return rotatedArray;
};

export default class LoadingBar extends React.Component<LoadingBarProps, LoadingBarState> {
  intervalId: Maybe<NodeJS.Timeout> = null;
  bar: Maybe<HTMLElement> = null;
  tickDurationInMs = 4;

  constructor(props: LoadingBarProps) {
    super(props);

    this.rotateColors = this.rotateColors.bind(this);
    this.getBoxes = this.getBoxes.bind(this);
    this.getBarWidth = this.getBarWidth.bind(this);
    this.getBoxesCount = this.getBoxesCount.bind(this);
    this.getPixelsToMovePerTick = this.getPixelsToMovePerTick.bind(this);
    this.getColorsCount = this.getColorsCount.bind(this);

    this.state = {
      currentCycle: 0,
      currentTick: 0,
    };
  }

  componentDidMount() {
    const self = this;
    const ticksPerCycle = this.props.cycleDurationInMs / 4;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      self.setState({
        currentTick: this.state.currentTick + 1,
      });
      if (this.state.currentTick + 1 === ticksPerCycle) {
        self.setState({
          currentTick: 0,
          currentCycle: this.state.currentCycle + 1,
        });
      }
    }, this.tickDurationInMs);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getColorsCount() {
    return this.props.colors.length;
  }

  getBoxesCount() {
    return this.getColorsCount() + 1;
  }

  getBarWidth() {
    return this.bar?.offsetWidth ?? 0;
  }

  getPixelsToMovePerTick() {
    return this.getBarWidth() / this.props.cycleDurationInMs;
  }

  getBoxMaxWidth() {
    return this.getBarWidth() / this.getColorsCount();
  }

  rotateColors = () => {
    return rotateArray(this.props.colors, this.state.currentCycle % this.getColorsCount());
  };

  getBoxes() {
    if (!this.getBarWidth()) {
      return [];
    }

    let rotatedColors = this.rotateColors();
    let boxesCount = this.getBoxesCount();
    let boxes = [];
    for (let i = 0; i < boxesCount; i++) {
      let backgroundColor = i === 0 ? rotatedColors[rotatedColors.length - 1] : rotatedColors[i - 1];

      let width;
      let newWidthOffset = this.state.currentTick * this.getPixelsToMovePerTick();
      if (i == 0) {
        width = newWidthOffset;
      } else if (i === boxesCount - 1) {
        width = this.getBoxMaxWidth() - newWidthOffset;
      } else {
        width = this.getBoxMaxWidth();
      }
      boxes.push(<div key={i} style={{ height: this.props.height, backgroundColor, width }} />);
    }
    return boxes;
  }

  render() {
    let positionStyles = {};
    if (this.props.positionAtTop) {
      positionStyles = {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
      };
    }
    return (
      <div
        style={{ height: this.props.height, display: 'flex', flexDirection: 'row', ...positionStyles }}
        ref={(bar) => {
          this.bar = bar;
        }}
      >
        {this.getBoxes()}
      </div>
    );
  }
}
