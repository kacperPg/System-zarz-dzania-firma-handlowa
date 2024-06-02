import { useState } from 'react';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';

const GENERATE_REPORT_URL = '/api/raport/generateReport';

function RaportPage() {
  const [reportUrl, setReportUrl] = useState('');
  const [loading, setLoading] = useState(false);
  let token = sessionStorage.getItem('token');

  const getReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get(GENERATE_REPORT_URL, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setReportUrl(url);
    } catch (err) {
      if (!err?.response) {
        alert('No Server Response');
      } else if (err.response?.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Failed to fetch report');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="buttonAddProduct">
          <button onClick={getReport} className="generate-report-button" disabled={loading}>
            {loading ? 'Generowanie raportu...' : 'Stwórz raporty wszystkich zamówień'}
          </button>
        </section>
        <section id="idTabelaProduktow">
          {reportUrl ? (
            <iframe src={reportUrl} className="pdf-viewer" title="Report PDF"></iframe>
          ) : (
            !loading && <p>Nie wygenerowano jeszcze żadnego raportu.</p>
          )}
        </section>
      </div>
    </>
  );
}

export default RaportPage;
