import "../icon-font/icon-font.css"

function Icon ({icon,color,size,addClass,rotate}){
    return (
    <i className={addClass ? `icon-font ft-icon ic-${icon} ${addClass}` : `icon-font ft-icon ic-${icon}`} 
    style={{ color: color, fontSize:size, transform:rotate}}></i>
    )
}

export default Icon