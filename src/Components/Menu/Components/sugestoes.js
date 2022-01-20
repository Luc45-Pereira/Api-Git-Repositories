import React from "react";

const sugestao = ({repo}) => (
    <option key={repo.id} value={repo.name}/>
);

export default sugestao;