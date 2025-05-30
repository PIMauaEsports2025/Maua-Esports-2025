import React, { useState, useEffect } from "react";
import "../styles/EditSiteInfo.css";
import Footer from "./Layout/Footer";
import HeaderAdmin from "./Layout/HeaderAdmin";

const EditSiteInfo = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [siteData, setSiteData] = useState({
        home: {
            heroTitle: "BEM-VINDO",
            heroDescription: "O Mauá e-Sports é a equipe de esportes eletrônicos do Instituto Mauá de Tecnologia (IMT), representando a instituição em competições universitárias e promovendo o desenvolvimento de habilidades em áreas como engenharia, design, administração e comunicação.",
            quemSomosTitle: "QUEM SOMOS",
            quemSomosText1: "O Mauá e-Sports é uma comunidade universitária apaixonada por jogos eletrônicos, inovação e competitividade. Fundado em 2018, começamos como um grupo de amigos com um sonho em comum: colocar o nome da Mauá no cenário dos e-sports.",
            quemSomosText2: "Hoje, somos uma organização com presença regional, diversas modalidades ativas e uma base sólida de jogadores, staffs e entusiastas.",
            quemSomosText3: "Valorizamos o crescimento pessoal, o trabalho em equipe e o desenvolvimento de habilidades técnicas e emocionais. Para nós, e-sports é mais do que jogo, é formação e transformação. Seja como atleta, staff, analista ou criador de conteúdo, cada membro ajuda a construir algo maior. Mais do que um time, somos uma família que joga, aprende e cresce junto.",
            gamesDescription1: "A equipe é composta por representantes de diferentes cursos que atuam de forma organizada e disciplinada em diversos títulos do cenário competitivo, como League of Legends, Valorant, Counter-Strike 2, EA FC e Teamfight Tactics, entre outros.",
            gamesDescription2: "Mais do que participar de torneios, buscamos consolidar uma cultura de e-sports responsável, integrando atividades de treinamento, planejamento estratégico e representação institucional."
        },
        sobre: {
            comecoTitle: "COMO COMEÇAMOS",
            comecoText: "A Mauá e-Sports nasceu da paixão de um grupo de estudantes do Instituto Mauá de Tecnologia por e-sports e pela vontade de representar a instituição em torneios acadêmicos. O projeto surgiu de conversas informais entre amigos que, unidos pelo interesse comum, decidiram formar uma equipe organizada para competir e promover a cultura gamer dentro da Mauá. Desde o início, a missão foi criar um ambiente de aprendizado, disciplina e crescimento, tanto no competitivo quanto no desenvolvimento pessoal.",
            missao: "Promover os e-sports de forma estruturada e responsável, aliando desempenho competitivo, crescimento pessoal e espírito de equipe, sempre em alinhamento com os valores educacionais e tecnológicos da Mauá.",
            visao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            valores: "Valorizamos o trabalho em equipe, a disciplina nos treinos e competições, e promovemos a inclusão e o respeito entre os membros. Acreditamos na competitividade saudável e no desenvolvimento contínuo."
        },
        times: {
            heroTitle: "NOSSAS EQUIPES",
            heroDescription: "A elite dos games universitários representa o Instituto Mauá com talento, estratégia e paixão. Mais que jogadores, somos um time unido que leva o nome Mauá ao topo dos eSports!",
            sectionTitle: "CONHEÇA NOSSAS EQUIPES",
            descriptionTitle: "EXCELÊNCIA NOS E-SPORTS",
            descriptionText1: "A Mauá e-Sports reúne times formados por alunos talentosos e apaixonados por jogos eletrônicos, que trabalham juntos para alcançar a excelência em suas modalidades.",
            descriptionText2: "Competimos em grandes arenas de e-sports com títulos renomados como Counter Strike, League of Legends, Valorant, Rocket League, Team Fight Tactics, Rainbow Six Siege e EA FC 25. Nossas equipes são estruturadas com treinamentos regulares e estratégias personalizadas para enfrentar desafios.",
            descriptionText3: "Mais do que vitórias, promovemos valores como trabalho em equipe, disciplina, inclusão e respeito, acreditando que o crescimento como jogador está ligado ao desenvolvimento pessoal."
        },
        campeonatos: {
            title: "CAMPEONATOS",
            description: "Venha acompanhar de perto a emoção dos nossos campeonatos! A Mauá E-Sports reúne os melhores talentos da instituição em partidas cheias de estratégia, adrenalina e espírito de equipe. Fique ligado nas transmissões e torça com a gente por cada vitória!"
        },
        contato: {
            title: "CONTATO",
            description: "Preencha o formulário abaixo com sua mensagem, dúvida ou sugestão. As informações enviadas serão encaminhadas diretamente para o nosso e-mail institucional e entraremos em contato o mais breve possível.",
            faqTitle: "Perguntas Frequentes"
        }
    });

    useEffect(() => {
        const saved = localStorage.getItem("siteData");
        if (saved) {
            setSiteData(JSON.parse(saved));
        }
    }, []);

    const handleChange = (section, field, value) => {
        setSiteData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("siteData", JSON.stringify(siteData));
        alert("Informações salvas com sucesso!");
    };

    const tabs = [
        { id: "home", label: "Home" },
        { id: "sobre", label: "Sobre" },
        { id: "times", label: "Times" },
        { id: "campeonatos", label: "Campeonatos" },
        { id: "contato", label: "Contato" }
    ];

    const renderHomeTab = () => (
        <div className="edit-section">
            <h3>Seção Hero</h3>
            <div className="form-group">
                <label>Título Principal:</label>
                <input
                    type="text"
                    value={siteData.home.heroTitle}
                    onChange={(e) => handleChange("home", "heroTitle", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Descrição Hero:</label>
                <textarea
                    value={siteData.home.heroDescription}
                    onChange={(e) => handleChange("home", "heroDescription", e.target.value)}
                />
            </div>

            <h3>Seção Quem Somos</h3>
            <div className="form-group">
                <label>Título Quem Somos:</label>
                <input
                    type="text"
                    value={siteData.home.quemSomosTitle}
                    onChange={(e) => handleChange("home", "quemSomosTitle", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 1:</label>
                <textarea
                    value={siteData.home.quemSomosText1}
                    onChange={(e) => handleChange("home", "quemSomosText1", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 2:</label>
                <textarea
                    value={siteData.home.quemSomosText2}
                    onChange={(e) => handleChange("home", "quemSomosText2", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 3:</label>
                <textarea
                    value={siteData.home.quemSomosText3}
                    onChange={(e) => handleChange("home", "quemSomosText3", e.target.value)}
                />
            </div>

            <h3>Seção Games</h3>
            <div className="form-group">
                <label>Descrição 1:</label>
                <textarea
                    value={siteData.home.gamesDescription1}
                    onChange={(e) => handleChange("home", "gamesDescription1", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Descrição 2:</label>
                <textarea
                    value={siteData.home.gamesDescription2}
                    onChange={(e) => handleChange("home", "gamesDescription2", e.target.value)}
                />
            </div>
        </div>
    );

    const renderSobreTab = () => (
        <div className="edit-section">
            <h3>Como Começamos</h3>
            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={siteData.sobre.comecoTitle}
                    onChange={(e) => handleChange("sobre", "comecoTitle", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Texto:</label>
                <textarea
                    value={siteData.sobre.comecoText}
                    onChange={(e) => handleChange("sobre", "comecoText", e.target.value)}
                />
            </div>

            <h3>Missão, Visão e Valores</h3>
            <div className="form-group">
                <label>Missão:</label>
                <textarea
                    value={siteData.sobre.missao}
                    onChange={(e) => handleChange("sobre", "missao", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Visão:</label>
                <textarea
                    value={siteData.sobre.visao}
                    onChange={(e) => handleChange("sobre", "visao", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Valores:</label>
                <textarea
                    value={siteData.sobre.valores}
                    onChange={(e) => handleChange("sobre", "valores", e.target.value)}
                />
            </div>
        </div>
    );

    const renderTimesTab = () => (
        <div className="edit-section">
            <h3>Seção Hero</h3>
            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={siteData.times.heroTitle}
                    onChange={(e) => handleChange("times", "heroTitle", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Descrição:</label>
                <textarea
                    value={siteData.times.heroDescription}
                    onChange={(e) => handleChange("times", "heroDescription", e.target.value)}
                />
            </div>

            <h3>Seção Equipes</h3>
            <div className="form-group">
                <label>Título da Seção:</label>
                <input
                    type="text"
                    value={siteData.times.sectionTitle}
                    onChange={(e) => handleChange("times", "sectionTitle", e.target.value)}
                />
            </div>

            <h3>Descrição Final</h3>
            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={siteData.times.descriptionTitle}
                    onChange={(e) => handleChange("times", "descriptionTitle", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 1:</label>
                <textarea
                    value={siteData.times.descriptionText1}
                    onChange={(e) => handleChange("times", "descriptionText1", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 2:</label>
                <textarea
                    value={siteData.times.descriptionText2}
                    onChange={(e) => handleChange("times", "descriptionText2", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Parágrafo 3:</label>
                <textarea
                    value={siteData.times.descriptionText3}
                    onChange={(e) => handleChange("times", "descriptionText3", e.target.value)}
                />
            </div>
        </div>
    );

    const renderCampeonatosTab = () => (
        <div className="edit-section">
            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={siteData.campeonatos.title}
                    onChange={(e) => handleChange("campeonatos", "title", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Descrição:</label>
                <textarea
                    value={siteData.campeonatos.description}
                    onChange={(e) => handleChange("campeonatos", "description", e.target.value)}
                />
            </div>
        </div>
    );

    const renderContatoTab = () => (
        <div className="edit-section">
            <div className="form-group">
                <label>Título:</label>
                <input
                    type="text"
                    value={siteData.contato.title}
                    onChange={(e) => handleChange("contato", "title", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Descrição:</label>
                <textarea
                    value={siteData.contato.description}
                    onChange={(e) => handleChange("contato", "description", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Título FAQ:</label>
                <input
                    type="text"
                    value={siteData.contato.faqTitle}
                    onChange={(e) => handleChange("contato", "faqTitle", e.target.value)}
                />
            </div>
        </div>
    );

    const renderActiveTab = () => {
        switch (activeTab) {
            case "home": return renderHomeTab();
            case "sobre": return renderSobreTab();
            case "times": return renderTimesTab();
            case "campeonatos": return renderCampeonatosTab();
            case "contato": return renderContatoTab();
            default: return renderHomeTab();
        }
    };    return (
        <div>
            <HeaderAdmin />
            <div className="edit-site-container">
                <div className="edit-header">
                    <h2>Painel de Edição do Site</h2>
                    <p>Edite os textos e conteúdos das páginas do site</p>
                </div>

                <div className="tabs-container">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    {renderActiveTab()}
                    
                    <div className="form-actions">
                        <button type="submit" className="save-button">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditSiteInfo;