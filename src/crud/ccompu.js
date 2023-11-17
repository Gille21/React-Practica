import '../Styles/crud.css';
import '../Styles/bootstrap.min.css';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {createCompu} from './compu.api';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
    
const Ccompu = () => {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);
    return(
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    );
};

//Aca realiza la validación a la hora de ingresar tenga la sesión del login, que vista mostrar
const LoggedInView = ({ user }) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const uploadImage = async (e) => {
        const data = new FormData();
        data.append("file",e[0]);
        data.append("upload_preset","compu_default");
        const res = await fetch(
            "http://api.cloudinary.com/v1_1/deecwop2g/image/upload",
            {
                method: "POST",
                body: data,
            }
        )
        const file = await res.json();
        return String(file.secure_url)
    }


    const onSubmit = handleSubmit(async data => {

        const img = await uploadImage(data["img"])
        data["img"] = img
        const res = await createCompu(data);
    })

    return (
        <div className="body">
        <div className="card shadow">
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tipo Computador *</label>
                        <select name="tip_com" defaultValue={'DEFAULT'} id="" className="form-select" {...register('tip_computador',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="Portatil">Portatil</option>
                            <option value="Escritorio">Escritorio</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Modelo *</label>
                        <input type="text" className="form-control" placeholder="Aqui el modelo"  {...register('modelo',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Marca *</label>
                        <input type="text" className="form-control" placeholder="Aqui la marca" {...register('marca',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tipo Memoria RAM *</label>
                        <select name="tip_mem" defaultValue={'DEFAULT'} id="" className="form-select" {...register('tip_memoria',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="DDR4">DDR4</option>
                            <option value="DDR5">DDR5</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Memoria Instalada *</label>
                        <input type="text" className="form-control" placeholder="Ejemplo: 4 GB" {...register('cap_memoria',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Puntuación Memoria</label>
                        <input type="number" className="form-control" placeholder="Leer descripción del formulario" {...register('put_memoria',{required: false, valueAsNumber: true,})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tipo Disco *</label>
                        <select name="tip_disc" defaultValue={'DEFAULT'} id="" className="form-select" {...register('tip_disco',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="HDD">HDD</option>
                            <option value="SSD M.2">SSD M.2</option>
                            <option value="SSD Sata">SSD Sata</option>
                            <option value="Nvme">Nvme</option>
                            <option value="SSD y HDD">SSD y HDD</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Capacidad Total Disco *</label>
                        <select name="cap_disc" defaultValue={'DEFAULT'} id="" className="form-select" {...register('cap_disco',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="256 GB">256 GB</option>
                            <option value="512 GB">512 GB</option>
                            <option value="1 TB">1 TB</option>
                            <option value="1.2 TB">1.2 TB</option>
                            <option value="1.5 TB">1.5 TB</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Puntuacion Disco</label>
                        <input type="number" className="form-control" placeholder="Leer descripción del formulario" {...register('put_disco',{required: false, valueAsNumber: true,})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Grafica *</label>
                        <select name="grafica" defaultValue={'DEFAULT'} id="" className="form-select" {...register('grafica',{required: true, setValueAs: (value) => (value === 'Si' ? true || value === 'No' : false || value),})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Modelo Grafica</label>
                        <input type="text" className="form-control" {...register('tip_grafica',{required: false})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Capacidad de la grafica</label>
                        <select name="cap_disc" defaultValue={'DEFAULT'} id="" className="form-select" {...register('cap_grafica',{required: false})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="2 GB">2 GB</option>
                            <option value="4 GB">4 GB</option>
                            <option value="6 GB">6 GB</option>
                            <option value="8 GB">8 GB</option>
                            <option value="12 GB">12 GB</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Puntuacion Grafica</label>
                        <input type="number" className="form-control" placeholder="Leer descripción del formulario" {...register('put_grafica',{required: false, valueAsNumber: true,})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Procesador *</label>
                        <input type="text" className="form-control" placeholder="Aqui el procesador" {...register('procesador',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Velocidad Procesador *</label>
                        <input type="text" className="form-control" placeholder="Aqui la Velocidad Procesador" {...register('vel_procesador',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Puntuación Procesador</label>
                        <input type="number" className="form-control" placeholder="Leer descripción del formulario" {...register('put_procesador',{required: false, valueAsNumber: true,})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Sitema Operativo *</label>
                        <select name="cap_disc" defaultValue={'DEFAULT'} id="" className="form-select" {...register('sistema_operativo',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="Windows 10 Home">Windows 10 Home</option>
                            <option value="Windows 10 Profesional">Windows 10 Profesional</option>
                            <option value="Windows 11 Home">Windows 11 Home</option>
                            <option value="Windows 11 Profesional">Windows 11 Profesional</option>
                            <option value="Mac">Mac</option>
                            <option value="Ubuntu">Ubuntu</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Precio *</label>
                        <input type="number" className="form-control" placeholder="Aqui el precio" {...register('costo',{required: true, valueAsNumber: true,})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Proposito *</label>
                        <select name="cap_disc" defaultValue={'DEFAULT'} id="" className="form-select" {...register('proposito',{required: true})}>
                            <option value="DEFAULT">Escoge..</option>
                            <option value="Trabajo">Trabajo</option>
                            <option value="Gamer">Gamer</option>
                            <option value="Entretenimiento">Entretenimiento</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Link de compra</label>
                        <input type="text"className="form-control" placeholder="url del lugar de compra" {...register('tienda',{required: true})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Imagen del equipo *</label>
                        <input type="file" className="form-control" {...register('img',{required: false})}/>
                    </div>
                    <center>
                        <div className='container'>
                            <div className='row'>
                                <div className="col-6">
                                    <button>Guardar</button>                            
                                </div>
                                <div className="col-6">
                                <Link to='/portalHome'>
                                        <button>Volver</button>
                                    </Link>
                                </div>
                            </div>
                        </div>  
                    </center>                      
                </form>
            </div>
        </div>
    </div>
    );
};

export const LoggedOutView = ({ title = 'No tiene los suficientes permisos para agregar un equipo de computo'}) => {
    return (
        <center>
            <h1>{title}</h1>
            <br>
            </br>
            <br>
            </br>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/">
                            <button className='form-btn-login'>Volver</button>
                        </Link>
                    </div>
                </div>
                </div>
        </center>
    );
};

export default Ccompu;