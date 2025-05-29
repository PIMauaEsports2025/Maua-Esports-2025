import React, { useState, useEffect } from "react";

const EditSiteInfo = () => {
    const [info, setInfo] = useState({
        titulo: "",
        descricao: "",
    });

    useEffect(() => {
        const saved = localStorage.getItem("siteInfo");
        if (saved) {
            setInfo(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("siteInfo", JSON.stringify(info));
        alert("Informações salvas localmente!");
    };

    return (
        <div style={{ padding: 32 }}>
            <h2>Editar Informações do Site</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Título:
                        <input
                            type="text"
                            name="titulo"
                            value={info.titulo}
                            onChange={handleChange}
                            style={{ width: "100%", marginBottom: 12 }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição:
                        <textarea
                            name="descricao"
                            value={info.descricao}
                            onChange={handleChange}
                            style={{ width: "100%", height: 80, marginBottom: 12 }}
                        />
                    </label>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditSiteInfo;