import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: function(instance, oldProps, newProps) {
        const { fill, position, rotation, width, height } = newProps;
        const x = position.x;
        const y = position.y;
        const pivot = {
            x: width / 2,
            y: height / 2     
        }
        instance.clear();
        instance.beginFill(fill);
        instance.drawRect(0, 0, width, height);
        instance.endFill();
        instance.height = height;
        instance.width = width;
        instance.pivot = pivot;
        instance.position = position;
        instance.rotation = rotation || 0;
    }
};
export default CustomPIXIComponent(behavior, TYPE);