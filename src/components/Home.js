
// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { addToWatchlist } from '../redux/actions';
// import axios from 'axios';
// import { InputGroup, FormControl, Button, Table, Spinner } from 'react-bootstrap';
// import Navbar1 from '../Athentication/Navbar';
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const Home = ({ addToWatchlist }) => {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     let debounceTimer;

//     if (searchText) {
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => {
//         fetchCompanyData(searchText);
//       }, 1000);
//     } else {
//       setSearchResults([]);
//     }

//     return () => {
//       clearTimeout(debounceTimer);
//     };
//   }, [searchText]);

//   const fetchCompanyData = async (query) => {
//     try {
//       setIsLoading(true);

//       const apiKey = 'YQ79VRNO9KGU0MW9';
//       const response = await axios.get(
//         `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
//       );
//       const companies = response.data.bestMatches;

//       if (!companies || companies.length === 0) {
//         setSearchResults([]);
//         setIsLoading(false);
//         return;
//       }

//       const symbolPromises = companies.map(async (company) => {
//         const symbol = company['1. symbol'];
//         const priceResponse = await axios.get(
//           `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
//         );
//         const timeSeriesData = priceResponse.data['Time Series (5min)'];

//         let latestPrice = 'N/A';
//         if (timeSeriesData) {
//           const timeSeriesKeys = Object.keys(timeSeriesData);
//           latestPrice = timeSeriesData[timeSeriesKeys[0]]['1. open'];
//         }

//         return {
//           ...company,
//           latestPrice,
//         };
//       });

//       const companiesWithPrices = await Promise.all(symbolPromises);

//       setSearchResults(companiesWithPrices);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//     }
//   };

//   const handleAddToWatchlist = (company) => {
//     addToWatchlist(company);
//   };

//   return (
//     <Container style={{ marginTop: '70px', fontFamily: 't' }}>
//       <Navbar1 />
//       <h1 style={{ color: 'blue', fontFamily: 't', textAlign: 'center', paddingBottom: '25px' }}>Home</h1>
//       <Row>
//         <Col xs={12} md={6}>
//           <InputGroup className="mb-3">
//             <FormControl
//               placeholder="Search for companies..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </InputGroup>
//         </Col>
//         <Col xs={12} md={6}>
//           <Button variant="primary" style={{  }}>
//             Search
//           </Button>
//         </Col>
//       </Row>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             <tr>
//               <td colSpan="3">
//                 <Spinner animation="border" role="status">
//                   <span className="sr-only">Loading...</span>
//                 </Spinner>
//               </td>
//             </tr>
//           ) : (
//             searchResults.map((company) => (
//               <tr key={company['1. symbol']}>
//                 <td>{company['2. name']}</td>
//                 <td>{company.latestPrice || 'N/A'}</td>
//                 <td>
//                   <Button onClick={() => handleAddToWatchlist(company)}>Watchlist</Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// const mapDispatchToProps = {
//   addToWatchlist,
// };

// export default connect(null, mapDispatchToProps)(Home);
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addToWatchlist } from '../redux/actions';
import axios from 'axios';
import { InputGroup, FormControl, Button, Table, Spinner, Alert } from 'react-bootstrap';
import Navbar1 from '../Athentication/Navbar';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = ({ addToWatchlist, watchlist }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  useEffect(() => {
    let debounceTimer;

    if (searchText) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchCompanyData(searchText);
      }, 1000);
    } else {
      setSearchResults([]);
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchText]);

  const fetchCompanyData = async (query) => {
    try {
      setIsLoading(true);

      const apiKey = 'YQ79VRNO9KGU0MW9';
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
      );
      const companies = response.data.bestMatches;

      if (!companies || companies.length === 0) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const symbolPromises = companies.map(async (company) => {
        const symbol = company['1. symbol'];
        const priceResponse = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        );
        const timeSeriesData = priceResponse.data['Time Series (5min)'];

        let latestPrice = 'N/A';
        if (timeSeriesData) {
          const timeSeriesKeys = Object.keys(timeSeriesData);
          latestPrice = timeSeriesData[timeSeriesKeys[0]]['1. open'];
        }

        return {
          ...company,
          latestPrice,
        };
      });

      const companiesWithPrices = await Promise.all(symbolPromises);

      setSearchResults(companiesWithPrices);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = (company) => {
    if (isInWatchlist(company)) {
      setShowDuplicateAlert(true);
    } else {
      addToWatchlist(company);
      setShowAddAlert(true);
    }
    setTimeout(() => {
      setShowAddAlert(false);
      setShowDuplicateAlert(false);
    }, 1000);
  };

  const isInWatchlist = (company) => {
    return watchlist.some((item) => item['1. symbol'] === company['1. symbol']);
  };

  return (
    <Container style={{ marginTop: '70px', fontFamily: 't' }}>
      <Navbar1 />
      <h1 style={{ color: 'blue', fontFamily: 't', textAlign: 'center', paddingBottom: '25px' }}>Home</h1>
      <Row>
        <Col xs={12} md={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for companies..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <Button variant="primary" onClick={() => fetchCompanyData(searchText)}>
            Search
          </Button>
        </Col>
      </Row>
      {showAddAlert && (
        <Alert variant="success" onClose={() => setShowAddAlert(false)} dismissible>
          Company added to watchlist.
        </Alert>
      )}
      {showDuplicateAlert && (
        <Alert variant="danger" onClose={() => setShowDuplicateAlert(false)} dismissible>
          This company is already in your watchlist.
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </td>
            </tr>
          ) : (
            searchResults.map((company) => (
              <tr key={company['1. symbol']}>
                <td>{company['2. name']}</td>
                <td>{company.latestPrice || 'N/A'}</td>
                <td>
                  <Button onClick={() => handleAddToWatchlist(company)}>Watchlist</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.watchlist.watchlist,
});

const mapDispatchToProps = {
  addToWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


