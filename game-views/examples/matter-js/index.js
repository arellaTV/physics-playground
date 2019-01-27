import { AppContext, Stage } from 'react-pixi-fiber';
import { Engine } from 'matter-js';
import Character from './components/Character';
import Floor from './components/Floor';

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

