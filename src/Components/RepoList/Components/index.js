import React from "react";

const RepoItem = ({repo, id}) => (
    <a
        key={id}
        href={repo.html_url}
        target="_blank"
        className="ReposLists"
        
    >
        <h1>{repo.name}</h1>
        <span>Stars: {repo.stargazers_count}</span>
        <span>Forks: {repo.forks}</span>
        <span>Issues: {repo.open_issues}</span>
        <span>Data: {repo.pushed_at.substring(10,0)}</span>
        <h6>Visibility: {repo.visibility}</h6><br/>

    </a>
    
);

export default RepoItem;