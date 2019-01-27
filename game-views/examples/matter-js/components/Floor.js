import { Bodies, World } from 'matter-js';
import Rectangle from '../../../../components/shapes/Rectangle';

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

export default Floor;