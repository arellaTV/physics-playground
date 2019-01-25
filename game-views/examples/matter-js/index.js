import { Fragment } from 'react';
import { AppContext, Sprite, Stage } from 'react-pixi-fiber';
import { Body, Bodies, Engine, World } from 'matter-js';
import Rectangle from '../../../components/shapes/Rectangle';

class Character extends React.Component {
    constructor(props) {
        super(props);
        const { engine, height, position, width } = props;
        this.body = Bodies.rectangle(position.x, position.y, width, height);
        World.add(engine.world, [this.body]);
        this.state = {
            height,
            position,
            width
        }
    }
    
    componentDidMount() {
        this.props.app.ticker.add(this.animate);

        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                Body.setVelocity(this.body, { x: 2, y: 0 });
            }
            if (event.keyCode == 37) {
                Body.setVelocity(this.body, { x: -2, y: 0 });
            }
        });
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate);
    }

    animate = delta => {
        Engine.update(this.props.engine);
        this.setState({
            position: {
                x: this.body.position.x,
                y: this.body.position.y
            }
        });
    };

    render() {
        const state = this.state;

        const rectangleState = {
            position: {
                x: state.position.x - (state.width / 2),
                y: state.position.y - (state.height / 2)
            },
            width: state.width,
            height: state.height
        }

        return (
            <Fragment>
                <Rectangle fill={0x4286f4} {...rectangleState} />
                <Sprite anchor={{x:0.5, y:0.5}} texture={PIXI.Texture.fromImage('/static/character.png')} {...state} />
            </Fragment>
        )
    }
}

class Floor extends React.Component {
    constructor(props) {
        super(props);
        const { engine, height, position, width } = props;
        this.body = Bodies.rectangle(position.x, position.y, width, height, { isStatic: true });
        World.add(engine.world, [this.body]);
    }
    
    componentDidMount() {
        // Note that `app` prop is coming directly from AppContext.Consumer
        this.props.app.ticker.add(this.animate);
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate);
    }

    animate = delta => {
    };
    
    render() {
        const props = this.props;
        const rectangleProps = {
            position: {
                x: props.position.x - (props.width / 2),
                y: props.position.y - (props.height / 2)
            },
            width: props.width,
            height: props.height,
            fill: props.fill
        }
        return (
            <Rectangle {...rectangleProps} />
        )
    }
}

class GameView extends React.Component {
    constructor() {
        super();
        this.engine = Engine.create();
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        PIXI.settings.SCALE_MODE = 1;
        Engine.run(this.engine);
    }
    updateDimensions = () => {
        this.setState({ height: window.innerHeight, width: window.innerWidth });
    }
    render() {
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;
        const POSITION = { x: 150, y: 0 };

        return (
            <Stage
                height={HEIGHT}
                options={{ backgroundColor: 0x10bb99 }}
                width={WIDTH}
            >
                <AppContext.Consumer>
                    {app => (
                        <Floor
                            app={app}
                            engine={this.engine}
                            fill={0xFF3300}
                            height={200}
                            position={{ x: 540, y: 700 }}
                            width={1080}
                        />
                    )}
                </AppContext.Consumer>
                <AppContext.Consumer>
                    {app => (
                        <Character
                            app={app}
                            engine={this.engine}
                            height={480}
                            position={POSITION}
                            width={257}
                        />
                    )}
                </AppContext.Consumer>
            </Stage>
        )
    }
}

export default GameView;

