import './Styles/crud.css';
import './Styles/bootstrap.min.css';
import React from 'react';
import {useForm} from 'react-hook-form';
import {consulta} from './crud/compu.api';
import { Link } from 'react-router-dom';
    
function Consulta(){

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = handleSubmit(async cons => {
        const res = await consulta(cons);
        console.log(res.data)
    })

    return(
        <div class="body">
            <div class="card shadow">
                <div class="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Proposito *</label>
                            <input type="text" class="form-control" placeholder="Aqui la marca" {...register('proposito',{required: true})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Marca *</label>
                            <input type="text" class="form-control" placeholder="Aqui la marca" {...register('marca',{required: true})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Sistema Operativo *</label>
                            <input type="text" class="form-control" placeholder="Aqui la marca" {...register('sistema_operativo',{required: true})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Capacidad del disco *</label>
                            <input type="text" class="form-control" placeholder="Aqui la marca" {...register('cap_disco',{required: true})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Tipo de computador *</label>
                            <input type="text" class="form-control" placeholder="Ejemplo: 4 GB" {...register('tip_computador',{required: true})}/>
                        </div>
                        <div className="mb-3">
                            <button>Guardar</button>
                        </div>
                        <div className="mb-3">
                            <Link to='/portalHome'>
                                <button>Volver</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Consulta;