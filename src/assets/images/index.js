import image13_1 from './image13_1.png';
import image13_2 from './image13_2.png';
import image13_3 from './image13_3.png';
import image13_4 from './image13_4.png';
import image13_5 from './image13_5.png';
import image13_6 from './image13_6.png';
import image13_7 from './image13_7.png';
import no_img from '../../assets/tests/jsonServer/img/placeholders/no_product_img.png'

export const no_img_path = no_img
export const imagepath = (path)=> {
    if(path === undefined) return false;
    
    if (path.toString().startsWith("data:image/png;base64")) return path;
   
    let image;
    try {
        image = require('../tests/jsonServer' + path);
    } catch (error) {
        image = require('../tests/jsonServer' + path);
    }
    // console.log("image",id, image)
    return image;
}
export const image1_1 = image13_1;

export class IMG{
    
    1= image13_1
    
    2 = image13_2
    
    3 = image13_3
    
    4 = image13_4
    
    5 = image13_5
    
    6 = image13_6
    
    7 = image13_7

    
    
}
export default IMG;