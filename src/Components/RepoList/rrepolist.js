import React from "react";
import RepoItem from './Components/index'

const RepoList = ({repos, error}) => (
    <div id="repo">
        
        {
            repos.map(repo => (
                <RepoItem repo={repo} id={repo.id}/>
            ))
        }
        <div>{error}</div>
    </div>
);

export default RepoList;