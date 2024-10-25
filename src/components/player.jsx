import {useState} from "react";

export default function Player({name, symbol, isActive, onChangeName}){
    const [isEditing, setisEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    function handleClick(){
        setisEditing(current => !current);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(event){
        setPlayerName(event.target.value); 
    }
    return(
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" rquired value={playerName} onChange={handleChange}></input>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{!isEditing ? "Edit" : "Save"}</button>
        </li>
    )
}