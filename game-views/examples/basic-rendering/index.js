import { Sprite, Stage } from 'react-pixi-fiber';

const Character = props => (
    <Sprite texture={PIXI.Texture.fromImage('/static/character.png')} {...props} />
)

class GameView extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        PIXI.settings.SCALE_MODE = 1;
    }
    updateDimensions = () => {
        this.setState({ height: window.innerHeight, width: window.innerWidth });
    }
    render() {
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;
        const POSITION = new PIXI.Point(WIDTH / 2, HEIGHT / 2);
        const ANCHOR = { x: 0.5, y: 0.5 };

        return (
            <Stage width={WIDTH} height={HEIGHT} options={{ backgroundColor: 0x10bb99 }} ref={stage => this.stage = stage}>
                <Character anchor={ANCHOR} position={POSITION} />
            </Stage>
        )
    }
}

export default GameView;

