import React, { Component, useCallback } from "react";
import './App.css';
import axios from 'axios'
import api from "./api/api"
import Header from './Components/Header/header'
import RepoList from './Components/RepoList/rrepolist';
import Menu from './Components/Menu/Menu';
import Rodape from "./Components/Rodape/index";


class App extends Component {
  state = {
    repositorio: "",
    allrepositories: [],
    image: '',
    repos: [],
    error: "",
    loading: false,
    arc: [true, false],
    auxiliar: 0,
    repositor: [],
    tips: ['', '', ''],
    ordem: "direction=asc",
  };

  ordena = async (info) => {

    const { tips, repositorio } = this.state;
    await this.setState({ ordem: info });
    var boolValue = tips[1].toLowerCase() == 'true' ? true : false;
    if (repositorio != '') {
      this.searchrepos();
      return;
    }
    try {
      const { data: reposi } = await api.get(`/users/Luc45-Pereira/repos?${info}`);


      if (tips[0] != "" || tips[1] != "" || tips[2] != '') {
        var i = 0;
        var aux = [];

        if (tips[0] != "" && tips[1] == "" && tips[2] == '') {
          while (reposi.length > i) {
            if (reposi[i].language == tips[0]) {
              aux.push(reposi[i]);
              i++;
            } else {
              i++;
            }

          }
          if (aux != '') {

            await this.setState({ repos: aux });

          }
        } else if (tips[1] != "" && tips[0] == "" && tips[2] == '') {
          while (reposi.length > i) {
            if (reposi[i].archived == boolValue) {
              aux.push(reposi[i]);
              i++;
            } else {
              i++;
            }

          }


          if (aux != '') {
            this.setState({ repos: aux });
          }
        } else if (tips[1] == "" && tips[0] == "" && tips[2] != '') {
          var boolValue = tips[2].toLowerCase() == 'true' ? true : false;

          while (reposi.length > i) {

            if (reposi[i].fork === boolValue) {
              aux.push(reposi[i]);
            }
            i++;
          }
        }else if(tips[1] != "" && tips[0] == "" && tips[2] != ''){
          var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
          while (reposi.length > i) {
            if (reposi[i].archived == boolValue && reposi[i].fork === boolfork) {
              aux.push(reposi[i]);
              i++;
            } else {
              i++;
            }

          }
        }else if(tips[1] == "" && tips[0] != "" && tips[2] != ''){
          var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
          while (reposi.length > i) {
            if (reposi[i].language == tips[0] && reposi[i].fork === boolfork) {
              aux.push(reposi[i]);
              i++;
            } else {
              i++;
            }

          }
        }
        else {
          var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
          while (reposi.length > i) {
            if (reposi[i].language == tips[0] && reposi[i].archived == boolValue && reposi[i].fork === boolfork) {
              aux.push(reposi[i]);
              i++;
            } else {
              i++;
            }

          }
        }

        if (aux != '') {
          this.setState({ repos: aux, error: "" });
        }
      } else {
        this.setState({ repos: reposi, error: "" });
      }



    } catch (error) {

      this.setState({ error: 'não foi possivel oredenar repositórios', repos: [] });

    }

  }

  onsearch = repositorio => {
    this.setState({ repositorio });
  }

  searchrepos = async () => {
    const { repositorio, repos, ordem } = this.state;
    var x = "sort=updated";
    if (ordem == "sort=pushed") {
      var y = x;
    } else {
      var y = ordem;
    }

    if (repositorio == '') {
      this.ordena(ordem);
      return;
    }



    try {
      const { data: reposi } = await api.get(`/search/repositories?q=${repositorio}+user:Luc45-Pereira+fork:true&${y}`);

      if (reposi.total_count > 0) {
        this.setState({ repos: reposi.items, error: '' });
      } else {
        this.setState({ error: 'Repositório não encontrado', repos: [] });
      }

    } catch (error) {

      this.setState({ error: 'Repositório não encontrado', repos: [] });

    }

  }

  linguagens = async (info) => {

    var i = 0;
    const { repos, auxiliar, repositor, tips, ordem } = this.state;
    var aux = [];

    if (auxiliar === 0) {
      await this.setState({ repositor: repos });
    }
    this.setState({ auxiliar: 1 });
    if (tips < 2) {
      var x = [info];
    } else {
      var x = [info, tips[1], tips[2]];
    }

    await this.setState({ tips: x });
    if (tips[1] === '' && tips[2] == '' && info != '') {
      while (repositor.length > i) {
        if (repositor[i].language == info) {
          aux.push(repositor[i]);
          i++;
        } else {
          i++;
        }

      }

    } else {

      if (info == '' && tips[1] != '' && tips[2] == '') {
        var boolValue = tips[1].toLowerCase() == 'true' ? true : false;
        while (repositor.length > i) {
          if (repositor[i].archived == boolValue) {
            aux.push(repositor[i]);
            i++;
          } else {
            i++;
          }
        }

      } else if (info === '' && tips[1] === '' && tips[2] == '') {
        this.ordena(ordem);
        return;

      } else if (info === '' && tips[1] === '' && tips[2] != '') {
        var boolfork = info.toLowerCase() == 'true' ? true : false;

        while (repositor.length > i) {

          if (repositor[i].fork === boolfork) {
            aux.push(repositor[i]);
          }
          i++;
        }
      } else if (info === '' && tips[1] != '' && tips[2] != '') {
        var boolfork = info.toLowerCase() == 'true' ? true : false;
        var boolValue = tips[1].toLowerCase() == 'true' ? true : false;
        while (repositor.length > i) {
          if (repositor[i].archived == boolValue && repositor[i].fork === boolfork) {
            aux.push(repositor[i]);
            i++;
          } else {
            i++;
          }

        }
      } else if (info != '' && tips[1] == '' && tips[2] != '') {
        var boolfork = info.toLowerCase() == 'true' ? true : false;

        while (repositor.length > i) {
          if (repositor[i].language == info && repositor[i].fork === boolfork) {
            aux.push(repositor[i]);
            i++;
          } else {
            i++;
          }

        }
      }
    }

    var boolfork = info.toLowerCase() == 'true' ? true : false;
    var boolValue = tips[1].toLowerCase() == 'true' ? true : false;
    while (repositor.length > i) {
      if (repositor[i].language == info && repositor[i].archived == boolValue && repositor[i].fork === boolfork) {
        aux.push(repositor[i]);
        i++;
      } else {
        i++;
      }

    }

    if (ordem != "" && aux != '') {
      this.ordena(ordem);

      return;
    }

    if (aux != '') {
      this.setState({ repos: aux, error: '' });
    } else {
      this.setState({ error: `Não existem repositórios neste filtro: ${info}`, repos: [] });

    }

  }

  Arquivados = async (info) => {

    var i = 0;
    const { repos, auxiliar, repositor, tips, ordem } = this.state;
    var x = [tips[0], info, tips[2]];

    await this.setState({ tips: x });
    var aux = [];
    if (tips[0] === '' && tips[2] === '') {
      if (info === '') {

        this.ordena(ordem);
        return;
      }

      if (auxiliar === 0) {
        await this.setState({ repositor: repos });
      }

      this.setState({ auxiliar: 1 });


      var boolValue = info.toLowerCase() == 'true' ? true : false;
      while (repositor.length > i) {
        if (repositor[i].archived === boolValue) {
          aux.push(repositor[i]);
          i++;
        } else {
          i++;
        }
      }
    } else {

      if (info === '' && tips[2] === '') {
  
        while (repositor.length > i) {
          if (repositor[i].language === tips[0]) {
            aux.push(repositor[i]);
            i++;
          } else {
            i++;
          }
        }
      } else if (tips[0] != '' && tips[2] === '') {
     
        var boolValue = info.toLowerCase() == 'true' ? true : false;

        while (repositor.length > i) {
          if (repositor[i].archived === boolValue && repositor[i].language === tips[0]) {
            aux.push(repositor[i]);

            i++;
          } else {
            i++;
          }
        }
      } else if (tips[0] != '' && tips[2] != '' && info!='') {
       
        var boolValue = info.toLowerCase() == 'true' ? true : false;
        var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
        
        while (repositor.length > i) {
          if (repositor[i].archived === boolValue && repositor[i].language === tips[0] && repositor[i].fork === boolfork) {
            aux.push(repositor[i]);
            
            i++;
          } else {
            i++;
          }
        }
      } else if (tips[0] === '' && tips[2] != '') {

        var boolValue = info.toLowerCase() == 'true' ? true : false;
        var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
        while (repositor.length > i) {

          if (repositor[i].archived === boolValue && repositor[i].fork === boolfork) {
            aux.push(repositor[i]);

            i++;
          } else {
            i++;
          }
        }
      }else if(tips[0] != '' && tips[2] != ''){
        var boolfork = tips[2].toLowerCase() == 'true' ? true : false;
        while (repositor.length > i) {
          if (repositor[i].language === tips[0] && repositor[i].fork === boolfork) {
            aux.push(repositor[i]);

            i++;
          } else {
            i++;
          }
        }
      }
    }

    if (ordem != "" && aux != '') {
      this.ordena(ordem);
      return;
    }

    if (aux != '') {
      this.setState({ repos: aux, error: '' });
    }
    else {
      this.setState({ repos: [], error: 'Não existem repositórios por estes parâmetros!' });
    }

  }

  Forks = async (info) => {
    const { tips, allrepositories, ordem } = this.state;

    var i = 0;
    var x = [tips[0], tips[1], info];
    var aux = [];
    await this.setState({ tips: x });
    if (info === '' && tips[0] === '' && tips[1] === '') {
      this.ordena(ordem);
      return;
    }
    else {
      var boolValue = info.toLowerCase() == 'true' ? true : false;

      while (allrepositories.length > i) {

        if (allrepositories[i].fork === boolValue) {
          aux.push(allrepositories[i]);
        }
        i++;
      }

      await this.setState({ repositor: aux, error: '' });

      if (tips[0] != '' && tips[1] === '') {
        this.linguagens(tips[0]);
        return;
      } else if (tips[0] === '' && tips[1] != '') {
        this.Arquivados(tips[1]);
        return;
      }
      else if (tips[0] != '' && tips[1] != '') {
        this.linguagens(tips[0]);
        return;
      } else if (ordem != '' && info != '') {
        this.ordena(ordem);
        return;
      } else {
        await this.setState({ repos: aux, error: '' });
      }


    }
  }

  async componentDidMount() {
    try {
      const { data: reposi } = await api.get('/users/Luc45-Pereira/repos?direction=asc');


      await this.setState({ repos: reposi, repositor: reposi, allrepositories: reposi, error: "" });





    } catch (error) {

      this.setState({ error: 'usuario nao encontrado', repos: [] });

    }
  };


  render() {
    const { repositorio, repos, error, arc, repositor, allrepositories } = this.state;
    return (
      <div className="App" width="100%" heigth="100%">
        <div id="top">
          <Header repo={allrepositories} />
        <Menu
          repositorio={repositorio}
          onchange={this.ordena}
          onsearch={this.onsearch}
          search={this.searchrepos}
          languages={repos}
          onLanguages={this.linguagens}
          onarchived={this.Arquivados}
          arc={arc}
          repos={repositor}
          onfork={this.Forks}
        />
        </div>
        
        <RepoList repos={repos} error={error} />
        <Rodape/>

      </div>
    );
  }
}

export default App;
