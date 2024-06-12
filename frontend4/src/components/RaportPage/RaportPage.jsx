import React, { useState } from 'react';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import axios from '../../api/axios';
import '../ItemsPage.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const GENERATE_REPORT_URL = '/api/raport/generateReport';
const GENERATE_REPORT_PRODUCTS_URL = '/api/raport/generateReportProd';
const GENERATE_REPORT_WAREHOUSE_URL = '/api/raport/generateReportWar';

function RaportPage() {
  const [reportUrl, setReportUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(GENERATE_REPORT_URL);
  const [buttonLabel, setButtonLabel] = useState('Stwórz raporty wszystkich zamówień klientów');
  const [afterDate, setAfterDate] = useState('');
  const [beforeDate, setBeforeDate] = useState('');
  let token = sessionStorage.getItem('token');

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSelect = (url, label) => {
    setSelectedUrl(url);
    setButtonLabel(label);
  };

  const getReport = async () => {
    setLoading(true);
    try {
      let res;
      if (afterDate || beforeDate) {
        res = await axios.post(selectedUrl, {
          afterDate: afterDate || undefined,
          beforeDate: beforeDate || undefined
        }, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          responseType: 'arraybuffer',
        });
      } else {
        res = await axios.get(selectedUrl, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          responseType: 'arraybuffer',
        });
      }

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

  const clearFields = () => {
    setAfterDate('');
    setBeforeDate('');
  };

  return (
    <>
      <div className="wrapper">
        <NavBarBoodstrap />
        <section id="buttonAddProduct">
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              {buttonLabel}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleSelect(GENERATE_REPORT_URL, 'Stwórz raporty wszystkich zamówień klientów')}>
                Stwórz raporty wszystkich zamówień klientów
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect(GENERATE_REPORT_PRODUCTS_URL, 'Stwórz raporty produktów')}>
                Stwórz raporty produktów
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect(GENERATE_REPORT_WAREHOUSE_URL, 'Stwórz raporty magazynowe')}>
                Stwórz raporty magazynowe
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="date-inputs">
            <label className="label">
              Od dnia:          </label>
            <input
              type="date"
              value={afterDate}
              onChange={(e) => setAfterDate(e.target.value)}
            />

            <label className="label">           
              Do Dnia:       </label>
            <input
              type="date"
              value={beforeDate}
              onChange={(e) => setBeforeDate(e.target.value)}
            />
            <button onClick={clearFields} id="filterButton">
              Wyczyść pola
            </button>
          </div>
          <button onClick={getReport} id="buttonItem" disabled={loading}>
            {loading ? 'Generowanie raportu...' : 'Generuj raport'}
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
