import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
        const { fill, pivot, position, width, height } = newProps;
        const x = position.x;
        const y = position.y;
        instance.clear();
        instance.beginFill(fill);
        instance.drawRect(x, y, width, height);
        instance.endFill();
    }
};
export default CustomPIXIComponent(behavior, TYPE);