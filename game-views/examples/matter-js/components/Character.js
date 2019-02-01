import { Container } from 'react-pixi-fiber';
import { Body, Bodies, Engine, Events, World } from 'matter-js';
import AnimatedSprite from '../../../../components/extras/AnimatedSprite';
import Rectangle from '../../../../components/shapes/Rectangle';

class Character extends React.Component {
    constructor(props) {
        super(props);
        const { engine, height, position, width } = props;
        this.body = Bodies.rectangle(position.x, position.y, width, height);
        this.body.density = 100;
        Body.setInertia(this.body, Infinity);
        World.add(engine.world, [this.body]);
        this.state = {
            direction: 'right',
            height,
            motionLeftKeydown: false,
            motionRightKeydown: false,
            motionUpKeydown: false,
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
            // Right
            if (event.keyCode == 39) {
                this.setState({ motionRightKeydown: true, direction: 'right' });
            }
            // Left
            if (event.keyCode == 37) {
                this.setState({ motionLeftKeydown: true, direction: 'left' });
            }
            // Space
            if (event.keyCode == 32) {
                this.setState({ motionUpKeydown: true });
            }
        });

        window.addEventListener("keyup", (event) => {
            // Right
            if (event.keyCode == 39) {
                this.setState({ motionRightKeydown: false });
            }
            // Left
            if (event.keyCode == 37) {
                this.setState({ motionLeftKeydown: false });
            }
            // Space
            if (event.keyCode == 32) {
                this.setState({ motionUpKeydown: false });
            }
        });
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.animate);
    }

    animate = delta => {
        Engine.update(this.props.engine, delta);

        const SPEED_CONSTANT = 0.060;
        if (this.state.motionRightKeydown === true) {
            // Body.setVelocity(this.body, { x: SPEED_CONSTANT, y: 0 });
            this.body.force.x = SPEED_CONSTANT;
        } else if (this.state.motionLeftKeydown === true) {
            this.body.force.x = -SPEED_CONSTANT;
            // Body.setVelocity(this.body, { x: -SPEED_CONSTANT, y: 0 });
        }

        if (this.state.motionUpKeydown === true) {
            console.log('pressing up');
            // Body.applyForce(this.body, this.body.position, { x: 0, y: -0.1 });
        }

        // Contants for left and right scales
        const LEFT_SCALE = { x: -1, y: 1 };
        const RIGHT_SCALE = { x: 1, y: 1 };

        let direction = this.state.direction;
        let position = { x: this.body.position.x, y: this.body.position.y };
        let rotation = this.body.angle;
        let reversing = true;
        let scale = { x: 1, y: 1 };

        if (this.body.velocity.x > 0.1) {
            direction = 'right';
            scale = RIGHT_SCALE;
            reversing = false;
            this.currentAnimationFrames = this.run;
        } else if (this.body.velocity.x < -0.1) {
            direction = 'left';
            scale = LEFT_SCALE;
            reversing = false;
            this.currentAnimationFrames = this.run;
        } else if (this.body.velocity.x < 0.1 && this.body.velocity.x > -0.1) {
            this.currentAnimationFrames = this.idle;
            if (direction === "right") {
                scale = RIGHT_SCALE;
            } else if (direction === "left") {
                scale = LEFT_SCALE;
            }
        }

        this.setState({
            direction,
            position,
            reversing,
            rotation,
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

export default Character;