import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Spec.css"

export default function Spec() {

    const location = useLocation();
    const data = location.state.data

    const[locationData, setLocationData] = useState([]);
    const[originData, setOriginData] = useState([]);

    useEffect(() => {

        LoadLocation();
        LoadOrigin();

    }, [])

    async function LoadLocation() {
        const responseData = await fetch(data.location.url);
        const responseJson = await responseData.json();

        setLocationData(responseJson)
    }

    async function LoadOrigin() {
        const responseData = await fetch(data.origin.url);
        const responseJson = await responseData.json();

        setOriginData(responseJson)
    }

    return(

        <div className="specContainer">

            <div className="card text-center mb-3 ">
                <div className="row g-0">

                    
                    <div className="col-12 col-md-12 col-lg-4">
                        <img src={data.image} alt="" />
                    </div>

                    <div className="dataContainer col-12 col-md-12 col-lg-4">

                        <h1>{data.name}</h1>

                        <h2>Estado: {data.status}</h2>
                        <h2>Especie: {data.species}</h2>
                        <h2>Tipo: {data.type}</h2>
                        <h2>Genero: {data.gender}</h2>

                    </div>
                    <div className="col-12 col-md-12 col-lg-4">
                        {
                            data.origin.name !== "unknown" ? 
                            <div>
                                <h1>Origen</h1>
                                <Link to={`/location/${data.location.name}`} state={originData}><h2>{data.origin.name}</h2></Link>
                            </div>
                            : 
                            <div>
                                <h1>Origen</h1>
                                <h2>Desconocido</h2>
                            </div> 

                        }

                        <div>
                            <h1>Locacion</h1>
                            <Link to={`/location/${data.location.name}`} state={locationData}><h2>{data.location.name}</h2></Link>
                        </div>

                        <Link to={'/'}><button className="btn btn-primary">Volver</button></Link>

                    </div>

                </div>
            </div>
        </div>

    );
}