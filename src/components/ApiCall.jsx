import { useEffect, useState } from "react";
import SpecsCharacters from "./SpecsCharacters";
import "../style/ApiCall.css"

 function ApiCall() {


    const [dataLoaded, setDataLoaded] = useState(false);

    const [characters, setCharacters] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const [page, setPage] = useState(2);
    const [err, setErr] = useState(false)

    


    useEffect(() => {

        Api();
        
    }, [])

    useEffect(() => {

        ApiPerName ()
        
    }, [status, gender, searchName])
    
    



    //LLamada general de todos los personajes
    async function Api () {

        await fetch('https://rickandmortyapi.com/api/character')
        .then(res => res.json())
        .then(
            (results) => {
                setCharacters(results.results);
                setDataLoaded(true);
                
            } ,
        (error) => {
            return <h1>Error: {error}</h1>
        })

    }

    //Llamada por caracteristicas
    async function ApiPerName () {

    
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/?${searchName}${status}${gender}`);
                    if(response.ok) {
                        const responseJson = await response.json();
                        setCharacters(responseJson.results)

                        setErr(false)
                    } else {
                        
                        
                        console.log("error")
                        setErr(true)
                    }
                } catch(err) {
                    console.log(err)
                }

    }


    //Busqueda por nombre
    function handleChange(e) {

        const search = "name=" + e.target.value
        
        setSearchName(search)


        ApiPerName ()

        if(searchName === "") {

            setPage(2)
        }
    }

    //Busqueda por status
    function statusChange(e) {

        if(e.target.value === "none") {

            setStatus("")
            ApiPerName ()

            return;

        }
        setStatus("&status=" + e.target.value)

        ApiPerName ()

    }


    //Busqueda por genero
    function gerdenChange(e) {
        if(e.target.value === "none") {
            setGender("")
            ApiPerName ()

            return;

        }

        setGender("&gender=" + e.target.value)

        ApiPerName ()

    }


    //Cargar mas personajes
    async function nextPage() {

        if (searchName !== "" || status !== "" || gender !== "") {
            
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?${searchName}${status}${gender}&page=${page}`);
                if(response.ok) {
                    const responseJson = await response.json();
                    setCharacters(characters => [...characters, ...responseJson.results])
                    setErr(false)
                } else {
                console.log("error")
                setErr(true)
                }
                } catch(err) {
                    console.log("Error:" + err.message)
                }
            setPage(page + 1);
            
            return;
        }

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            if(response.ok) {
                const responseJson = await response.json();
                setCharacters(characters => [...characters, ...responseJson.results])
                setErr(false)
            } else {
            console.log("error")
            setErr(true)
            }
            } catch(err) {
                console.log("Error:" + err.message)
            }
        setPage(page + 1);
        
    } 

    
    return(
        
        <div className="ApiContainer">
            { dataLoaded ?
                        
                        <div className="container">
                            <div className="inputsContainer p-5">

                                <form className="w-50">
                                    <input className="searchInput form-control" type="text"  onChange={handleChange}/>
                                </form>

                                <div role="alert" className={err? 'alert alert-primary': 'disableAlert'}>
                                    Por favor busca algo valido
                                </div>

                                <div className="inputsContainer__options w-30 pt-4">
                                    <div className="form-floating">
                                        <select className="form-select" name="status" id="status" onChange={statusChange}>
                                            <option value="none">Ninguno</option>
                                            <option value="alive">Vivo</option>
                                            <option value="dead">Muerto</option>
                                            <option value="unknown">Desconocido</option>
                                        </select>
                                        <label htmlFor="status">Estado:</label>
                                    </div>
                                    <div className="form-floating">
                                        <select className="form-select" name="gender" id="gender" onChange={gerdenChange}>
                                            <option value="none">Ninguno</option>
                                            <option value="female">Hembra</option>
                                            <option value="male">Macho</option>
                                            <option value="genderless">Sin genero</option>
                                            <option value="unknown">Desconocido</option>
                                        </select>
                                        <label htmlFor="gender">Genero</label>
                                    </div>

                                </div>
                            </div>
                            <div className="row m-3">
                                    {
                                        characters.map((item) => (
                                                <div key={item.id} className="col-12 col-lg-6 col-xl-4 mb-4">

                                                    <SpecsCharacters key={item.id} item={item}/>
                                                </div>
                                        ))

                                    }

                            </div>

                            <div className="buttonContainer">

                                <button className="btn btn-primary" onClick={nextPage}>Cargar mas</button>

                                <div role="alert" className={err? 'alert alert-primary': 'disableAlert'}>
                                        Por favor busca algo valido
                                </div>
                            </div>

                        </div> 
                        :
                        <div className="loading">
                            <h1>Cargando</h1>

                        </div>
                    } 
        </div>
    );

    
 }

 export default ApiCall;