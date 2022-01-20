import React from "react";
import Sugestoes from "./Components/sugestoes"


const Menu = ({onchange,repositorio, onsearch, search, onLanguages, onarchived, arc, repos, onfork}) => (
    <div id="Options">
        
        <select onChange={e => onchange(e.target.value)}>
            <option value="direction=asc">A-Z</option>
            <option value="direction=desc">Z-A</option>
            <option value="sort=pushed">Data</option>
        </select>

        <input
            type='text'
            placeholder="Repositorio"
            value={repositorio}
            onChange={e => onsearch(e.target.value)}
            list="sug-pesquisa"
        />
        <datalist id="sug-pesquisa">
            {
                repos.map(repo => (
                    
                    <Sugestoes repo={repo} />
                ))
            }
        </datalist>
        <button onClick={search}>
            BUSCAR
        </button>

        <select onChange={e => onLanguages(e.target.value)}>
        <option value="">Todos</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="CSS">CSS</option>
        <option value="PHP">PHP</option>
        
        </select>
        <select onChange={e => onarchived(e.target.value)}>
            <option value="">Todos</option>
            <option value={arc[0]}>Arquivados</option>
            <option value={arc[1]}>Não Arquivados</option>
        </select>

        <select onChange={e => onfork(e.target.value)}>
            <option value="">Todos</option>
            <option value="true">Fork</option>
            <option value="false">No Fork</option>
        </select>
    </div>
);

export default Menu;