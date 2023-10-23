

import React from 'react';
import { connect } from 'react-redux';
import { removeFromWatchlist } from '../redux/actions';
import { Table, Button } from 'react-bootstrap';
import Navbar1 from '../Athentication/Navbar';

const Watchlist = ({ watchlist, removeFromWatchlist }) => {
  return (
    <div style={{fontFamily:'t',margin:'80px' ,}}>
      <Navbar1/>
      <h1 style={{color:'blue',textAlign:'center'}}>Watchlist</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((company) => (
            <tr key={company['1. symbol']}>
              <td>{company['2. name']}</td>
              <td>{company.latestPrice || 'N/A'}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromWatchlist(company)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  watchlist: state.watchlist.watchlist,
});

const mapDispatchToProps = {
  removeFromWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
