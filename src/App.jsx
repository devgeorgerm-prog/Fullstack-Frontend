import {useEffect, useState} from "react";
import axios from "axios";

const Country = ({country}) => {
    const imgFlagStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    };
    const imgFlagCover = {
        width: "100%",
        maxWidth: "150px",
    };
    return (
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, language]) => (
                    <li key={key}>{language}</li>
                ))}
            </ul>
            <div style={imgFlagCover}>
                <img style={imgFlagStyle} src={country.flags.svg} alt=""/>
            </div>
        </div>
    );
};

const Filter = ({countries, handleShowCountry}) => {
    if (countries.length === 1) {
        return (
            <>
                {countries.map((country) => (
                    <Country key={country.name.common} country={country}/>
                ))}
            </>
        );
    } else if (countries.length < 10) {
        return (
            <>
                {countries.map((country) => (
                    <div key={country.name.common}>
                        {country.name.common}{" "}
                        <button onClick={() => handleShowCountry(country)}>show</button>
                    </div>
                ))}
            </>
        );
    } else if (countries.length > 10) {
        return <>Too many matches</>;
    }
};

export default function App() {
    const [findCountry, setFindCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [showCountry, setShowCountry] = useState('');

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => {
                setCountries(response.data);
            });
    }, []);

    const filteredCountry = countries.filter((country) =>
        country.name.common.toLowerCase().includes(findCountry.toLowerCase())
    );

    const handleSearchCountry = (e) => {
        setFindCountry(e.target.value);
        setShowCountry('');
    };

    const handleShowCountry = (country) => {
        setShowCountry(country);
    };

    return (
        <>
            find countries{" "}
            <input value={findCountry} onChange={handleSearchCountry}/>
            {findCountry && (
                <Filter
                    countries={filteredCountry}
                    handleShowCountry={handleShowCountry}
                />
            )}
            {showCountry && <Country country={showCountry}/>}
        </>
    );
}
