"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.rotateArray = (array, times) => {
    const rotatedArray = [...array];
    while (times--) {
        var temp = rotatedArray.pop();
        rotatedArray.unshift(temp);
    }
    return rotatedArray;
};
class LoadingBar extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.bar = null;
        this.tickDurationInMs = 4;
        this.rotateColors = () => {
            return exports.rotateArray(this.props.colors, this.state.currentCycle % this.getColorsCount());
        };
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
        var _a, _b;
        return (_b = (_a = this.bar) === null || _a === void 0 ? void 0 : _a.offsetWidth) !== null && _b !== void 0 ? _b : 0;
    }
    getPixelsToMovePerTick() {
        return this.getBarWidth() / this.props.cycleDurationInMs;
    }
    getBoxMaxWidth() {
        return this.getBarWidth() / this.getColorsCount();
    }
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
            }
            else if (i === boxesCount - 1) {
                width = this.getBoxMaxWidth() - newWidthOffset;
            }
            else {
                width = this.getBoxMaxWidth();
            }
            boxes.push(react_1.default.createElement("div", { key: i, style: { height: this.props.height, backgroundColor, width } }));
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
        return (react_1.default.createElement("div", { style: { height: this.props.height, display: 'flex', flexDirection: 'row', ...positionStyles }, ref: (bar) => {
                this.bar = bar;
            } }, this.getBoxes()));
    }
}
exports.default = LoadingBar;
//# sourceMappingURL=loadingBar.js.map