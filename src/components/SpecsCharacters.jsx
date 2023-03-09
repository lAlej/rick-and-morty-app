
import { Link } from "react-router-dom";
import "../style/SpecsCharacters.css"


export default function SpecsCharacters (item) {

    const data = item.item

    return(
        <div className="specCharactesContainer">
            <div className="specsCard row m-4 h-100">

                <div className="card col-12">

                    <img className="card-img-top col-5 p-1" src={data.image} alt="" />
                    
                    <div className="col-7">
                        <div className="card-body p-2">
                            <h1 className="card-title">Nombre: {data.name}</h1>
                            <p className="card-text">Estado: {data.status}</p>
                            <h1 className="card-text">Origen</h1>
                            <p className="card-text"> {data.origin.name}</p>
                                    
                            <Link to={`/specs/${data.id}`} state={{data}}><button className="btn btn-primary">Mas info</button></Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
            
    );
}
