import "../icon-font/icon-font.css";

function Icon ({icon, className, style}){
    return (
    <i className={`icon-font ft-icon ic-${icon} ${className}`} 
    style={ style }></i>
    )
}

export default Icon;
