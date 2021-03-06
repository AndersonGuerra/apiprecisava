import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

class ListaDeputados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      deputados: [],
    }
  }

  componentDidMount() {
    Axios({
      method: 'get',
      url: '/api/deputados',
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
      this.setState({
        deputados: response.data,
        isLoading: false
      })
    ).catch(err => {
      console.log(err)
    })
  }

  render() {
    if(this.state.isLoading){
      return (
        <div className="card" style={{ marginTop: '6%' }}>
          <div className="card-body text-center">
            <Spinner width={100} height={100} />
          </div>
        </div>
      )
    }
    return (
      <div className="card" style={{ marginTop: '6%', marginBottom: '2%' }}>
        <div className="card-body text-center">
          <h3 style={{ paddingBottom: '2%' }}>Deputados Federais do Amapá - 2015 à 2018</h3>
          <div className="row justify-content-center">
            {this.state.deputados.map(deputado => (
                <div className="col-md-3" key={deputado.id}>
                  <Link to={`/deputado-${deputado.id}-despesas`} style={{ textDecoration: 'none' }}>
                    <div className="card text-center" style={{ marginBottom: '10%', backgroundColor: '#f5f5f5', borderRadius: '5px', boxShadow: '7px 10px #e8e8e8' }}>
                      <div className="card-body">
                        <img src={require(`../../../public/img/deputados/${deputado.id}.jpg`)} alt={deputado.nome_eleitoral} style={{ objectFit: 'cover', borderRadius: '50%', width: 100, height: 100, paddingBottom: 5 }} />
                        <h6 className="card-title">
                          <strong>{deputado.nome_eleitoral}</strong>
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ListaDeputados
