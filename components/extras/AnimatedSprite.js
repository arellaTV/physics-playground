import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "AnimatedSprite";
export const behavior = {
    customDisplayObject: props => new PIXI.extras.AnimatedSprite(props.textures),
    customApplyProps: function(instance, oldProps, newProps) {
        const diffDictionary = {};
        
        let shouldInvokePlay = false;

        for (let key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                diffDictionary[key] = newProps[key];
            }
        }

        for (let key in diffDictionary) {
            if (key === "textures") {
                shouldInvokePlay = true;
            }

            instance[key] = diffDictionary[key];

            if (key === "reversing" && diffDictionary[key] === true) {
                instance.onLoop = () => {
                    instance.textures.reverse();
                }
            } else if (key === "reversing" && diffDictionary[key] === false) {
                instance.onLoop = () => {};
            }
        }

        if (shouldInvokePlay) {
            instance.play();
        }
    }
};
export default CustomPIXIComponent(behavior, TYPE);