import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SpecsCharacters from "./SpecsCharacters";
import "../style/Location.css"

export default function Location() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [residents, setResidents] = useState([])

    const location = useLocation();
    const data = location.state


    useEffect(() => {

        LoadResidents();

    }, [])

    
    async function LoadResidents() {

        for (let item in data.residents) {

            const responseData = await fetch(data.residents[item]);
            const responseJson = await responseData.json();
            
            setResidents(residents => [...residents, responseJson])
            
        }

        setIsLoaded(true)


    }


    

    return(

        <div className="locationContainer p-5">


            <div className="row">

                <div className="locationContainer__info p-3">

                    <div className="infoContainer">

                        <div className="col-6">
                            <h1>{data.name}</h1>
                            <h2>Tipo: {data.type}</h2>
                            <h2>Dimension: {data.dimension}</h2>
                        </div>
                    </div>
                    <div className="infoButton">
                        <div className="col-6">
                            <Link to={'/'}><button className="btn btn-primary">Volver</button></Link>
                        </div>

                    </div>

        
        
                </div>

                <div className="title">

                    <h1>Residentes: </h1>
                </div>
    
    
                {
                    isLoaded ?
                            
                        <div className="row p-5">
                                {
                                    residents.map((item) => (
                                        <div key={item.id} className="col-12 col-lg-6 col-xl-4">
                                            <div key={item.id}>
                                                <SpecsCharacters key={item.id} item={item}/>
                                            </div>
                                        </div>
                                    )) 
                                }
                        </div>
                        :
                        <div className="loading">
                            <h1>Cargando</h1>
                        </div>
                }
            </div>

        </div>    


        
    );
}