import dynamic from 'next/dynamic';
const BasicRendering = dynamic(import('../../../game-views/examples/basic-rendering'), { ssr: false })

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
                <BasicRendering />
            </div>
        )
    }
}

export default GameView;

