export default function Logo({src, height, width}){
    return (
        <img src={`/${src}`} width={width} height={height}/>
    )
}