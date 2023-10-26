export default function randomizer(array=[]) {
 if( !Array.isArray(array)){
    throw "Exception: the argument passed is not of type 'array'"
  } 

  return array[Math.floor(Math.random() * array.length)]


}