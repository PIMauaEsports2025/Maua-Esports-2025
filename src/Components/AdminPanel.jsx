import EditSiteInfo from "./EditSiteInfo";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

const AdminPanel = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <EditSiteInfo />
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;