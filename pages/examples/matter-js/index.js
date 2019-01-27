import dynamic from 'next/dynamic';
const MatterJS = dynamic(import('../../../game-views/examples/matter-js'), { ssr: false })
import '../../../utility/polyfills/padStart';

class GameView extends React.Component {
    render() {
        console.log('rendering page');
        return (
            <div>
                <style jsx global>{`
                    body {
                        margin: 0px;
                        overflow: hidden;
                        padding: 0px;
                    }

                    canvas {
                        height: 100%;
                        width: 100%;
                    }
                `}</style>
                <MatterJS />
            </div>
        )
    }
}

export default GameView;

