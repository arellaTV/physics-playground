import { AppContext, Container, Sprite, Stage } from 'react-pixi-fiber';
import { Body, Bodies, Engine, World } from 'matter-js';
import AnimatedSprite from '../../../components/extras/AnimatedSprite';
import Rectangle from '../../../components/shapes/Rectangle';

class Character extends React.Component {
    constructor(props) {
        super(props);
        const { engine, height, position, width } = props;
        this.body = Bodies.rectangle(position.x, position.y, width, height);
        World.add(engine.world, [this.body]);
        this.state = {
            direction: 'right',
            height,
            position,
            rotation: 0,
            scale: { x: 1, y: 1 },
            width
        }

        this.idle = [];
        for (var i = 1; i <= 5; i++) {
            let paddedIndex = i.toString().padStart(4, '0');
            this.idle.push(PIXI.Texture.from(`/static/idle/cuphead_idle_${paddedIndex}.png`));
        }

        this.run = [];
        for (var i = 1; i <= 16; i++) {
            let paddedIndex = i.toString().padStart(4, '0');
            this.run.push(PIXI.Texture.from(`/static/run/cuphead_run_${paddedIndex}.png`));
        }

        this.currentAnimationFrames = this.idle;
    }
    
    componentDidMount() {
        this.props.app.ticker.add(this.animate);

        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                Body.setVelocity(this.body, { x: 2.9, y: 0 });
                this.setState({ direction: 'right', moving: true });
            }
            if (event.keyCode == 37) {
                Body.setVelocity(this.body, { x: -2.9, y: 0 });
                this.setState({ direction: 'left', moving: true });
            }
            if (event.keyCode == 32) {
                Body.setAngularVelocity(this.body, 0.01);
            }
        });

        window.addEventListener("keyup", (event) => {
        });
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate);
    }

    animate = delta => {
        Engine.update(this.props.engine);

        let scale = { x: 1, y: 1 };
        let reversing = true;
        let direction = this.state.direction;

        if (this.body.velocity.x > 0.1) {
            console.log('right');
            direction = 'right';
            scale = { x: 1, y: 1 };
            reversing = false;
            this.currentAnimationFrames = this.run;
        } else if (this.body.velocity.x < -0.1) {
            console.log('left');
            direction = 'left';
            scale = { x: -1, y: 1 };
            reversing = false;
            this.currentAnimationFrames = this.run;
        } else if (this.body.velocity.x < 0.1 && this.body.velocity.x > -0.1) {
            this.currentAnimationFrames = this.idle;
            if (direction === "right") {
                scale = { x: 1, y: 1 };
            } else if (direction === "left") {
                scale = { x: -1, y: 1 };
            }
        }

        this.setState({
            direction,
            position: {
                x: this.body.position.x,
                y: this.body.position.y
            },
            reversing,
            rotation: this.body.angle,
            scale
        });
    };

    render() {
        const state = this.state;

        return (
            <Container>
                <Rectangle fill={0x4286f4} {...state} />
                <AnimatedSprite
                    anchor={{x:0.5, y:0.5}}
                    animationSpeed={0.4}
                    reversing={true}
                    textures={this.currentAnimationFrames}
                    scale={this.state.scale}
                    {...state}
                />
            </Container>
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
        return (
            <Rectangle {...props} />
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
                            width={3000}
                        />
                    )}
                </AppContext.Consumer>
                <AppContext.Consumer>
                    {app => (
                        <Character
                            app={app}
                            engine={this.engine}
                            height={155}
                            position={POSITION}
                            width={98}
                        />
                    )}
                </AppContext.Consumer>
            </Stage>
        )
    }
}

export default GameView;

