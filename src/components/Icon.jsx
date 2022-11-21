import "../icon-font/icon-font.css"

function Icon ({icon,color=null}){
    return <i className={"icon-font ft-icon ic-" + icon} style={{ color: color }}></i>
}

export default Icon