import "../icon-font/icon-font.css"

function Icon ({icon,color=null,size=null}){
    return <i className={"icon-font ft-icon ic-" + icon} style={{ color: color, fontSize:size }} ></i>
}

export default Icon